# Suplaihub

Suplaihub is a B2B supplier catalog application designed specifically for campus projects. The application facilitates procurement needs such as raw materials, packaging, logistics, and machinery. This backend provides role-based authentication endpoints, product catalog management for suppliers, catalog search and discovery for clients, as well as shopping cart and checkout simulations.

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-JWT%20HS256-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

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

This project strictly adheres to a **Layered Architecture (MVC)** pattern. Each layer has a single responsibility and communicates only with its direct neighbor.

```text
config/       → Environment loading (.env) and Supabase database connection initialization
middlewares/  → JWT verification and role-based access enforcement
controllers/  → HTTP request/response handling, input validation, and response formatting
models/       → Data interface definitions and direct database queries via Supabase
utils/        → Shared helper functions (password hashing, JWT generation & verification)
routes/       → Centralized route declarations and middleware attachment