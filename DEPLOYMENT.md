# Deployment

Production stack: nginx (TLS termination + reverse proxy) → Next.js
(standalone build) + Django/gunicorn → PostgreSQL, all via Docker Compose on
a single VPS.

## 1. Provision the server

- Any VPS with Docker + the Compose plugin installed (Ubuntu 22.04+ recommended).
- Point your domain's DNS A record at the server's IP before continuing —
  step 4 needs it resolvable for the Let's Encrypt HTTP-01 challenge.
- Basic firewall:
  ```bash
  sudo ufw allow OpenSSH
  sudo ufw allow 80
  sudo ufw allow 443
  sudo ufw enable
  ```

## 2. Get the code onto the server

```bash
git clone <your-repo-url> monadian
cd monadian
```

## 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:
- Replace every `yourdomain.example` with your real domain.
- Generate a secret key:
  ```bash
  python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```
  (no local Python/Django install needed — pipe through `docker run --rm python:3.12-slim python3 -c "..."` if you don't have Python on the VPS)
- Set a strong `POSTGRES_PASSWORD` and update `DATABASE_URL` to match.

Also replace `yourdomain.example` in `deploy/nginx/conf.d/app.conf`.

## 4. Obtain the TLS certificate

```bash
./deploy/init-letsencrypt.sh
```

This starts nginx with a temporary self-signed cert, requests a real
Let's Encrypt certificate via the HTTP-01 challenge, then reloads nginx with
it. Only needs to run once — `docker-compose.prod.yml`'s `certbot` service
renews automatically afterward.

## 5. Bring up the full stack

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

This builds and starts `db` (Postgres), `backend` (gunicorn, runs migrations
+ `collectstatic` on boot via `entrypoint.sh`), `frontend` (Next.js
standalone build), `nginx`, and `certbot`.

## 6. Create your admin account

```bash
docker compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

Dashboard is then at `https://yourdomain.example/admin/`.

## 7. (Optional) Carry over dev content

If you seeded holdings/portfolio data in local dev (SQLite) and want it in
production (Postgres):

```bash
# on your dev machine, against the SQLite db
docker compose exec backend python manage.py dumpdata holdings portfolio contact > dump.json

# copy dump.json to the server, then, against the prod stack
docker compose -f docker-compose.prod.yml exec -T backend python manage.py loaddata - < dump.json
```

Media files (uploaded images/videos) live under `backend/media/` in dev —
copy that directory's contents into `./deploy/data/media/` on the server to
match.

## Backups

Everything persistent lives under `./deploy/` on the host (bind-mounted, not
opaque Docker volumes), so a simple periodic backup is:

```bash
tar czf backup-$(date +%F).tar.gz deploy/data deploy/certbot
```

For the database specifically, prefer a proper `pg_dump` over copying the
raw Postgres data directory:

```bash
docker compose -f docker-compose.prod.yml exec db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-$(date +%F).sql
```

Wire either of these into a daily cron job.

## Updating the deployed app

```bash
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

Migrations and `collectstatic` run automatically on backend container start.

## What's intentionally out of scope here

- Multi-server/load-balanced setups — this is a single-VPS deployment.
- CI/CD — deploys are manual (`git pull` + rebuild) per above.
- Email sending (password resets, error alerts) — no SMTP is configured;
  add `EMAIL_*` settings in `config/settings.py` if you need it later.
