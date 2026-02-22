"use client";

import { useCallback, useEffect, useState } from "react";
import { Board } from "@/lib/types";

import CreateBoardModal from "./_components/CreateBoardModal";
import BoardCard from "./_components/BoardCard";

export default function DashboardPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const fetchBoards = useCallback(async () => {
    try {
      const res = await fetch("/api/boards");
      const data = await res.json();
      setBoards(Array.isArray(data) ? data : []);
    } catch {
      setBoards([]);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  function handleCreated(board: Board) {
    setBoards((prev) => [board, ...prev]);
    setShowCreate(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-black">MyTasks</span>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-black text-cream rounded-xl hover:opacity-80 transition-all font-medium text-sm text-white"
          >
            Add New Board
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-black mb-2">
            Your Boards
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pl-100 pr-100">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>

      {showCreate && (
        <CreateBoardModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
    </main>
  );
}
