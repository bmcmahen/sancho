/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useUid } from "./Hooks/use-uid";
import { safeBind } from "./Hooks/compose-bind";
import usePopper from "./Hooks/use-popper";
import Popper from "popper.js";

/**
 * The goal is to provide something flexible enough that you can provide
 * something along the lines of twitter's search, or more
 * of an autocomplete style form element.
 *
 * Ryan florence's combobox was a big source of inspiration here.
 * https://ui.reach.tech/combobox
 */

interface ContextType {
  inputRef: React.RefObject<HTMLInputElement>;
  targetRef: React.RefObject<HTMLElement>;
  options: React.MutableRefObject<string[] | null>;
  selected: string | null;
  listId: string;
  makeHash: (i: string) => string;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  popper: {
    ref: React.RefObject<HTMLElement>;
    styles: React.CSSProperties;
    placement: Popper.Placement;
  };
  arrow: {
    ref: React.RefObject<HTMLElement>;
    styles: React.CSSProperties;
  };
}

export const ComboBoxContext = React.createContext<ContextType | null>(null);

/**
 * Context provider
 */

export interface ComboBoxProps {}

export const ComboBox: React.FunctionComponent<ComboBoxProps> = ({
  children
}) => {
  const inputRef = React.useRef(null);
  const listId = `list${useUid()}`;
  const options = React.useRef<string[] | null>([]);
  const [expanded, setExpanded] = React.useState(false);
  const { reference, popper, arrow } = usePopper({ placement: "bottom" });
  const [selected, setSelected] = React.useState(null);

  // pressing down arrow
  const highlightNext = React.useCallback(() => {
    console.log("select next");
  }, []);

  // pressing up arrow
  const highlightPrev = React.useCallback(() => {
    console.log("select prev");
  }, []);

  // enter pressed while highlighted
  // or clicked a list option
  const onSelect = React.useCallback(() => {
    console.log("selected");
  }, []);

  // escape key pressed
  const onEscape = React.useCallback(() => {
    console.log("escape");
  }, []);

  const makeHash = React.useCallback(
    (i: string) => {
      return listId + i;
    },
    [listId]
  );

  return (
    <ComboBoxContext.Provider
      value={{
        inputRef,
        targetRef: reference.ref,
        popper,
        selected,
        arrow,
        options,
        listId,
        makeHash,
        expanded,
        setExpanded
      }}
    >
      {children}
    </ComboBoxContext.Provider>
  );
};

/**
 * Input element
 */

export interface ComboBoxInputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  "aria-label": string;
  component?: React.ReactType<any>;
  [key: string]: any;
}

export const ComboBoxInput: React.FunctionComponent<ComboBoxInputProps> = ({
  component: Component = "input",
  onChange,
  value,
  ...other
}) => {
  const context = React.useContext(ComboBoxContext);

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { targetRef, makeHash, selected, listId, inputRef } = context;

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    console.log("key down!");
  }, []);

  return (
    <Component
      id={listId}
      onKeyDown={onKeyDown}
      onChange={onChange}
      aria-controls={listId}
      value={value}
      aria-readonly
      aria-autocomplete="list"
      role="textbox"
      aria-activedescendant={selected ? makeHash(selected) : undefined}
      {...safeBind(
        {
          ref: inputRef
        },
        {
          ref: targetRef
        },
        other
      )}
    />
  );
};

/**
 * Popover container
 */

export interface ComboBoxListProps {}

interface ChildrenContextType {
  index: number;
}

const ComboChildrenContext = React.createContext<ChildrenContextType | null>(
  null
);

export const ComboBoxList: React.FunctionComponent<ComboBoxListProps> = ({
  children
}) => {
  const context = React.useContext(ComboBoxContext);

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { listId, popper, options, arrow } = context;

  React.useLayoutEffect(() => {
    options.current = [];
    return () => {
      options.current = [];
    };
  });

  return (
    <ul
      ref={popper.ref as any}
      tabIndex={-1}
      style={popper.styles}
      data-placement={popper.placement}
      id={listId}
      role="listbox"
      className="ComboBoxList"
      css={{
        width: "200px",
        height: "200px",
        border: "1px solid black"
      }}
    >
      {children}
      <div ref={arrow.ref as any} style={arrow.styles} />
    </ul>
  );
};

/**
 * Individual combo box options
 */

export interface ComboBoxOptionProps {
  value: string;
}

export const ComboBoxOption: React.FunctionComponent<ComboBoxOptionProps> = ({
  value,
  children,
  ...other
}) => {
  const context = React.useContext(ComboBoxContext);

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { makeHash, options, selected } = context;

  React.useEffect(() => {
    if (options.current) {
      options.current.push(value);
    }
  });

  return (
    <div
      tabIndex={-1}
      id={makeHash(value)}
      role="option"
      aria-selected={selected ? "true" : "false"}
      {...other}
    >
      {children || value}
    </div>
  );
};
