# Analytics Dashboard

A lightweight analytics dashboard built with Node.js and Express.

## Features

- Dashboard UI served from `index.html`
- Login page at `login.html`
- Predict API endpoint at `pages/api/predict.js`
- Static assets: `script.js`, `styles.css`
- Express server in `server.js`

## Setup

Install dependencies:

```bash
npm install
```

## Run

Start the app:

```bash
npm start
```

Open the app in your browser at:

- `http://localhost:3000`
- `http://localhost:3000/login.html`

## Deploy on Vercel

1. Import the repo: [github.com/ARPAN58/coal](https://github.com/ARPAN58/coal)
2. In the Vercel project, open **Settings → Environment Variables**
3. Add these (for **Production**, **Preview**, and **Development**):

| Name | Value |
|------|--------|
| `DATABRICKS_HOST` | `https://dbc-20f214f0-260f.cloud.databricks.com` |
| `DATABRICKS_ENDPOINT` | `coal-profit-endpoint` |
| `DATABRICKS_TOKEN` | Your Databricks personal access token |

4. Deploy. Do **not** commit `.env` or paste the token into GitHub.

Vercel injects these as `process.env` at runtime — same as local `.env`, but stored securely in Vercel only.

## Notes

- `server.js` is the main server entry point
- `api/index.js` + `vercel.json` wire Express for Vercel serverless
- The project uses `express`, `cors`, `compression`, and `helmet`
