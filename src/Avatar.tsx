/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import VisuallyHidden from "@reach/visually-hidden";
import theme from "./Theme";
import { Text } from "./Text";

const sizes = {
  xs: css({ width: "1.5rem", height: "1.5rem", fontSize: theme.sizes[0] }),
  sm: css({ width: "2.5rem", height: "2.5rem", fontSize: theme.sizes[1] }),
  md: css({ width: "3.5rem", height: "3.5rem", fontSize: theme.sizes[1] }),
  lg: css({ width: "4.5rem", height: "4.5rem", fontSize: theme.sizes[3] }),
  xl: css({ width: "5.5rem", height: "5.5rem", fontSize: theme.sizes[4] })
};

export type AvatarSizes = keyof typeof sizes;

interface AvatarProps {
  size?: AvatarSizes;
  src?: string;
  srcSet?: string;
  name?: string;
}

const colors = Object.keys(theme.colors.palette);

export function Avatar({
  src,
  name,
  size = "md",
  srcSet,
  ...other
}: AvatarProps) {
  const img = src || srcSet;
  let initials = getInitials(name);
  if (size === "xs") initials = initials.substring(0, 1);
  const color = colors[
    Math.abs(makeHash(name)) % colors.length
  ] as keyof typeof theme.colors.palette;

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
            : theme.colors.palette[color].base
        },
        sizes[size]
      ]}
      {...other}
    >
      {img ? (
        <img
          alt={name}
          src={src}
          srcSet={srcSet}
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
              color: "white"
            }}
          >
            {initials}
          </Text>
        </div>
      )}
    </div>
  );
}

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
