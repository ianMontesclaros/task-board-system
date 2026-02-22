import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { tasks: true } },
        tasks: {
          select: { status: true },
        },
      },
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error("GET /api/boards error:", error);

    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const board = await prisma.board.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
      include: { _count: { select: { tasks: true } } },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("POST /api/boards error:", error);

    return NextResponse.json(
      { error: "Failed to create board" },
      { status: 500 },
    );
  }
}
