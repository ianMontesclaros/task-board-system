import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        tasks: { orderBy: { createdAt: "desc" } },
        _count: { select: { tasks: true } },
      },
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    console.error("GET /api/boards/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch board" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { name, description } = body;

    if (
      name !== undefined &&
      (typeof name !== "string" || name.trim().length === 0)
    ) {
      return NextResponse.json(
        { error: "Name cannot be empty" },
        { status: 400 },
      );
    }

    const board = await prisma.board.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
      },
      include: { _count: { select: { tasks: true } } },
    });

    return NextResponse.json(board);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    console.error("PATCH /api/boards/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    await prisma.board.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if ((error as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    console.error("DELETE /api/boards/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete board" },
      { status: 500 },
    );
  }
}
