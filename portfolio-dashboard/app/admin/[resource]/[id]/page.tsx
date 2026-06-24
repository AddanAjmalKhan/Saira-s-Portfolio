import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/resources";
import ResourceForm from "@/components/ResourceForm";

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>;
}) {
  const { resource: slug, id } = await params;
  const resource = getResource(slug);
  if (!resource || resource.singleton) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = await (prisma as any)[resource.model].findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <Link href={`/admin/${slug}`} className="text-sm text-brand-light hover:underline">
          ← Back to {resource.labelPlural}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">Edit {resource.label.toLowerCase()}</h1>
      </div>
      <ResourceForm
        slug={slug}
        fields={resource.fields}
        initial={row}
        id={id}
        labelSingular={resource.label}
      />
    </div>
  );
}
