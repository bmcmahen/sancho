/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useUid } from "./Hooks/use-uid";
import { safeBind } from "./Hooks/compose-bind";
import usePopper from "./Hooks/use-popper";
import Popper from "popper.js";

interface ContextType {
  inputRef: React.RefObject<HTMLInputElement>;
  targetRef: React.RefObject<HTMLElement>;
  listId: string;
  selectedIndex?: number;
  makeHash: (i: number) => string;
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
  const [expanded, setExpanded] = React.useState(false);
  const { reference, popper, arrow } = usePopper({ placement: "bottom" });

  const makeHash = React.useCallback(
    (i: number) => {
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
        arrow,
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

  const { targetRef, makeHash, selectedIndex, listId, inputRef } = context;

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
      aria-activedescendant={
        selectedIndex ? makeHash(selectedIndex) : undefined
      }
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

export const ComboBoxList: React.FunctionComponent<ComboBoxListProps> = ({
  children
}) => {
  const context = React.useContext(ComboBoxContext);

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { listId, popper, arrow } = context;

  return (
    <ul
      ref={popper.ref as any}
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
 * API: Ryan's from ReachUI is really nice
 *
 * <ComboBox> // context providerr
 *   <ComboBoxInput
 *      aria-label='Cities'
 *      component={Input}
 *      onChange={saveValue}
 *    />
 *
 *   {results && (
 *      <ComboBoxPopover>
 *         {results.map => <ComboBoxOption value={text} />} // allow custom render
 *      </ComboBoxPopover>
 *    )}
 * </ComboBox>
 *
 */
