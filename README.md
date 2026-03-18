# Rene Kolednik Portfolio

One-page portfolio focused on the pieces that matter for interviews: an Expo + React Native Web frontend and a lean Express/Mongo contact API.

## Structure

- `frontend/` - Expo app for web, built with React Native Web
- `backend/` - Express API with portfolio content and contact route

## Run locally

1. Install dependencies in `frontend/` and `backend/`
2. Create `backend/.env` with the backend variables you need
3. Start the API with `npm run dev:backend`
4. Start the frontend with `npm run dev:frontend`

The frontend uses `EXPO_PUBLIC_API_URL`. It is currently set locally in `frontend/.env` to `https://rene-kolednik-portfolio-api.onrender.com/api`, and that same value should be used in your Render Static Site environment variables.

## Contact flow

`POST /api/contact` can:

- save messages to MongoDB when `MONGO_URI` is configured
- send email notifications when SMTP credentials are configured

If neither is configured, the endpoint returns a setup warning instead of pretending the message was delivered.

## Deploy Backend To Render

The repo now includes [render.yaml](/c:/App 5 Personal Portfolio/render.yaml) for the backend service.

For the first deployment:

1. Push the repo to GitHub.
2. In Render, create a new Blueprint or Web Service from the repo.
3. Deploy the `backend/` service.
4. After Render gives you the backend URL, set that URL in the frontend as `EXPO_PUBLIC_API_URL`.

You can leave MongoDB and SMTP unset for the initial deployment. The API will still boot and respond on `/api/health` and `/api/portfolio`.

## Deploy Frontend To Render

When you deploy the frontend as a Static Site, set:

- `EXPO_PUBLIC_API_URL=https://rene-kolednik-portfolio-api.onrender.com/api`

That lets the deployed frontend call the live backend immediately, even before MongoDB and SMTP are configured.
