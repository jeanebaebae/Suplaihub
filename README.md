# Suplaihub Backend API

Suplaihub adalah API backend untuk aplikasi katalog supplier B2B sederhana yang dirancang khusus untuk proyek kampus. Aplikasi ini memfasilitasi pencarian dan pengadaan kebutuhan proyek seperti bahan baku, kemasan, logistik, dan mesin. Backend ini menyediakan endpoint otentikasi berbasis peran (*role-based*), manajemen katalog produk untuk supplier, pencarian katalog untuk client, serta simulasi keranjang belanja dan checkout.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Language** | TypeScript |
| **Runtime Environment** | Node.js |
| **Framework** | Express.js |
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | JSON Web Token (JWT) & bcryptjs |
| **Environment Management** | dotenv |

---

## Architecture

Proyek ini menerapkan **Layered Architecture (MVC)** yang terisolasi dengan jelas. Setiap lapisan memiliki tanggung jawab tunggal (*single responsibility*) dan berkomunikasi secara bertahap dengan lapisan di sekitarnya.

```text
config/       → memuat environment variable (.env) dan inisialisasi koneksi database Supabase
middlewares/  → verifikasi token JWT dan penanganan otorisasi berbasis peran (role-based access)
controllers/  → menangani request/response HTTP, validasi input dasar, dan pengiriman response
models/       → mendefinisikan entitas data/interface dan menangani query langsung ke database Supabase
utils/        → helper fungsi umum seperti hashing password, generasi & verifikasi JWT
routes/       → pendaftaran endpoint API dan pemetaan ke controller serta middleware yang sesuai