# WasteWatch AI Backend

This backend provides the authentication layer for WasteWatch AI.

## Overview

- FastAPI application
- PostgreSQL database
- SQLAlchemy 2.x
- Alembic migrations
- JWT access tokens
- Passlib password hashing

## Python

Use Python 3.11+.

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

   python -m pip install -r requirements.txt

3. Copy `.env.example` to `.env` and update values.

## Environment variables

Required values:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `JWT_ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `FRONTEND_URL`
- `ALLOWED_ORIGINS`

## Database migration

Run:

```bash
alembic upgrade head
```

## Start the API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Swagger docs

Open:

- http://localhost:8000/docs
- http://localhost:8000/redoc

## Development seed accounts

Create development users:

```bash
python -m app.scripts.create_dev_accounts
```

This script creates an `ADMIN` account and a `MUNICIPAL_OFFICER` test account using environment variables.

## Frontend config

Create a frontend `.env` file with:

```env
VITE_API_URL=http://localhost:8000
```

## Main endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/reports`
- `GET /api/reports/me`
- `GET /api/reports`
