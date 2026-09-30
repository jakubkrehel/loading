import type { CopyEvent } from "@/components/ui/copy-button";
import { type CodeLine, codeText } from "@/lib/code";
import type { SnippetPalette } from "@/lib/code-theme";
import { CodeFrame, CodeFrameLine } from "./code-frame";

export function CodeBlock({
  event,
  lines,
  palette,
}: {
  event?: CopyEvent;
  lines: CodeLine[];
  palette: SnippetPalette;
}) {
  return (
    <CodeFrame event={event} text={codeText(lines)}>
      {lines.map((line, index) => {
        let offset = 0;
        return (
          <CodeFrameLine key={`${index}:${codeText([line])}`}>
            {line.length === 0
              ? " "
              : line.map((token) => {
                  const start = offset;
                  offset += token.text.length;
                  return (
                    <span key={start} style={palette[token.kind]}>
                      {token.text}
                    </span>
                  );
                })}
          </CodeFrameLine>
        );
      })}
    </CodeFrame>
  );
}
