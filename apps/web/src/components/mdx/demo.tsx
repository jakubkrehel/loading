import { SPINNERS } from "loading-dev";
import { CodeBlock } from "@/components/code/code-block";
import { CodePanel } from "@/components/mdx/code-panel";
import type { SpinnerItem } from "@/lib/catalog";
import { DEMO_ROW } from "@/lib/code";
import { demoCode, demoElements } from "@/lib/demos";

export function Demo({ item, name }: { item: SpinnerItem; name: string }) {
  const Spinner = SPINNERS[item.slug];

  return (
    <CodePanel className="mt-8">
      <div className="flex min-h-60 items-center justify-center rounded-2xl border border-border bg-surface p-1">
        <div className={DEMO_ROW}>
          {demoElements(item, name).map((props) => (
            <Spinner key={JSON.stringify(props)} {...props} />
          ))}
        </div>
      </div>
      <CodeBlock
        code={demoCode(item, name)}
        event={{ name: "Demo Copied", properties: { spinner: item.slug } }}
      />
    </CodePanel>
  );
}
