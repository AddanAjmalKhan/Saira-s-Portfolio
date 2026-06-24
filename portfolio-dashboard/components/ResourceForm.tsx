"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldDef } from "@/lib/resources";
import ListField from "@/components/ListField";
import ImageField from "@/components/ImageField";

interface Props {
  slug: string;
  fields: FieldDef[];
  initial: Record<string, unknown> | null;
  id: string | null; // null => create
  singleton?: boolean;
  singletonId?: string;
  labelSingular: string;
}

function defaultFor(field: FieldDef): unknown {
  if (field.type === "list") return [];
  if (field.type === "number") return "";
  return "";
}

export default function ResourceForm({
  slug,
  fields,
  initial,
  id,
  singleton,
  singletonId,
  labelSingular,
}: Props) {
  const router = useRouter();

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const v: Record<string, unknown> = {};
    for (const f of fields) {
      const init = initial?.[f.name];
      if (f.type === "list") v[f.name] = Array.isArray(init) ? init : [];
      else v[f.name] = init === null || init === undefined ? defaultFor(f) : init;
    }
    return v;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});
    setSaving(true);
    try {
      const isUpdate = singleton || Boolean(id);
      const targetId = singleton ? singletonId : id;
      const url = isUpdate
        ? `/api/resources/${slug}/${targetId}`
        : `/api/resources/${slug}`;
      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setError(json.error || "Save failed.");
        return;
      }
      if (!singleton) {
        router.push(`/admin/${slug}`);
      }
      router.refresh();
      if (singleton) setError("__saved__");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-5">
      {error && error !== "__saved__" && (
        <div className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">{error}</div>
      )}
      {error === "__saved__" && (
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-200">Saved.</div>
      )}

      {fields.map((f) => (
        <div key={f.name}>
          <label className="label" htmlFor={f.name}>
            {f.label}
            {f.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>

          {f.type === "textarea" ? (
            <textarea
              id={f.name}
              className="input min-h-[90px]"
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          ) : f.type === "list" ? (
            <ListField
              value={(values[f.name] as string[]) ?? []}
              onChange={(next) => set(f.name, next)}
            />
          ) : f.type === "image" ? (
            <ImageField
              value={String(values[f.name] ?? "")}
              onChange={(url) => set(f.name, url)}
            />
          ) : f.type === "select" ? (
            <select
              id={f.name}
              className="input"
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
            >
              <option value="">— Select —</option>
              {f.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={f.name}
              type={f.type === "number" ? "number" : f.type === "email" ? "email" : f.type === "url" ? "url" : "text"}
              className="input"
              value={String(values[f.name] ?? "")}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          )}

          {f.help && <p className="mt-1 text-xs text-white/40">{f.help}</p>}
          {errors[f.name] && <p className="mt-1 text-xs text-red-300">{errors[f.name]}</p>}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? "Saving…" : singleton ? "Save changes" : id ? "Save changes" : `Create ${labelSingular.toLowerCase()}`}
        </button>
        {!singleton && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.push(`/admin/${slug}`)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
