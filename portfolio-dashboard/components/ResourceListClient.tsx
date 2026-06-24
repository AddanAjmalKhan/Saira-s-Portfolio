"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FieldDef } from "@/lib/resources";

interface Props {
  slug: string;
  labelSingular: string;
  columns: FieldDef[];
  rows: Record<string, unknown>[];
  canReorder: boolean;
}

function cellText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return `${value.length} item(s)`;
  const s = String(value);
  return s.length > 80 ? s.slice(0, 80) + "…" : s;
}

export default function ResourceListClient({
  slug,
  labelSingular,
  columns,
  rows,
  canReorder,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm(`Delete this ${labelSingular.toLowerCase()}? This cannot be undone.`)) return;
    setBusy(id);
    const res = await fetch(`/api/resources/${slug}/${id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      alert(json.error || "Delete failed.");
      return;
    }
    router.refresh();
  }

  async function reorder(id: string, direction: "up" | "down") {
    setBusy(id);
    await fetch(`/api/resources/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, direction }),
    });
    setBusy(null);
    router.refresh();
  }

  if (rows.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-white/50">
        Nothing here yet. Click <span className="font-medium text-white/80">Add new</span> to create your first entry.
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wide text-white/50">
          <tr>
            {columns.map((c) => (
              <th key={c.name} className="px-4 py-3 font-semibold">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => {
            const id = String(row.id);
            return (
              <tr key={id} className="hover:bg-white/[0.03]">
                {columns.map((c) => (
                  <td key={c.name} className="px-4 py-3 align-top text-white/80">
                    {cellText(row[c.name])}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {canReorder && (
                      <>
                        <button
                          className="rounded px-2 py-1 text-white/40 hover:bg-white/10 hover:text-white disabled:opacity-30"
                          onClick={() => reorder(id, "up")}
                          disabled={i === 0 || busy === id}
                          aria-label="Move up"
                        >
                          ▲
                        </button>
                        <button
                          className="rounded px-2 py-1 text-white/40 hover:bg-white/10 hover:text-white disabled:opacity-30"
                          onClick={() => reorder(id, "down")}
                          disabled={i === rows.length - 1 || busy === id}
                          aria-label="Move down"
                        >
                          ▼
                        </button>
                      </>
                    )}
                    <Link
                      href={`/admin/${slug}/${id}`}
                      className="rounded px-3 py-1 font-medium text-brand-light hover:bg-brand-light/10"
                    >
                      Edit
                    </Link>
                    <button
                      className="rounded px-3 py-1 font-medium text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                      onClick={() => remove(id)}
                      disabled={busy === id}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
