# Running abdulsTobacco backend with Docker

Files added:
- `Dockerfile` — builds the Node/Express API (`ecom_backend_node`)
- `docker-compose.yml` — runs the API + a MariaDB 10.11 database together
- `init.sql` — recreates the `abdulsTobacco` schema and seed data (from `abdulsTobacco.sql`) automatically the first time the database container starts
- `.dockerignore` — keeps `node_modules`, `.git`, etc. out of the image
- `.env.example` — template for the environment variables docker-compose reads

## Setup

1. Copy the env template and adjust values (at least `JWT_SECRET` for anything beyond local testing):
   ```bash
   cp .env.example .env
   ```
2. Place `Dockerfile`, `docker-compose.yml`, `init.sql`, `.dockerignore`, and `.env` in the **root of the `ecom_backend_node` project** (next to `package.json` / `server.js`).
3. Build and start everything:
   ```bash
   docker compose up --build
   ```
4. The API will be available at `http://localhost:4000` (or whatever `APP_PORT` you set). MariaDB listens on `localhost:3306`.

## How it fits the existing code

- `config/db.js` reads `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — the compose file sets `DB_HOST=mysql` (the service name) and passes the rest through from `.env`.
- `controllers/authController.js` / `middleware/auth.js` read `JWT_SECRET` — set it in `.env`.
- `config/upload.js` and `server.js` both resolve uploaded images to the absolute path `/uploads` inside the container, so that path is mounted as the named volume `uploads_data` — uploads persist across container rebuots.
- MariaDB data persists in the named volume `mysql_data`. `init.sql` only runs the **first** time that volume is created; to re-seed from scratch, run `docker compose down -v` first (this deletes existing data).

## Notes

- The seeded `users` table carries over the bcrypt password hashes from `abdulsTobacco.sql` as-is — change them (or re-register) before using this anywhere real.
- The database image is MariaDB 10.11, matching the MariaDB 10.4 dump this schema came from; `mysql2` (used in `config/db.js`) is fully compatible with MariaDB.
- To also containerize the frontend, add another service to `docker-compose.yml` pointing at its own Dockerfile and have it talk to the backend at `http://localhost:4000` (or the `backend` service name if it's containerized too, on the same `abduls_net` network).
