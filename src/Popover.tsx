/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import { ButtonProps } from "./Button";
import { IconButtonProps } from "./IconButton";
import { Layer } from "./Layer";
import { Positioner } from "./Positions";
import { ReferenceChildrenProps } from "react-popper";
import theme from "./Theme";
import { arrowStyles } from "./Tooltip";
import { useFocusElement } from "./Hooks/focus";
import { animated } from "react-spring";
import { Sheet } from "./Sheet";
import { useMedia } from "use-media";

const AnimatedLayer = animated(Layer);

interface PopoverProps {
  show?: boolean;
  children: React.ReactElement<ButtonProps | IconButtonProps>;
  content: React.ReactNode;
  closeOnMenuItemClick?: boolean;
}

export function Popover({
  content,
  children,
  closeOnMenuItemClick = true,
  show: defaultShow = false
}: PopoverProps) {
  const [show, setShow] = React.useState(defaultShow);
  const child = React.Children.only(children);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const { bind } = useFocusElement(show, {
    escapeDeactivates: true,
    clickOutsideDeactivates: true
  });

  function open() {
    setShow(true);
    document.body.addEventListener("click", onBodyClick, false);
    document.body.addEventListener("keydown", onBodyKeyDown, false);
  }

  React.useEffect(() => {
    return removeBodyListeners;
  }, []);

  function close() {
    setShow(false);
    removeBodyListeners();
  }

  function removeBodyListeners() {
    document.body.removeEventListener("click", onBodyClick, false);
    document.body.removeEventListener("keydown", onBodyKeyDown, false);
  }

  function onBodyClick(e: MouseEvent) {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;

    if (!trigger || !popover) {
      return;
    }

    // Don't close if clicking the trigger
    if (trigger === e.target || trigger.contains(e.target as Node)) {
      return;
    }

    // or the popover, sometimes
    if (popover === e.target || popover.contains(e.target as Node)) {
      if (closeOnMenuItemClick) {
        const target = e.target as Element;
        if (
          target.hasAttribute('[data-trigger-close="true"]') ||
          target.closest('[data-trigger-close="true"]')
        ) {
          close();
          return;
        }
      }

      return;
    }

    close();
  }

  function onBodyKeyDown(e: KeyboardEvent) {
    // close on escape key or enter
    if (e.keyCode === 27) {
      close();
    }

    // close on enter
    if (closeOnMenuItemClick && e.keyCode === 13) {
      close();
    }
  }

  function renderTrigger({ ref }: ReferenceChildrenProps) {
    return React.cloneElement(child, {
      onClick: onTriggerClicked,
      ref: (el: HTMLButtonElement | null) => {
        ref(el);
        triggerRef.current = el;
      },
      role: "button",
      "aria-expanded": show,
      "aria-haspopup": true
    });
  }

  function onTriggerClicked(e: React.MouseEvent) {
    return show ? close() : open();
  }

  return (
    <Positioner show={show} duration={200} target={renderTrigger}>
      {({ placement, ref, arrowProps, style }, animation) => (
        <AnimatedLayer
          role="dialog"
          elevation="md"
          ref={el => {
            ref(el);
            bind.ref.current = el;
            popoverRef.current = el;
          }}
          style={{
            ...style,
            opacity: animation.opacity
          }}
          data-placement={placement}
          css={{
            margin: theme.spaces.sm,
            borderRadius: theme.radii.md
          }}
        >
          <div
            data-placement={placement}
            css={arrowStyles("white")}
            ref={arrowProps.ref}
            style={arrowProps.style}
          />
          {content}
        </AnimatedLayer>
      )}
    </Positioner>
  );
}

/**
 * Display popover contents in a bottom sheet if
 * on mobile devices. I generally find that this provides a
 * better use experience on smaller screens.
 */

export function ResponsivePopover(props: PopoverProps) {
  const showPopover = useMedia({
    minWidth: "567px"
  });

  const [isOpen, setIsOpen] = React.useState(false);

  if (showPopover) {
    return <Popover {...props} />;
  }

  return (
    <React.Fragment>
      {React.cloneElement(props.children, {
        onClick: () => {
          setIsOpen(true);
        }
      })}
      <Sheet
        position="bottom"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        {props.content}
      </Sheet>
    </React.Fragment>
  );
}
