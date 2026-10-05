import { type SpinnerParams, spinnerParams } from "@/lib/catalog";
import { getSpinnerDocument } from "@/lib/spinner-markdown";

export const generateStaticParams = spinnerParams;

export async function GET(
  _request: Request,
  { params }: { params: Promise<SpinnerParams> }
) {
  const { slug } = await params;
  const document = await getSpinnerDocument(slug);

  if (!document) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(document.markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
