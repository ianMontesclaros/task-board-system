# Architecture

## 1. Why did you choose your technologies

### Next.js App Router (vs Pages Router)

I chose **App Router** because it's the current standard for new Next.js projects.

### PostgreSQL

I chose **PostgreSQL** because it has more rich features compared to the other options.

### Prisma ORM

I used Prisma because it has a clean migration system and Type-safe queries that integrate with TypeScript automatically

## 2. How did you design your API?

### REST API with Next.js Route Handlers

I used standard REST conventions for simplicity.

### Endpoint Structure

```
/api/boards
/api/boards/[id]
/api/tasks
/api/tasks/[id]
```

### PATCH

I used `PATCH` instead of `PUT` for both boards and tasks to send only the fields that needs to be changed.
