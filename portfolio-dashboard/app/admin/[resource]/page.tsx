import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/resources";
import { hasOrder, orderByFor } from "@/lib/api";
import ResourceListClient from "@/components/ResourceListClient";

export const dynamic = "force-dynamic";

export default async function ResourceListPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  if (resource.singleton) redirect(`/admin/${slug}/edit`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: Record<string, unknown>[] = await (prisma as any)[resource.model].findMany({
    orderBy: orderByFor(resource),
  });

  const columns = resource.fields.filter((f) => f.listColumn).slice(0, 4);
  const cols = columns.length
    ? columns
    : resource.fields.filter((f) => f.name !== "order").slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{resource.labelPlural}</h1>
          <p className="text-sm text-white/50">{rows.length} item(s)</p>
        </div>
        <Link href={`/admin/${slug}/new`} className="btn-primary">
          + Add new
        </Link>
      </div>

      <ResourceListClient
        slug={slug}
        labelSingular={resource.label}
        columns={cols}
        rows={rows}
        canReorder={hasOrder(resource)}
      />
    </div>
  );
}
