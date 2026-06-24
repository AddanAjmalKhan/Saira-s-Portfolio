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
  hasOrder,
  orderByFor,
} from "@/lib/api";

// GET /api/resources/[resource]  -> list all rows
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();

  try {
    const rows = await delegate(resource.model).findMany({ orderBy: orderByFor(resource) });
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return serverError();
  }
}

// POST /api/resources/[resource]  -> create a row
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();
  if (resource.singleton) return badRequest("This resource cannot be created.");

  try {
    const raw = (await req.json()) as Record<string, unknown>;
    const { data, errors } = coerceAndValidate(resource, raw);
    if (Object.keys(errors).length) return badRequest(errors);

    // Auto-assign order if the resource has an order field and none was given.
    if (hasOrder(resource) && (data.order === undefined || data.order === null)) {
      const max = await delegate(resource.model).aggregate({ _max: { order: true } });
      data.order = (max._max.order ?? 0) + 1;
    }

    const created = await delegate(resource.model).create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    console.error(e);
    if (isUniqueError(e)) return badRequest("A record with this unique value already exists.");
    return serverError();
  }
}

// PATCH /api/resources/[resource]  -> reorder { id, direction }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  if (!(await ensureAuth())) return unauthorized();
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource) return notFound();
  if (!hasOrder(resource)) return badRequest("This resource cannot be reordered.");

  try {
    const { id, direction } = (await req.json()) as { id: string; direction: "up" | "down" };
    const model = delegate(resource.model);
    const current = await model.findUnique({ where: { id } });
    if (!current) return notFound();

    // Find the neighbour in the requested direction.
    const neighbour = await model.findFirst({
      where: direction === "up" ? { order: { lt: current.order } } : { order: { gt: current.order } },
      orderBy: { order: direction === "up" ? "desc" : "asc" },
    });
    if (!neighbour) return NextResponse.json({ ok: true }); // already at the edge

    // Swap orders in a transaction.
    const { prisma } = await import("@/lib/prisma");
    await prisma.$transaction([
      model.update({ where: { id: current.id }, data: { order: neighbour.order } }),
      model.update({ where: { id: neighbour.id }, data: { order: current.order } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return serverError();
  }
}

function isUniqueError(e: unknown): boolean {
  return Boolean(
    e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002",
  );
}
