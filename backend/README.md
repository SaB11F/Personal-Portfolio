# Portfolio API

Express API for the portfolio frontend.

## Routes

- `GET /api/health` - health check
- `GET /api/portfolio` - portfolio content payload
- `POST /api/contact` - stores and/or forwards contact messages

## Environment

Create `backend/.env` and configure:

- `CLIENT_URL` with your frontend domain once it is deployed
- `MONGO_URI` if you want to store messages in MongoDB
- `SMTP_*` plus `CONTACT_TO_EMAIL` if you want messages emailed to you

## Render Deployment

This repo includes a root [render.yaml](/c:/App 5 Personal Portfolio/render.yaml) that deploys the backend as a Node web service.

In Render:

1. Create a new Blueprint instance from the repo, or create a Web Service manually.
2. If you create it manually, use:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
3. Set `CLIENT_URL` after your frontend URL is known.
4. Add `MONGO_URI` and SMTP variables later when you are ready to enable persistent contact storage and email delivery.
