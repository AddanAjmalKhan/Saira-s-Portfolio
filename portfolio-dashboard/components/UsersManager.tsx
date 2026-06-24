"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

// Client-side mirrors of the server rules (server still re-validates).
function nameError(name: string): string | null {
  const n = name.trim();
  if (n.length < 2) return "Name must be at least 2 characters.";
  if (!/^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(n))
    return "Name can only contain letters, spaces, hyphens, apostrophes and periods.";
  return null;
}
function emailError(email: string): string | null {
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim()))
    return "Please enter a valid email address.";
  return null;
}
function passwordError(pw: string): string | null {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(pw)) return "Password must include at least one letter.";
  if (!/[0-9]/.test(pw)) return "Password must include at least one number.";
  if (!/[^A-Za-z0-9]/.test(pw)) return "Password must include at least one special character.";
  return null;
}

export default function UsersManager({
  currentUserId,
  initialUsers,
}: {
  currentUserId: string;
  initialUsers: User[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EDITOR" });
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "", role: "EDITOR" });

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const err = nameError(form.name) || emailError(form.email) || passwordError(form.password);
    if (err) { setError(err); return; }
    setBusy(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error || "Could not create user."); return; }
    setForm({ name: "", email: "", password: "", role: "EDITOR" });
    setNotice(`User “${json.name}” created.`);
    router.refresh();
  }

  async function saveEdit(id: string) {
    setError(null);
    setNotice(null);
    const err =
      nameError(editForm.name) ||
      emailError(editForm.email) ||
      (editForm.password ? passwordError(editForm.password) : null);
    if (err) { setError(err); return; }
    setBusy(true);
    const payload: Record<string, string> = {
      name: editForm.name,
      email: editForm.email,
      role: editForm.role,
    };
    if (editForm.password) payload.password = editForm.password;
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error || "Could not update user."); return; }
    setEditing(null);
    router.refresh();
  }

  async function removeUser(id: string) {
    if (!confirm("Delete this user? They will no longer be able to sign in.")) return;
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    setBusy(false);
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error || "Could not delete user."); return; }
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {error && <div className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-200">{error}</div>}
      {notice && <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-200">{notice}</div>}

      {/* Users table */}
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-xs uppercase tracking-wide text-white/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {initialUsers.map((u) => (
              <tr key={u.id} className="align-top hover:bg-white/[0.03]">
                {editing === u.id ? (
                  <td colSpan={4} className="bg-white/[0.02] px-5 py-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input className="input" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
                      <input className="input" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
                      <input className="input" type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} placeholder="New password (leave blank to keep)" />
                      <select className="input" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                    <p className="mt-1 text-xs text-white/40">
                      Password (if changed) needs 8+ chars with a letter, a number and a special character.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button className="btn-primary" onClick={() => saveEdit(u.id)} disabled={busy}>Save</button>
                      <button className="btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="px-5 py-3 text-white/80">{u.name}</td>
                    <td className="px-5 py-3 text-white/80">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70">{u.role}</span>
                      {u.id === currentUserId && <span className="ml-2 text-xs text-white/40">(you)</span>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="rounded px-3 py-1 font-medium text-brand-light hover:bg-brand-light/10" onClick={() => { setEditing(u.id); setEditForm({ name: u.name, email: u.email, password: "", role: u.role }); }}>Edit</button>
                      {u.id !== currentUserId && (
                        <button className="rounded px-3 py-1 font-medium text-red-300 hover:bg-red-500/10" onClick={() => removeUser(u.id)} disabled={busy}>Delete</button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add user */}
      <div className="card p-5">
        <h2 className="mb-1 text-sm font-semibold text-white">Add a new user</h2>
        <p className="mb-3 text-xs text-white/50">
          Name and email must be unique. Password needs 8+ characters with at least one letter, one number and one special character.
        </p>
        <form onSubmit={addUser} className="grid gap-3 sm:grid-cols-2">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="EDITOR">Editor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy ? "Adding…" : "Add user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
