import Link from "next/link";

import { Board } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function BoardCard({ board }: { board: Board }) {
  return (
    <Link href={`/board/${board.id}`} className="group block">
      <div className="relative bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <h3 className="font-display text-xl  truncate">{board.name}</h3>
              {board.description && (
                <p className="text-sm  mt-0.5 line-clamp-2">
                  {board.description}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs  font-mono">{formatDate(board.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export default BoardCard;
