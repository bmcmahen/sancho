import * as React from "react";
import { IconName, IconSvgPaths16, IconSvgPaths20 } from "@blueprintjs/icons";
import theme from "./Theme";
import PropTypes from "prop-types";
import { ButtonSize } from "./Button";

export { IconNames, IconName } from "@blueprintjs/icons";

const sizesForIcon = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 32
};

export interface IconProps {
  color?: string;
  icon: IconName | JSX.Element | null;
  children?: never;
  size: number | ButtonSize;
  title?: string;
  style?: React.CSSProperties;
}

export class Icon extends React.Component<IconProps> {
  static defaultProps = {
    size: "md",
    color: theme.colors.palette.gray.dark
  };

  static propTypes = {
    /** The icon to render */
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

    /** The size of the icon */
    size: PropTypes.number,

    /** An optional title for the icon */
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
    let { style = {} } = this.props;
    if (color != null) {
      style = { ...style, fill: color };
    }

    return (
      <svg
        style={style}
        data-icon={icon}
        width={s}
        height={s}
        color={color}
        viewBox={viewBox}
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
