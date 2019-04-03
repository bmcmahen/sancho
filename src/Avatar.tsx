/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { Text } from "./Text";
import PropTypes from "prop-types";
import { Theme } from "./Theme";
import { useTheme } from "./Theme/Providers";

export type AvatarSizes = "xs" | "sm" | "md" | "lg" | "xl";

const sizes = (theme: Theme) => ({
  xs: css({ width: "1.25rem", height: "1.25rem", fontSize: "0.7rem" }),
  sm: css({ width: "2.02rem", height: "2.02rem", fontSize: "0.875rem" }),
  md: css({ width: "3.27rem", height: "3.27rem", fontSize: "1.41rem" }),
  lg: css({ width: "5.29rem", height: "5.29rem", fontSize: "2.29rem" }),
  xl: css({ width: "8.57rem", height: "8.57rem", fontSize: "3.70rem" })
});

interface AvatarProps {
  /** Determine the size of the avatar */
  size?: AvatarSizes;
  /** The image source */
  src?: string;
  /** An alternative to setting the src attribute. */
  srcSet?: string;
  /**The name of the user. Used as an alt attribute, or used to generate initials in the absence of an image. */
  name?: string;
}

/**
 * Display a profile image to represent a user. Initials can be shown as a fallback
 */
export const Avatar: React.FunctionComponent<AvatarProps> = ({
  src,
  name,
  size = "md",
  srcSet,
  ...other
}) => {
  const theme = useTheme();
  const dark = theme.colors.mode === "dark";

  const colors = Object.keys(theme.colors.palette);
  const img = src || srcSet;
  let initials = getInitials(name);
  if (size === "xs") initials = initials.substring(0, 1);
  const color = colors[
    Math.abs(makeHash(name)) % colors.length
  ] as keyof typeof theme.colors.palette;

  const [error, setError] = React.useState(false);

  function onError() {
    setError(true);
  }

  return (
    <div
      css={[
        {
          display: "flex",
          alignItems: "center",
          flex: "0 0 auto",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: img
            ? theme.colors.background.tint2
            : theme.colors.palette[color][dark ? "light" : "base"]
        },
        sizes(theme)[size]
      ]}
      {...other}
    >
      {img && !error ? (
        <img
          alt={name}
          src={src}
          srcSet={srcSet}
          onError={onError}
          css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
            display: "block"
          }}
        />
      ) : (
        <div>
          <VisuallyHidden>{name}</VisuallyHidden>
          <Text
            css={{
              fontWeight: size === "xs" ? 500 : 400,
              fontSize: "inherit",
              color: dark ? "rgba(0,0,0,0.75)" : "white"
            }}
          >
            {initials}
          </Text>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"] as AvatarSizes[]),
  srcSet: PropTypes.string
};

function getInitials(name: string = "?") {
  return name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map(v => v[0])
    .join("")
    .toUpperCase();
}

function makeHash(name: string = "?") {
  var hash = 0,
    i,
    chr;
  if (name.length === 0) return hash;
  for (i = 0; i < name.length; i++) {
    chr = name.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
