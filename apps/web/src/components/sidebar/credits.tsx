import { Separator } from "@base-ui/react/separator";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { BLOB_BASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function Nametag({
  avatar,
  href,
  name,
}: {
  avatar: string;
  href: string;
  name: string;
}) {
  return (
    <a
      className="group whitespace-nowrap transition-colors hover-hover:hover:text-content"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <Image
        alt=""
        className="mr-1 mb-0.5 inline-block size-4 rounded-full opacity-50 transition-opacity hover-hover:group-hover:opacity-100"
        height={16}
        src={avatar}
        width={16}
      />
      {name}
    </a>
  );
}

export function Credits({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 px-4 pb-4", className)}>
      <Separator className="h-px bg-border" />
      <Text className="text-content-subtle leading-relaxed" size="sm">
        Made with care by{" "}
        <Nametag
          avatar={`${BLOB_BASE}/jakub.png?v=2`}
          href="https://x.com/jakubkrehel"
          name="Jakub Krehel"
        />{" "}
        and{" "}
        <Nametag
          avatar={`${BLOB_BASE}/paul.jpg`}
          href="https://x.com/paulfaivret"
          name="Paul Faivret"
        />
      </Text>
    </div>
  );
}
