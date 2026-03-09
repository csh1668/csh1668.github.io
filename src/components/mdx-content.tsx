import { MDXRemote } from "next-mdx-remote/rsc";
import { LucideIcon, type LucideIconType } from "./lucide-icon";

function Meta({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 not-prose">{children}</div>;
}

function Stat({ icon, count }: { icon: LucideIconType; count: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-base text-foreground/40">
      <LucideIcon name={icon} className="h-4 w-4" />
      {count}
    </span>
  );
}

function IconLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: LucideIconType;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="text-foreground/40 transition-colors hover:text-foreground/70 inline-flex"
    >
      <LucideIcon name={icon} className="h-4 w-4" />
    </a>
  );
}

const mdxComponents = {
  Meta,
  Stat,
  IconLink,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom mt-2">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
