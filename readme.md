# ShieldShare 🔐

Secure file sharing platform that allows users to upload files and generate **temporary shareable links** with **expiry time and view limits**.

Built with a modern full-stack architecture using **Next.js, Node.js, Express, and MongoDB**.

---

## 🚀 Live Demo

https://shield-share.vercel.app

---

## ✨ Features

* 🔐 Secure authentication (JWT)
* 📤 File upload with drag & drop
* 🔗 Generate shareable download links
* ⏳ Expiry-based file access
* 👁️ Limit number of downloads
* 📊 Dashboard for file management
* 🗑️ Delete uploaded files
* 📋 Copy share link instantly
* 📱 Responsive modern UI

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Axios
* Zustand
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (file upload)

### Infrastructure

* Vercel (Frontend hosting)
* Render (Backend hosting)
* MongoDB Atlas (Database)

---



## 🖥️ Local Development

### 1. Clone repository

```
git clone https://github.com/chaitanya-92/Shield-Share.git
```

---

### 2. Install dependencies

Backend:

```
cd shieldshare-backend
npm install
```

Frontend:

```
cd shieldshare-frontend
npm install
```

---

### 3. Run Backend

```
npm run dev
```

Runs on:

```
http://localhost:5005
```

---

### 4. Run Frontend

```
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

---

### Documents

```
POST /api/documents/upload
GET  /api/documents
DELETE /api/documents/:id
GET /api/documents/share/:token
```

---

## 📦 Future Improvements

* File encryption before upload
* AWS S3 / Cloudinary storage
* Download analytics
* Password-protected file links
* Email share links
* Rate limiting

---

## 👨‍💻 Author

**Chaitanya Shinde**

Portfolio: https://www.chaitanya-dev.space
GitHub: https://github.com/chaitanya-92

---


