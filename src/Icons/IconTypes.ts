export type IconSizes = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: number | IconSizes;
}
