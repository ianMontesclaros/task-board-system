import { STATUS_LABELS, Task, TaskStatus } from "@/lib/types";

function StatusColumn({
  status,
  tasks,
  onUpdate,
  onDelete,
}: {
  status: TaskStatus;
  tasks: Task[];
  onUpdate: (t: Task) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-medium text-sm">{STATUS_LABELS[status]}</h3>
        <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed p-6 text-center text-xs">
            No tasks
          </div>
        ) : (
          tasks.map((task) => <div></div>)
        )}
      </div>
    </div>
  );
}

export default StatusColumn;
