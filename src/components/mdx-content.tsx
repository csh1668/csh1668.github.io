import { MDXRemote } from "next-mdx-remote/rsc";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom mt-2">
      <MDXRemote source={source} />
    </div>
  );
}
