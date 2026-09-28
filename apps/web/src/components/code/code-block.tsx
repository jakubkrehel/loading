import { type CodeLine, codeText } from "@/lib/code";
import type { SnippetPalette } from "@/lib/code-theme";
import { CodeFrame, CodeFrameLine } from "./code-frame";

export function CodeBlock({
  lines,
  palette,
}: {
  lines: CodeLine[];
  palette: SnippetPalette;
}) {
  return (
    <CodeFrame text={codeText(lines)}>
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
