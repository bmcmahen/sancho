/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { Positioner, Placements } from "./Positions";
import { ReferenceChildrenProps } from "react-popper";
import { Text } from "./Text";
import theme from "./Theme";
import { animated } from "react-spring";
import PropTypes from "prop-types";
import { isMobile } from "is-mobile";
import uniqueId from "lodash.uniqueid";

interface TooltipProps {
  content: React.ReactNode;
  placement?: Placements;
  children: React.ReactNode;
  id?: string;
}

let idcount = 0;

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  placement,
  children,
  content,
  id = uniqueId()
}) => {
  const [show, setShow] = React.useState(false);

  function renderTrigger({ ref }: ReferenceChildrenProps) {
    // We don't want tooltips to show on touch based devices
    // so we just return the child without the event handlers.
    // Really not sure if this is the best way to do this.
    if (isMobile()) {
      return children;
    }

    // Enable on non-mobile devices
    return React.cloneElement(children as React.ReactElement<any>, {
      ref,
      "aria-describedby": id,
      onMouseEnter: (e: MouseEvent) => {
        if (!show) setShow(true);
      },
      onMouseLeave: (e: MouseEvent) => {
        if (show) setShow(false);
      },
      onFocus: (e: FocusEvent) => {
        if (!show) setShow(true);
      },
      onBlur: (e: FocusEvent) => {
        if (show) setShow(false);
      }
    });
  }

  return (
    <Positioner placement={placement} isOpen={show} target={renderTrigger}>
      {({ placement, ref, style, arrowProps }, state) => (
        <animated.div
          id={id}
          data-placement={placement}
          role="tooltip"
          ref={ref}
          style={{
            ...style,
            opacity: state.opacity
          }}
          css={{
            zIndex: theme.zIndex.tooltip,
            margin: theme.spaces.xs
          }}
        >
          <div
            data-placement={placement}
            css={arrowStyles(theme.colors.palette.gray.dark)}
            ref={arrowProps.ref}
            style={arrowProps.style}
          />
          <Text
            variant="body"
            css={[
              {
                fontSize: theme.sizes[0],
                display: "inline-block",
                margin: 0,
                boxShadow: theme.shadows.md,
                borderRadius: theme.radii.sm,
                padding: `${theme.spaces.xs} ${theme.spaces.md}`,
                color: "white",
                background: theme.colors.palette.gray.dark
              }
            ]}
          >
            {content}
          </Text>
        </animated.div>
      )}
    </Positioner>
  );
};

Tooltip.propTypes = {
  /** The content of the tooltip */
  content: PropTypes.node.isRequired,
  /** the target element for the tooltip */
  children: PropTypes.node.isRequired,
  /** Where the tooltip should be placed */
  placement: PropTypes.oneOf([
    "auto-start",
    "auto",
    "auto-end",
    "top-start",
    "top",
    "top-end",
    "right-start",
    "right",
    "right-end",
    "bottom-end",
    "bottom",
    "bottom-start",
    "left-end",
    "left",
    "left-start"
  ] as Placements[])
};

export const arrowStyles = (color: string) =>
  css(`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*='bottom'] {
    bottom: 100%;
    left: 0;
    margin-top: 0em;
    
    width: 1em;
    height: 0.25em;
    &::before {
      width: 10px;
      border: none;
      height: 10px;
      background: ${color};
      border-top: 1px solid ${color === "white" ? " #dee2e685" : color};
      border-right: 1px solid ${color === "white" ? "#dee2e685" : color};
      transform: rotate(-45deg);
      border-radius: 2px;
      margin-top: -1px;
    }
  }
  &[data-placement*='top'] {
    top: 100%;
    left: 0;
    margin-bottom: 0;
    width: 1em;
    height: 0.25em;
    &::before {
      border-width: 0.25em 0.25em 0 0.25em;
      border-color: ${color} transparent transparent transparent;
    }
  }
  &[data-placement*='right'] {
    right: 100%;
    height: 1em;
    width: 0.25em;
    &::before {
      border-width: 0.25em 0.25em 0.25em 0;
      border-color: transparent ${color} transparent transparent;
    }
  }
  &[data-placement*='left'] {
    left: 100%;
    height: 1em;
    width: 0.25em;
    &::before {
      border-width: 0.25em 0 0.25em 0.25em;
      border-color: transparent transparent transparent ${color};
    }
  }
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`);
