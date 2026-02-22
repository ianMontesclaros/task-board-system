import { Board } from "@/lib/types";
import { useState } from "react";

function CreateBoardModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (board: Board) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Board name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create board");
      onCreated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl border animate-scale-in bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b ">
          <h2 className="font-display text-2xl">New Board</h2>
          <p className="text-sm mt-1">Create a space to organize your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-400 px-3 py-2">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium  mb-1.5">
              Board Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Engineering, Design, Marketing"
              className="w-full px-3 py-2.5 rounded-lg border  bg-white focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this board for?"
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border transition-all font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-black text-white font-medium transition-all disabled:opacity-50"
            >
              {loading ? "Creating…" : "Create Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoardModal;
