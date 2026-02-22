import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@/lib/types";

const VALID_STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const boardId = searchParams.get("boardId");
    const status = searchParams.get("status") as TaskStatus | null;

    const tasks = await prisma.task.findMany({
      where: {
        ...(boardId && { boardId }),
        ...(status && VALID_STATUSES.includes(status) && { status }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks error:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { boardId, title, description, status, assignedTo, dueDate } = body;

    if (!boardId || typeof boardId !== "string") {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 },
      );
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 },
      );
    }

    const board = await prisma.board.findUnique({ where: { id: boardId } });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const task = await prisma.task.create({
      data: {
        boardId,
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "todo",
        assignedTo: assignedTo?.trim() || null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
