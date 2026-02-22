import { STATUS_ORDER, Task } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

function TaskCard({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (updated: Task) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [saving, setSaving] = useState(false);

  async function updateTask(data: Partial<Task>) {
    setSaving(true);

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const updated = await res.json();

      if (res.ok) onUpdate(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleEditSave() {
    if (!editTitle.trim()) return;

    await updateTask({ title: editTitle });
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm(`Delete "${task.title}"?`)) return;

    const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });

    if (res.ok) onDelete(task.id);
  }

  function cycleStatus() {
    const idx = STATUS_ORDER.indexOf(task.status);
    const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];

    updateTask({ status: next });
  }

  return (
    <div
      className={`group bg-white rounded-xl border p-4 hover:shadow-sm transition-all animate-slide-up ${
        saving ? "opacity-60" : ""
      }`}
    >
      {editing ? (
        <div className="mb-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSave();
              if (e.key === "Escape") {
                setEditing(false);
                setEditTitle(task.title);
              }
            }}
            className="w-full px-2 py-1 rounded border border-amber/50 bg-amber/5 focus:outline-none text-sm"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEditSave}
              className="text-xs px-2 py-1 rounded font-medium hover:bg/80 transition-all"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setEditTitle(task.title);
              }}
              className="text-xs px-2 py-1 hover: transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2 mb-3">
          <p
            className={`text-sm leading-snug flex-1 cursor-pointer hover:text-amber transition-colors ${
              task.status === "done" ? "line-through" : ""
            }`}
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {task.title}
          </p>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="p-1 rounded hover:text-amber-400 hover:bg-amber/10 transition-all"
              title="Edit title"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded hover:text-red-400 hover:bg-rose/10 transition-all"
              title="Delete task"
            >
              Delete
            </button>
            <button
              onClick={cycleStatus}
              className="p-1 rounded hover:text-green-400 hover:bg-rose/10 transition-all"
              title="Delete task"
            >
              Move
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {task.assignedTo && (
          <span className="text-xs font-mono">@{task.assignedTo}</span>
        )}

        {task.dueDate && (
          <span className="text-xs">due {formatDate(task.dueDate)}</span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
