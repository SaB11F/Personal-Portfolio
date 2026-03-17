# Portfolio API

Express API for the portfolio frontend.

## Routes

- `GET /api/health` - health check
- `GET /api/portfolio` - portfolio content payload
- `POST /api/contact` - stores and/or forwards contact messages

## Environment

Copy `.env.example` to `.env` and configure:

- `MONGO_URI` if you want to store messages in MongoDB
- `SMTP_*` plus `CONTACT_TO_EMAIL` if you want messages emailed to you
