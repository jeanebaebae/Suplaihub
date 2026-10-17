# Suplaihub

Suplaihub is a B2B supplier catalog application designed specifically for campus projects. The application facilitates procurement needs such as raw materials, packaging, logistics, and machinery. This backend provides role-based authentication endpoints, product catalog management for suppliers, catalog search and discovery for clients, as well as shopping cart and checkout simulations.

![Kotlin](https://img.shields.io/badge/Kotlin-Android-7F52FF?style=flat-square&logo=kotlin&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Framework-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-555555?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-HS256-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

---

## Tech Stack

| <div align="center">Category</div> | <div align="center">Technology</div> |
| :--- | :--- |
| **Frontend** | Kotlin, Jetpack Compose |
| **Backend** | TypeScript |
| **Runtime Environment** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | JSON Web Token (JWT) & bcryptjs |
| **Logger** | [winstonjs/winston](https://github.com/winstonjs/winston) |
| **API Documentation** | Swagger |
| **Environment Management** | dotenv |

---

## Backend Architecture

This backend strictly adheres to a **Layered Architecture (MVC)** pattern. Each layer has a single responsibility and communicates only with its direct neighbor.

```text
config/       → Environment loading (.env) and Supabase database connection initialization
middlewares/  → JWT verification and role-based access enforcement
controllers/  → HTTP request/response handling, input validation, and response formatting
models/       → Data interface definitions and direct database queries via Supabase
utils/        → Shared helper functions (password hashing, JWT generation & verification)
routes/       → Centralized route declarations and middleware attachment

HTTP Request
  → Global Middleware (CORS, Express JSON Parser, Winston Logger)
  → Route Layer (URL Routing, Auth Middleware / JWT Verification)
  → Controller Layer (Validate Input, Sanitize Payload)
  → Model Layer (Data Abstraction, Business Logic, Ownership Check)
  → Database Client (Supabase JS SDK)
  → Supabase PostgreSQL Database