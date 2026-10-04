import { Credits } from "@/components/site/credits";
import { InstallCommand } from "@/components/site/install-command";
import { SpinnerCard } from "@/components/site/spinner-card";
import { PageHeader } from "@/components/ui/page-header";
import { SPINNER_ITEMS } from "@/lib/catalog";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        className="sm:px-4"
        description={SITE_DESCRIPTION}
        title={
          <>
            Loading,
            <br />
            <span className="opacity-50">made beautiful.</span>
          </>
        }
      />
      <InstallCommand command="npm install loading-dev" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {SPINNER_ITEMS.map((item) => (
          <SpinnerCard item={item} key={item.slug} />
        ))}
      </div>
      <Credits className="px-0 pb-0 md:hidden" />
    </div>
  );
}
