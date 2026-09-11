import { beforeEach, describe, expect, it, vi } from "vitest";
import { BaseRepository } from "../src/repositories/BaseRepository";

type WhereChain = {
  first: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

function makeWhereChain(resolvedValue: unknown): WhereChain {
  return {
    first: vi.fn().mockResolvedValue(resolvedValue),
    update: vi.fn().mockResolvedValue(resolvedValue),
    delete: vi.fn().mockResolvedValue(resolvedValue),
  };
}

describe("BaseRepository (generic CRUD, entity-agnostic)", () => {
  type Widget = { id: string; label: string };
  type CreateWidgetInput = { label: string };
  type UpdateWidgetInput = { label?: string };

  class WidgetRepository extends BaseRepository<Widget, CreateWidgetInput, UpdateWidgetInput> {
    readonly whereMock = vi.fn();
    readonly allMock = vi.fn();
    readonly createMock = vi.fn();

    protected get model() {
      return {
        where: this.whereMock,
        all: this.allMock,
        create: this.createMock,
      };
    }
  }

  let repo: WidgetRepository;
  let whereChain: WhereChain;
  const widget: Widget = { id: "w1", label: "Widget" };

  beforeEach(() => {
    repo = new WidgetRepository();
    whereChain = makeWhereChain(widget);
    repo.whereMock.mockReturnValue(whereChain);
    repo.allMock.mockResolvedValue([widget]);
    repo.createMock.mockResolvedValue(widget);
  });

  it("findById builds an { id } filter and resolves via .first()", async () => {
    const result = await repo.findById("w1");

    expect(repo.whereMock).toHaveBeenCalledWith({ id: "w1" });
    expect(whereChain.first).toHaveBeenCalledOnce();
    expect(result).toEqual(widget);
  });

  it("findById returns null when nothing matches", async () => {
    whereChain.first.mockResolvedValueOnce(null);

    await expect(repo.findById("missing")).resolves.toBeNull();
  });

  it("findAll delegates to model.all()", async () => {
    const result = await repo.findAll();

    expect(repo.allMock).toHaveBeenCalledOnce();
    expect(result).toEqual([widget]);
  });

  it("create delegates to model.create(data)", async () => {
    const input: CreateWidgetInput = { label: "New" };

    const result = await repo.create(input);

    expect(repo.createMock).toHaveBeenCalledWith(input);
    expect(result).toEqual(widget);
  });

  it("update builds an { id } filter and calls .update(data)", async () => {
    const input: UpdateWidgetInput = { label: "Updated" };

    const result = await repo.update("w1", input);

    expect(repo.whereMock).toHaveBeenCalledWith({ id: "w1" });
    expect(whereChain.update).toHaveBeenCalledWith(input);
    expect(result).toEqual(widget);
  });

  it("delete builds an { id } filter and calls .delete()", async () => {
    const result = await repo.delete("w1");

    expect(repo.whereMock).toHaveBeenCalledWith({ id: "w1" });
    expect(whereChain.delete).toHaveBeenCalledOnce();
    expect(result).toEqual(widget);
  });

  it("builds a fresh, independent filter object per call", async () => {
    await repo.findById("w1");
    await repo.update("w2", { label: "x" });

    const [firstCallFilter, secondCallFilter] = repo.whereMock.mock.calls.map((call) => call[0]);
    expect(firstCallFilter).toEqual({ id: "w1" });
    expect(secondCallFilter).toEqual({ id: "w2" });
    expect(firstCallFilter).not.toBe(secondCallFilter);
  });
});
