import { icons } from "lucide-react";
import type { HTMLAttributes } from "react";

export type LucideIconType = keyof typeof icons;

export interface LucideIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: LucideIconType;
  size?: number;
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const Icon = icons[name];

  if (!Icon) {
    throw new Error(`Icon ${name} not found`);
  }

  return <Icon className={props.className} {...props} />;
}
