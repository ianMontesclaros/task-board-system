# MyTasks — Task Board System

A full-stack task board system built with Next.js 14, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

## How to install:

### 1. What software is needed

- Node.js 18 or higher
- PostgreSQL (v13+) running locally or remotely

### 2. How to install dependencies

```bash
npm install
```

### 3. How to set up the database

```bash
# Create database
psql -U postgres -c "CREATE DATABASE taskboard_system;"

```

```bash
cp .env
```

Edit `.env` and set your PostgreSQL connection string:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskboard_system"
```

```bash
# Create tables
npx prisma migrate dev --name init

```

### 4. How to run the application

```bash
npm run dev
```

### 5. What URL to open in the browser

Visit [http://localhost:3000](http://localhost:3000)

---

## Tech Stack:

- Next.js 14 (App Router)
- TypeScript
- Prisma 5
- PostgreSQL
- Tailwind CSS
