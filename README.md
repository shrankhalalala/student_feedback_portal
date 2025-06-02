# 🌌 Student Feedback Portal

A full-stack web application where students can submit feedback about courses and view responses submitted by others. Built with **React + Vite** for the frontend and **Node.js + Express + MongoDB** for the backend.



## 📁 Folder Structure

```
feedback/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── node_modules/
```



## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd feedback
```



### 2. Backend Setup (`/backend`)

```bash
cd backend
npm install
```

#### Update MongoDB URI (if needed)

By default, MongoDB connects to:

```js
'mongodb://localhost:27017/sfp_shrankhala'
```

> You can change this in `server.js` based on your environment or use an `.env` file for production.

#### Start the Backend Server

```bash
node server.js
```

* Runs on `http://localhost:5050`
* Endpoints:

  * `GET /feedback` – fetch all feedback
  * `POST /feedback` – submit new feedback

---

### 3. Frontend Setup (`/frontend`)

```bash
cd ../frontend
npm install
npm run dev
```

* Runs on `http://localhost:5173` (default Vite port)
* React frontend with form and live feedback list
* Make sure CORS is enabled in the backend (already handled)



## 🚀 Features

* 🌟 Clean UI with neon styling
* 📝 Form with validation: student name, course, rating, comments
* 📜 View all feedback instantly
* 📡 Live fetch from backend API
* 📦 Full Vite + React stack



## 📸 Preview

You can drag and drop screenshots here or include links if deployed.



## 🧠 Future Improvements

* Add authentication for admin dashboard
* Filter feedback by course
* Deploy to Vercel (frontend) & Render / Railway (backend)


## 👨‍💻 Author

Made with ❤️ by **Shrankhala Singh**
