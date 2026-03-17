# Rene Kolednik Portfolio

One-page portfolio focused on the pieces that matter for interviews: an Expo + React Native Web frontend and a lean Express/Mongo contact API.

## Structure

- `frontend/` - Expo app for web, built with React Native Web
- `backend/` - Express API with portfolio content and contact route

## Run locally

1. Install dependencies in `frontend/` and `backend/`
2. Copy `backend/.env.example` to `backend/.env`
3. Start the API with `npm run dev:backend`
4. Start the frontend with `npm run dev:frontend`

The frontend uses `EXPO_PUBLIC_API_URL`, which defaults to `http://localhost:5000/api` in [frontend/.env.example](c:/App%205%20Personal%20Portfolio/frontend/.env.example).

## Contact flow

`POST /api/contact` can:

- save messages to MongoDB when `MONGO_URI` is configured
- send email notifications when SMTP credentials are configured

If neither is configured, the endpoint returns a setup warning instead of pretending the message was delivered.
