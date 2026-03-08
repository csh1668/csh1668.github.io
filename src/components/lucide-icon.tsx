import { icons } from "lucide-react";
import { HTMLAttributes } from "react";

export interface LucideIconProps extends HTMLAttributes<HTMLOrSVGElement> {
    name: keyof typeof icons;
    size?: number;
}

export function LucideIcon({
    name,
    ...props
}: LucideIconProps) {
    const Icon = icons[name];

    if (!Icon) {
        throw new Error(`Icon ${name} not found`);
    }

    return <Icon className={props.className} {...props} />;
}