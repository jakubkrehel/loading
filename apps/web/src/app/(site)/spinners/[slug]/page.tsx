import { Separator } from "@base-ui/react/separator";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodePanel } from "@/components/mdx/code-panel";
import { Demo } from "@/components/mdx/demo";
import { LiveSnippet } from "@/components/spinner-detail/live-snippet";
import { PrevNext } from "@/components/spinner-detail/prev-next";
import { CustomizationProvider } from "@/components/spinner-detail/spinner-customization";
import { SpinnerPreview } from "@/components/spinner-detail/spinner-preview";
import { PageHeader } from "@/components/ui/page-header";
import Shared from "@/content/spinners/_shared.mdx";
import {
  getAdjacentSpinners,
  getSpinner,
  type SpinnerParams,
  spinnerParams,
} from "@/lib/catalog";
import { PROSE_SECTION_ID, SITE_DESCRIPTION } from "@/lib/constants";
import type { MDXModule } from "@/lib/mdx";

export const generateStaticParams = spinnerParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<SpinnerParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getSpinner(slug);
  return {
    description: item?.description ?? SITE_DESCRIPTION,
    title: item?.name ?? "Spinners",
  };
}

export default async function SpinnerPage({
  params,
}: {
  params: Promise<SpinnerParams>;
}) {
  const { slug } = await params;
  const item = getSpinner(slug);

  if (!item) {
    notFound();
  }

  const { next, previous } = getAdjacentSpinners(slug);

  const options: MDXModule[] = await Promise.all(
    (item.options ?? []).map(
      (option) => import(`@/content/options/${option.prop}.mdx`)
    )
  );

  const components = {
    Demo: (props: { name: string }) => <Demo {...props} slug={item.slug} />,
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        className="sm:px-4"
        description={item.description}
        eyebrow="Component/"
        title={item.name}
      />
      <div className="flex flex-col">
        <CodePanel>
          <CustomizationProvider item={item} key={slug}>
            <SpinnerPreview />
            <LiveSnippet />
          </CustomizationProvider>
        </CodePanel>
        <div className="flex flex-col [&>figure]:mt-6" id={PROSE_SECTION_ID}>
          <Shared components={components} />
          {options.map(({ default: Option }, index) => (
            <Option components={components} key={item.options?.[index].prop} />
          ))}
        </div>
      </div>
      {(previous || next) && (
        <>
          <Separator className="h-px bg-border" />
          <PrevNext next={next} previous={previous} />
        </>
      )}
    </div>
  );
}
