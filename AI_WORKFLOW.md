# AI Workflow

## 1. What AI tool did you use?

**Claude** — I used it as an AI pair programming assistant.

## 2. Example Prompts

**Prompt 1:**

> "Create a Prisma schema for a task board system. I need a Board model and a Task model. Task belongs to Board via foreign key. Task should have status (todo, in_progress, done) as an enum. Board deletion should cascade to tasks. Include fields: description for Board; description, assignedTo, dueDate for Task."

**Why I wrote it this way:** I wanted to make sure I got a working schema on the first try without having to go back and patch things.

**Result:** It generated the correct schema on first attempt.

**Prompt 2:**

> "Write API route for POST /api/boards. It should accept name, description, and color in the request body. Validate that name is present and non-empty. Return 400 if name is missing, 201 with the created board on success, and 500 for database errors. Use Prisma."

**Why I wrote it this way:** I wanted to make sure I got the right output on first attempt.

**Result:** Mostly. I had to make some adjustments.

### 3. Your process

## My Process

**What did you use AI for:**

- Generating the Prisma schema and migration structure
- Scaffolding all 4 API route files (GET/POST/PATCH/DELETE with validation and error codes)
- TypeScript type definitions
- Initial folder structure
- Helper functions
- Tailwind consistent styling

**What did I code manually:**

- Page components
- Reusable components
- State management logic
- The `.env.example` and README — written fresh

## 4. Time Management

**What I built first:**

1. Prisma schema with Board and Task models
2. Migration file
3. Frontend folder structure
4. Boards API endpoints
5. Tasks API endpoints
6. Initial dashboard page
7. New board modal
8. Board cards
9. Initial board page
10. New task modal
11. Board columns
12. Task cards

**What I skipped:**

- Sorting and filtering
- Analytics
- Real-time updates
- Export data
