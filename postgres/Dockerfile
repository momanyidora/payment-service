# Postgres container for puntland-api.
FROM postgres:17

# Defaults for local development. prod.compose.yml overrides all three from
# .env.production — see the warning in .env.production.example about what
# happens if it does not.
ENV POSTGRES_DB=payments
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

EXPOSE 5432