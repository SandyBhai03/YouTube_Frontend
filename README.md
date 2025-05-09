# YouTube Clone 🎥

A full-stack YouTube clone application built with the MERN stack (MongoDB, Express, React, Node.js). It supports user authentication, video uploads, search functionality, comments, and view counts.

- ## Demo Video Link 👇

```sh
https://www.loom.com/share/b76492afd1864e45850ee21ac0a6cc2b?sid=fa886460-53c2-443b-af3a-f54dbe7c5fcb
```

## 🔧 Features

- User authentication (Signup/Login/Logout)

- Upload and stream videos

- View count tracking

- Comment system

- Search videos by title

- Channel view by user

### Frontend (React + Vite)
- Video Upload Page
- Homepage with Video List
- Watch Video Page with Comments
- User Profile/Channel Page
- Search Functionality
- Responsive Design with Navbar and Sidebar


### Backend (Express + MongoDB)
- JWT-based Authentication (Signup, Login, Logout)
- Upload, Retrieve & View Count for Videos
- Fetch Videos by User ID (Channel Page)
- Add and View Comments
- Search Videos by Title

### 🛠️ Tech Stack

- MongoDB

- Express.js

- React.js

- Node.js

- Axios

- Cloudinary (for media upload)

---

### Clone and Run Locally
```sh
https://github.com/SandyBhai03/YouTube_Frontend.git

cd YouTube_Frontend
npm install
npm run dev
```

## 📁 Folder Structure

```sh 
Youtube-Clone
│
├── Youtube-Backend
│   ├── connection/conn.js
│   ├── controllers/
│   │   ├── commentController.js
│   │   ├── userController.js
│   │   └── videoController.js
│   ├── middleware/authentication.js
│   ├── models/
│   │   ├── comment.js
│   │   ├── user.js
│   │   └── video.js
│   ├── routes/
│   │   ├── commentRoutes.js
│   │   ├── userRoutes.js
│   │   └── videoRoutes.js
│   ├── index.js
│   └── package.json
│
└── Youtube-Frontend
    ├── src/
    │   ├── Components/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── SignUp.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── Navbar/
    │   │   ├── SearchVideo/
    │   │   ├── Sidebar/
    │   │   └── VideoCard/
    │   ├── Pages/
    │   │   ├── Home/
    │   │   ├── Profile/
    │   │   ├── Video/
    │   │   └── VideoUpload/
    │   ├── utils/formatView.js
    │   ├── App.jsx
    │   ├── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json

```

---

# 🔗 API Endpoints

### 👤 User Authentication APIs (/auth)

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | /auth/signup   | Register a new user             |
| POST   | /auth/login    | Login and receive JWT token     |
| POST   | /auth/logout   | Logout the user (clears cookie) |


### 📹 Video APIs (`/api`)

| Method | Endpoint                    | Description                                      |
|--------|-----------------------------|--------------------------------------------------|
| POST   | /api/video                  | Upload a new video (authenticated)              |
| GET    | /api/allVideo               | Fetch all videos                                |
| GET    | /api/getVideoById/:id       | Get a single video by ID                        |
| GET    | /api/:userId/channel        | Get all videos uploaded by a user (channel page)|
| GET    | /api/search/videos?query=   | Search videos by title                          |
| PUT    | /api/video/:id/view         | Increment view count for a video                |


### 💬 Comment APIs (`/commentApi`)

| Method | Endpoint                         | Description                           |
|--------|----------------------------------|---------------------------------------|
| POST   | /commentApi/comment              | Add a comment (authenticated)         |
| GET    | /commentApi/comment/:videoId     | Get all comments for a specific video |


- ### Note: Some better Features and Optimized Version Comming Soon
#### (Sandeep Yadav)