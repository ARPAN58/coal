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

## Notes

- `server.js` is the main server entry point
- The project uses `express`, `cors`, `compression`, and `helmet`
