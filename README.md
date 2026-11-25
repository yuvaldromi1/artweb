# ArtWeb – Art Gallery

A full-stack gallery for paintings: visitors browse the collection, registered users log in, and paintings can be added, edited and deleted with image upload.

![Gallery](docs/screenshot.png)

## Features

- Gallery list, painting details page and a "top three" section
- Register and log in with JWT; passwords hashed with bcrypt
- Add, edit and delete paintings, including image upload
- Registration form protected by Google reCAPTCHA
- Form validation with React Hook Form

## Tech Stack

**Backend:** Node.js · Express 5 · TypeScript · MongoDB · Mongoose · JWT · bcrypt · Helmet · Multer
**Frontend:** React 19 · TypeScript · Redux Toolkit · Material UI · React Router · React Hook Form · Axios · Vite

The backend follows a layered structure: `models → dal → services → controllers → middleware`.

## API

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/register`, `/api/auth/login` |
| GET | `/api/paintings`, `/api/paintings/:id` |
| POST / PUT / DELETE | `/api/paintings`, `/api/paintings/:id` |

A Postman collection is in `database/`.

## Run Locally

**Requirements:** Node.js 20+, MongoDB on `localhost:27017`

1. Backend:
   ```bash
   cd backend
   npm install
   copy .env.example .env        # set JWT_SECRET_KEY
   npm start                     # http://localhost:3000
   ```
2. Frontend:
   ```bash
   cd frontend
   npm install
   copy .env.example .env.local  # set your reCAPTCHA site key
   npm run dev                   # http://localhost:5173
   ```

## Author

Yuval Dromi · [GitHub](https://github.com/yuvaldromi1)
