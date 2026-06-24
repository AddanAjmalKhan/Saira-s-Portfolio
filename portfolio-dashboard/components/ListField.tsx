"use client";

export default function ListField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  function update(i: number, v: string) {
    const next = [...value];
    next[i] = v;
    onChange(next);
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...value, ""]);
  }

  return (
    <div className="space-y-2">
      {value.length === 0 && (
        <p className="text-xs text-white/40">No items yet.</p>
      )}
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea
            className="input min-h-[38px] flex-1"
            rows={1}
            value={item}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="btn-danger px-2 py-2"
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-secondary">
        + Add item
      </button>
    </div>
  );
}
