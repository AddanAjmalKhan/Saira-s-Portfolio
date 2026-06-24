import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { ResourceDef } from "@/lib/resources";

/** Get the Prisma delegate for a model name (e.g. "publication"). */
export function delegate(model: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[model];
}

export async function ensureAuth() {
  return getSession();
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export function badRequest(errors: Record<string, string> | string) {
  return NextResponse.json(
    typeof errors === "string" ? { error: errors } : { error: "Validation failed", errors },
    { status: 400 },
  );
}

export function notFound() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export function serverError(message = "Server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

/** Whether a resource has an `order` field (drives sorting + reorder). */
export function hasOrder(resource: ResourceDef): boolean {
  return resource.fields.some((f) => f.name === "order");
}

/** Build the orderBy clause for listing a resource. */
export function orderByFor(resource: ResourceDef) {
  if (hasOrder(resource)) return [{ order: "asc" as const }];
  const first = resource.fields[0]?.name ?? "id";
  return [{ [first]: "asc" as const }];
}
