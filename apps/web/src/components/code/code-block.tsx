import type { CopyEvent } from "@/components/ui/copy-button";
import { highlight } from "@/lib/highlight";
import { CodeFrame, CodeFrameLine } from "./code-frame";

export function CodeBlock({
  code,
  event,
}: {
  code: string;
  event?: CopyEvent;
}) {
  return (
    <CodeFrame event={event} text={code}>
      {highlight(code).map((line, index) => (
        <CodeFrameLine
          key={`${index}:${line.map(({ content }) => content).join("")}`}
        >
          {line.length === 0
            ? " "
            : line.map((token) => (
                <span key={token.offset} style={token.htmlStyle}>
                  {token.content}
                </span>
              ))}
        </CodeFrameLine>
      ))}
    </CodeFrame>
  );
}
