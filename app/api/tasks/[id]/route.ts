import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@/lib/types";

interface Params {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET /api/tasks/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();

    const { title, description, status, assignedTo, dueDate } = body;

    if (
      title !== undefined &&
      (typeof title !== "string" || title.trim().length === 0)
    ) {
      return NextResponse.json(
        { error: "Title cannot be empty" },
        { status: 400 },
      );
    }
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 },
      );
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
        ...(status !== undefined && { status }),
        ...(assignedTo !== undefined && {
          assignedTo: assignedTo?.trim() || null,
        }),
        ...(dueDate !== undefined && {
          dueDate: dueDate ? new Date(dueDate) : null,
        }),
      },
    });

    return NextResponse.json(task);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.error("PATCH /api/tasks/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.error("DELETE /api/tasks/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
