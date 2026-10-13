import { CopyButton } from "@/components/ui/copy-button";
import { Text } from "@/components/ui/text";

export function InstallCommand({ command }: { command: string }) {
  const [manager, action, ...packages] = command.split(" ");

  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-2xl border border-border bg-background-subtle pr-1 pl-4">
      <Text as="span" className="font-paper-mono text-content-subtle" size="sm">
        $
      </Text>
      <Text
        as="span"
        className="min-w-px flex-1 font-paper-mono text-content-subtle"
        size="sm"
      >
        {manager} {action}{" "}
        <span className="text-orange">{packages.join(" ")}</span>
      </Text>
      <CopyButton
        className="size-10 rounded-xl"
        event={{ name: "Install Copied" }}
        text={command}
      />
    </div>
  );
}
