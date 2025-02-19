# Natask (Server)

Natask is a web-based task management platform designed to help teams efficiently assign, track, and manage tasks in real-time (in progress...), enhancing productivity and collaboration. This repository contains the frontend of Natask, built with modern web technologies.

## Tech Stack

- **Node.js**: Runtime environment for JavaScript
- **Express.js**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing tasks and user data
- **JSON Web Token (JWT)**: Authentication and security
- **Web Socket (soon)**: Real-time task status updates

### WebSocket Limitation on Vercel

Real-time task status updates were originally implemented using native WebSocket. However, Vercel does not natively support WebSocket connections. To enable real-time features in production, integrating a third-party WebSocket server (e.g., Supabase or Firebase) is necessary.

## Future Improvements

- Implement third-party WebSocket integration for real-time updates.
- Improve dashboard analytics and reporting.
- Enhance UI/UX for better user experience.

## Endpoint

| Method | Endpoint                          | Deskripsi                                  |
| ------ | --------------------------------- | ------------------------------------------ |
| POST   | `/api/auth/register`              | Mendaftarkan pengguna baru                 |
| POST   | `/api/auth/login`                 | Login pengguna                             |
| POST   | `/api/auth/forgot-password`       | Mengirimkan email reset password           |
| POST   | `/api/auth/reset-password/:token` | Reset password dengan token                |
| GET    | `/api/tasks`                      | Mendapatkan daftar semua tugas             |
| POST   | `/api/tasks`                      | Membuat tugas baru                         |
| PUT    | `/api/tasks/:taskId`              | Memperbarui tugas                          |
| DELETE | `/api/tasks/:taskId`              | Menghapus tugas                            |
| GET    | `/api/tasks/:taskId/subtasks`     | Mendapatkan sub-tugas dalam tugas tertentu |
| POST   | `/api/tasks/:taskId/subtasks`     | Menambahkan sub-tugas ke tugas             |
