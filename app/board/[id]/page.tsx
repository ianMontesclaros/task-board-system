"use client";

import { useState, useEffect, useCallback, use } from "react";
import { BoardWithTasks } from "@/lib/types";

import Link from "next/link";

export default function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [board, setBoard] = useState<BoardWithTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBoard = useCallback(async () => {
    try {
      const res = await fetch(`/api/boards/${id}`);
      if (!res.ok) throw new Error("Board not found");
      const data = await res.json();
      setBoard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load board");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className=" text-sm">Loading board…</div>
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-rose mb-4">{error || "Board not found"}</p>
          <Link href="/" className="text-sm  underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/"
              className="flex items-center gap-1.5  transition-colors text-sm"
            >
              Go back
            </Link>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl ">{board.name}</h1>
              {board.description && (
                <span className="text-sm  hidden sm:block">
                  · {board.description}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-black rounded-xl  transition-all font-medium text-white text-sm">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
