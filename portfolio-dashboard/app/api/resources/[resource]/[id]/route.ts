import { NextRequest, NextResponse } from "next/server";
import { getResource } from "@/lib/resources";
import { coerceAndValidate } from "@/lib/validate";
import {
  delegate,
  ensureAuth,
  unauthorized,
  badRequest,
  notFound,
  serverError,
} from "@/lib/api";

// GET /api/resources/[resource]/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug, id } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();

  try {
    const row = await delegate(resource.model).findUnique({ where: { id } });
    if (!row) return notFound();
    return NextResponse.json(row);
  } catch (e) {
    console.error(e);
    return serverError();
  }
}

// PUT /api/resources/[resource]/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug, id } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();

  try {
    const raw = (await req.json()) as Record<string, unknown>;
    const { data, errors } = coerceAndValidate(resource, raw);
    if (Object.keys(errors).length) return badRequest(errors);

    if (resource.singleton) {
      // Upsert so a singleton always exists.
      const upserted = await delegate(resource.model).upsert({
        where: { id },
        update: data,
        create: { id, ...data },
      });
      return NextResponse.json(upserted);
    }

    const updated = await delegate(resource.model).update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: unknown) {
    console.error(e);
    if (isUniqueError(e)) return badRequest("A record with this unique value already exists.");
    if (isNotFoundError(e)) return notFound();
    return serverError();
  }
}

// DELETE /api/resources/[resource]/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug, id } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();
  if (resource.singleton) return badRequest("This resource cannot be deleted.");

  try {
    await delegate(resource.model).delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    if (isNotFoundError(e)) return notFound();
    return serverError();
  }
}

function isUniqueError(e: unknown): boolean {
  return Boolean(
    e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002",
  );
}
function isNotFoundError(e: unknown): boolean {
  return Boolean(
    e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2025",
  );
}
