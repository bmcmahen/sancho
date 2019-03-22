/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { IconName, IconSvgPaths16, IconSvgPaths20 } from "@blueprintjs/icons";
import theme from "./Theme";
import PropTypes from "prop-types";
import { ButtonSize } from "./Button";

export { IconNames, IconName } from "@blueprintjs/icons";

export const sizesForIcon = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 32
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  /** The icon to render. Either an icon name or an svg element. */
  icon: IconName | JSX.Element | null;
  children?: never;
  /** The size of the icon. Either a number or string (sm, md, etc.) */
  size: number | ButtonSize;
  /** An optional title for the icon */
  title?: string;
  style?: React.CSSProperties;
}

export class Icon extends React.Component<IconProps> {
  static defaultProps = {
    size: "md",
    color: theme.colors.palette.gray.base
  };

  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
    ]),
    title: PropTypes.string
  };

  render() {
    const { title, color, icon, size, ...other } = this.props;

    if (icon == null) return null;
    else if (typeof icon !== "string") return icon;

    const s =
      typeof size === "string" ? sizesForIcon[size as ButtonSize] : size;

    const pixelGridSize =
      s >= sizesForIcon.lg ? sizesForIcon.lg : sizesForIcon.md;
    const paths = this.renderSvgPaths(pixelGridSize, icon);
    if (paths == null) {
      return null;
    }

    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;

    return (
      <svg
        data-icon={icon}
        width={s}
        height={s}
        color={color}
        viewBox={viewBox}
        css={{
          fill: color
        }}
        {...other}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </svg>
    );
  }

  private renderSvgPaths(pathsSize: number, iconName: IconName) {
    const svgPathsRecord =
      pathsSize === sizesForIcon.md ? IconSvgPaths16 : IconSvgPaths20;
    const pathStrings = svgPathsRecord[iconName];
    if (pathStrings == null) {
      return null;
    }
    return pathStrings.map((d, i) => <path key={i} d={d} fillRule="evenodd" />);
  }
}
