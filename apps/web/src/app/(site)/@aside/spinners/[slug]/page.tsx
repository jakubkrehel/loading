import { AsideShell } from "@/app/(site)/@aside/aside-shell";
import { CopyPageButton } from "@/components/spinner-detail/copy-page-button";
import { Toc } from "@/components/spinner-detail/toc";
import { type SpinnerParams, spinnerParams } from "@/lib/catalog";
import { PREVIEW_SECTION_ID } from "@/lib/constants";
import {
  type DocumentHeading,
  getSpinnerDocument,
} from "@/lib/spinner-markdown";

const PREVIEW_ITEM: DocumentHeading = {
  id: PREVIEW_SECTION_ID,
  label: "Preview",
};

export const generateStaticParams = spinnerParams;

export default async function SpinnerAside({
  params,
}: {
  params: Promise<SpinnerParams>;
}) {
  const { slug } = await params;
  const document = await getSpinnerDocument(slug);

  if (!document) {
    return <AsideShell />;
  }

  return (
    <AsideShell>
      <CopyPageButton markdown={document.markdown} slug={slug} />
      <Toc items={[PREVIEW_ITEM, ...document.headings]} />
    </AsideShell>
  );
}
