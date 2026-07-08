# Backend (Django)

Admin dashboard + API for the موسسه منادیان فتح ایرانیان site: manages contact
form submissions, holding companies, and portfolio items — all editable from
a Farsi/RTL Django admin dashboard.

## Setup

```bash
cd backend
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
./venv/bin/python manage.py migrate
./venv/bin/python manage.py createsuperuser
./venv/bin/python manage.py runserver
```

Dashboard: http://localhost:8000/admin/
API root: http://localhost:8000/api/

No superuser is created automatically — run `createsuperuser` yourself (see
above, or `docker compose exec backend python manage.py createsuperuser` when
using Docker) and pick your own credentials.

## Apps

- **contact** — `ContactSubmission` (شماره تماس / متن درخواست). Public
  `POST /api/contact/` is what the frontend's footer form submits to
  (rate-limited to 5/hour per client). Review/mark-as-reviewed submissions
  from the dashboard.
- **holdings** — `HoldingCompany` (نام / لوگو / توضیحات / ترتیب نمایش).
  Public `GET /api/holdings/` returns the active list, ordered — backs the
  "دیگر شرکت‌های هلدینگ ما" section.
- **portfolio** — `PortfolioItem` (دسته‌بندی / عنوان / تصویر / توضیحات / ویدیو
  / گالری تصاویر / لینک / ترتیب نمایش) plus `PortfolioCategory` and
  `PortfolioImage`. Public `GET /api/portfolio/` and
  `GET /api/portfolio/<id>/` back the "نمونه کار ها و فعالیت ها" section and
  its detail page.

Each model's dashboard list view supports inline-editing `ترتیب نمایش`
(order) and `فعال` (active) without opening the detail page.

## Configuration

All environment-sensitive settings are read via `django-environ` from a
`.env` file (or real environment variables) — see `config/settings.py`. With
no `.env` present, sensible dev defaults apply (SQLite, `DEBUG=False`,
`ALLOWED_HOSTS=["localhost","127.0.0.1"]`); the dev Docker Compose setup
overrides `DJANGO_DEBUG`/`DJANGO_ALLOWED_HOSTS` explicitly. See
`.env.example` at the repo root for the full list of variables, and
`DEPLOYMENT.md` for a production deployment runbook (Postgres, gunicorn,
nginx, TLS).
