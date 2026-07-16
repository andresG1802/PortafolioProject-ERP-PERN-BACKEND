# Inventory System API

Backend de un mini-ERP (inventario, catálogo, compras y ventas) construido con **Node.js + Express + TypeScript + Prisma (PostgreSQL)**, siguiendo arquitectura limpia (domain / infrastructure / use-cases / presentation).

## Requisitos

- Node.js 18+
- Docker (para levantar PostgreSQL vía `docker-compose`)

## Instalación

```bash
npm install
```

Crea el archivo de variables de entorno a partir del ejemplo:

```bash
cp .env.example .env
```

Revisa `.env` antes de continuar. Si ya tienes otro Postgres corriendo en el puerto `5432` o `5433` (otro proyecto, etc.), cambia `POSTGRES_PORT` / `POSTGRES_TEST_PORT` y actualiza `DATABASE_URL` / `TEST_DATABASE_URL` para que coincidan.

## Levantar la base de datos

```bash
npm run db:up      # levanta los contenedores de Postgres (dev + test) con docker-compose
npm run migrate:dev # aplica las migraciones de Prisma y genera el cliente
```

Para bajar los contenedores: `npm run db:down`.

## Correr el servidor

```bash
npm run dev
```

Levanta con hot-reload en `http://localhost:3000` (o el `PORT` que definas en `.env`).

## Otros comandos

| Comando | Descripción |
|---|---|
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Compila y corre la versión de producción (`node dist/app.js`) |
| `npm run prisma:generate` | Regenera el cliente de Prisma tras cambiar `schema.prisma` |
| `npm run prisma:studio` | Abre Prisma Studio para inspeccionar la base de datos |
| `npm run migrate:deploy` | Aplica migraciones pendientes (uso en producción/CI) |

## Endpoints principales

Todas las rutas (excepto `/api/auth`) requieren `Authorization: Bearer <token>` (obtenido en login/registro).

- `POST /api/auth/register`, `POST /api/auth/login`
- `/api/users`, `/api/products`, `/api/categories`, `/api/suppliers`, `/api/warehouses`, `/api/customers` — CRUD estándar
- `GET /api/products/:id/stock` — stock agregado de un producto (total y por almacén)
- `/api/stock-movements` — kardex: `POST /` (entrada/salida/ajuste), `POST /transfer` (entre almacenes), `GET /` (filtrable por `productId`/`warehouseId`)
- `/api/purchase-orders` — CRUD + `POST /:id/confirm`, `POST /:id/receive`, `POST /:id/cancel`
- `/api/sales-orders` — CRUD + `POST /:id/confirm`, `POST /:id/deliver`, `POST /:id/cancel`

## Stack

Express 5 · TypeScript · Prisma 7 (adapter `pg`) · PostgreSQL · JWT (`jsonwebtoken`) · `bcryptjs` · Docker Compose
