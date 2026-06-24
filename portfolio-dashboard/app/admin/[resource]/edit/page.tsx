import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getResource } from "@/lib/resources";
import ResourceForm from "@/components/ResourceForm";

export const dynamic = "force-dynamic";

// Singleton edit page (e.g. /admin/profile/edit).
export default async function SingletonEditPage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource || !resource.singleton) notFound();

  const id = resource.singletonId ?? "singleton";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = await (prisma as any)[resource.model].findUnique({ where: { id } });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-5 text-2xl font-bold text-white">{resource.labelPlural}</h1>
      <ResourceForm
        slug={slug}
        fields={resource.fields}
        initial={row ?? null}
        id={id}
        singleton
        singletonId={id}
        labelSingular={resource.label}
      />
    </div>
  );
}
