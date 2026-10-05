import { describe, expect, it } from "vitest";
import { snippetCode } from "./code";

describe("customized snippets", () => {
  it("keeps full-opacity snippets free of a wrapper", () => {
    const expected = `import { Arc } from "loading-dev";

export function ArcDemo() {
  return <Arc size={48} />;
}`;
    expect(snippetCode("Arc", { size: 48 })).toBe(expected);
    expect(snippetCode("Arc", { size: 48 }, 100)).toBe(expected);
  });

  it.each([0, 1, 50, 99])(
    "preserves %i percent opacity in the copied code",
    (opacity) => {
      expect(snippetCode("Arc", { size: 48 }, opacity)).toBe(
        `import { Arc } from "loading-dev";

export function ArcDemo() {
  return (
    <div style={{ opacity: ${opacity / 100} }}>
      <Arc size={48} />
    </div>
  );
}`
      );
    }
  );

  it("retains other customizations inside the opacity wrapper", () => {
    const code = snippetCode(
      "Arc",
      { cap: "flat", color: "#ff0000", duration: 1200, size: 96 },
      50
    );
    expect(code).toContain("<div style={{ opacity: 0.5 }}>");
    expect(code).toContain(
      '<Arc cap="flat" color="#ff0000" duration={1200} size={96} />'
    );
  });
});
