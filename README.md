# 🎬 MovieFinder

MovieFinder is a modern React application that allows users to search for movies, explore details, and manage a personal watchlist. The project uses **React, Redux Toolkit, RTK Query, and Tailwind CSS** to create a responsive and interactive movie browsing experience.

---

## 🚀 Live Demo

Deployed on **Vercel**

```
https://movie-finder-iota-wine.vercel.app/
```

---

## 📸 Features

- 🔍 Search movies using the OMDb API
- 🎞 Infinite scrolling movie results
- ⭐ Add movies to a personal watchlist
- ✔ Mark movies as watched
- 🗑 Remove movies from watchlist
- 👤 Update profile username
- 🌗 Light / Dark theme toggle
- 📱 Fully responsive UI with hamburger menu
- ⚡ Fast data fetching with RTK Query

---

## 🛠 Tech Stack

**Frontend**

- React
- Vite
- Redux Toolkit
- RTK Query
- Tailwind CSS

**API**

- OMDb API (Open Movie Database)

**Deployment**

- Vercel

---

## 📂 Project Structure

```
movie-finder
│
├── public
│
├── src
│   ├── assets
│   ├── components
│   │   ├── Header.jsx
│   │   ├── LoginForm.jsx
│   │   ├── MovieSearch.jsx
│   │   └── Watchlist.jsx
│   │
│   ├── context
│   │   └── useTheme.jsx
│   │
│   ├── redux
│   │   ├── api
│   │   │   └── movieFinderApi.js
│   │   │
│   │   ├── features
│   │   │   ├── auth
│   │   │   │   └── authSlice.js
│   │   │   │
│   │   │   └── movies
│   │   │       └── moviesSlice.js
│   │   │
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

## ⚙️ Installation

Clone the repository

```
git clone https://github.com/your-username/movie-finder.git
```

Go to project folder

```
cd movie-finder
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

---

## 🌐 OMDb API Setup

1. Get an API key from

```
https://www.omdbapi.com/apikey.aspx
```

2. Create `.env` file in project root

```
VITE_OMDB_API_KEY=your_api_key_here
```

3. Restart the server

```
npm run dev
```

---

## 📱 Responsive Features

- Desktop navigation with profile dropdown
- Mobile hamburger menu
- Responsive movie cards
- Optimized watchlist layout for mobile

---

## 🚀 Deployment (Vercel)

1. Push project to GitHub
2. Go to **https://vercel.com**
3. Import the repository
4. Deploy

Build settings

```
Build Command: npm run build
Output Directory: dist
```
