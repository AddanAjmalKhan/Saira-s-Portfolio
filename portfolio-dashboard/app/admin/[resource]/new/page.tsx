import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource } from "@/lib/resources";
import ResourceForm from "@/components/ResourceForm";

export default async function NewResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource: slug } = await params;
  const resource = getResource(slug);
  if (!resource || resource.singleton) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <Link href={`/admin/${slug}`} className="text-sm text-brand-light hover:underline">
          ← Back to {resource.labelPlural}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">New {resource.label.toLowerCase()}</h1>
      </div>
      <ResourceForm
        slug={slug}
        fields={resource.fields}
        initial={null}
        id={null}
        labelSingular={resource.label}
      />
    </div>
  );
}
