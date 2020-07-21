/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { usePositioner } from "./Hooks/use-positioner";
import { useUid } from "./Hooks/use-uid";
import { safeBind } from "./Hooks/compose-bind";
import { useTheme } from "./Theme/Providers";
import { Text } from "./Text";
import { Touchable } from "./Touchable";
import { useMeasure, Bounds } from "./Hooks/use-measure";
import { Layer } from "./Layer";
import Highlighter from "react-highlight-words";
import { InputBase } from "./Form";

/**
 * Combobox context
 */

interface ComboBoxContextType {
  /** element refs */
  inputRef: React.RefObject<HTMLInputElement>;
  listRef: React.RefObject<HTMLElement>;

  /** list options */
  options: React.MutableRefObject<string[] | null>;
  makeHash: (i: string) => string;
  selected: string | null;
  expanded: boolean;

  /** event handlers */
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleOptionSelect: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;

  /** popover positions */
  position: any;
  inputSize: Bounds;
  listId: string;
  query: string;
  autocomplete: boolean;
}

export const ComboBoxContext = React.createContext<ComboBoxContextType | null>(
  null
);

/**
 * Context provider / manager
 */

export interface ComboBoxProps {
  onSelect?: (selected: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  autocomplete?: boolean;
}

export const ComboBox: React.FunctionComponent<ComboBoxProps> = ({
  children,
  onSelect,
  autocomplete = false,
  query,
  onQueryChange
}) => {
  const inputRef = React.useRef(null);
  const listRef = React.useRef(null);
  const listId = `list${useUid()}`;
  const options = React.useRef<string[] | null>([]);
  const position = usePositioner({
    modifiers: {
      flip: {
        enabled: false
      }
    }
  });
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const inputSize = useMeasure(inputRef);

  /**
   * Handle input change
   */

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // potentially show popover
      setSelected(null);
      if (!expanded) {
        setExpanded(true);
      }

      onQueryChange(e.target.value);
    },
    [expanded]
  );

  /**
   * Escape key pressed
   */

  const onEscape = React.useCallback(() => {
    setExpanded(false);
    setSelected(null);
  }, []);

  /**
   * Enter pressed or item clicked
   */

  const onItemSelect = React.useCallback(() => {
    // call the parent with the selected value?
    setExpanded(false);
    onSelect && onSelect(selected as string);
    setSelected(null);
  }, [selected, onSelect]);

  /**
   * Get the currently active option index
   * */

  const getSelectedIndex = React.useCallback(() => {
    if (!selected) return -1;
    return options.current!.indexOf(selected || "");
  }, [options, selected]);

  /**
   * Arrow up pressed
   */

  const onArrowUp = React.useCallback(() => {
    const opts = options.current!;
    const i = getSelectedIndex();

    // on input? cycle to bottom
    if (i === -1) {
      setSelected(opts[opts.length - 1]);

      // select prev
    } else {
      setSelected(opts[i - 1]);
    }
  }, [getSelectedIndex]);

  /**
   * Arrow down pressed
   */
  const onArrowDown = React.useCallback(() => {
    const opts = options.current!;
    const i = getSelectedIndex();
    // if last, cycle to first
    if (i + 1 === opts.length) {
      setSelected(opts[0]);

      // or next
    } else {
      setSelected(opts[i + 1]);
    }
  }, [getSelectedIndex, selected]);

  /**
   * Handle keydown events
   */

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          onArrowUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          onArrowDown();
          break;
        case "Escape":
          e.preventDefault();
          onEscape();
          break;
        case "Enter":
          e.preventDefault();
          onItemSelect();
          break;
      }
    },
    [onArrowDown, onArrowUp, onEscape, onItemSelect]
  );

  /**
   * Handle blur events
   */

  const handleBlur = React.useCallback(() => {
    requestAnimationFrame(() => {
      const focusedElement = document.activeElement;
      const list = listRef.current as any;

      if (focusedElement == inputRef.current || focusedElement == list) {
        // ignore
        return;
      }

      // ignore if our popover contains the focused element
      if (list && list.contains(focusedElement)) {
        return;
      }

      // hide popover
      setExpanded(false);
      setSelected(null);
    });
  }, []);

  /**
   * handle input focus
   */

  const handleFocus = React.useCallback(() => {
    setExpanded(true);
  }, []);

  /**
   * Handle item clicks
   */

  const handleOptionSelect = React.useCallback((value: string) => {
    onSelect && onSelect(value);
    setExpanded(false);
    setSelected(null);
  }, [onSelect]);

  /**
   * Make a unique hash for list + option
   */

  const makeHash = React.useCallback(
    (i: string) => {
      return listId + i;
    },
    [listId]
  );

  return (
    <ComboBoxContext.Provider
      value={{
        listId,
        inputRef,
        listRef,
        options,
        onInputChange,
        selected,
        onKeyDown,
        handleBlur,
        handleFocus,
        handleOptionSelect,
        position,
        makeHash,
        expanded,
        inputSize: inputSize.bounds,
        query,
        autocomplete
      }}
    >
      {children}
    </ComboBoxContext.Provider>
  );
};

/**
 * Input element
 */

export interface ComboBoxInputProps extends React.HTMLAttributes<any> {
  "aria-label": string;
  component?: React.ReactType<any>;
  [key: string]: any;
}

export const ComboBoxInput: React.FunctionComponent<ComboBoxInputProps> = ({
  component: Component = InputBase,
  ...other
}) => {
  const context = React.useContext(ComboBoxContext);
  const [localValue, setLocalValue] = React.useState("");

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const {
    onKeyDown,
    makeHash,
    selected,
    position,
    handleBlur,
    query,
    autocomplete,
    handleFocus,
    onInputChange,
    listId,
    inputRef
  } = context;

  /** support autocomplete on selection */

  React.useEffect(() => {
    if (!autocomplete) {
      return;
    }

    if (selected) {
      setLocalValue(selected);
    } else {
      setLocalValue("");
    }
  }, [selected, autocomplete]);

  return (
    <Component
      id={listId}
      onKeyDown={onKeyDown}
      onChange={onInputChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      aria-controls={listId}
      autoComplete="off"
      value={localValue || query}
      aria-readonly
      aria-autocomplete="list"
      role="textbox"
      aria-activedescendant={selected ? makeHash(selected) : undefined}
      {...safeBind(
        {
          ref: inputRef
        },
        {
          ref: position.target.ref
        },
        other
      )}
    />
  );
};

/**
 * Popover container
 */

export interface ComboBoxListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  autoHide?: boolean;
}

export const ComboBoxList: React.FunctionComponent<ComboBoxListProps> = ({
  children,
  autoHide = true,
  ...other
}) => {
  const context = React.useContext(ComboBoxContext);
  const theme = useTheme();

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const {
    inputSize,
    expanded,
    listId,
    handleBlur,
    listRef,
    position,
    options
  } = context;

  React.useLayoutEffect(() => {
    options.current = [];
    return () => {
      options.current = [];
    };
  });

  return (
    <React.Fragment>
      {(expanded || !autoHide) && (
        <Layer
          tabIndex={-1}
          elevation="sm"
          key="1"
          style={position.popover.style}
          data-placement={position.popover.placement}
          id={listId}
          role="listbox"
          onBlur={handleBlur}
          className="ComboBoxList"
          css={{
            overflow: "hidden",
            borderRadius: theme.radii.sm,
            outline: "none",
            width:
              inputSize.width +
              inputSize.left +
              (inputSize.right - inputSize.width) +
              "px",
            margin: 0,
            padding: 0
          }}
          {...safeBind(
            {
              ref: listRef
            },
            {
              ref: position.popover.ref
            },
            other
          )}
        >
          {children}
          <div ref={position.arrow.ref} style={position.arrow.style} />
        </Layer>
      )}
    </React.Fragment>
  );
};

/**
 * Individual combo box options
 */

export interface ComboBoxOptionProps
  extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
}

export const ComboBoxOption: React.FunctionComponent<ComboBoxOptionProps> = ({
  value,
  children,
  ...other
}) => {
  const context = React.useContext(ComboBoxContext);
  const theme = useTheme();

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { makeHash, handleOptionSelect, options, selected } = context;

  React.useEffect(() => {
    if (options.current) {
      options.current.push(value);
    }
  });

  const isSelected = selected === value;

  const onClick = React.useCallback(() => {
    handleOptionSelect(value);
  }, [value]);

  return (
    <Touchable
      tabIndex={-1}
      id={makeHash(value)}
      role="option"
      component="li"
      onPress={onClick}
      aria-selected={isSelected ? "true" : "false"}
      css={{
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        display: "block",
        listStyleType: "none",
        margin: 0,
        padding: `0.5rem 0.75rem`,
        cursor: "pointer",
        background: isSelected ? theme.colors.background.tint1 : "none",
        "&.Touchable--hover": {
          background: theme.colors.background.tint1
        },
        "&.Touchable--active": {
          background: theme.colors.background.tint2
        }
      }}
      {...other}
    >
      {children || <ComboBoxOptionText value={value} />}
    </Touchable>
  );
};

/**
 * ComboBox Item text with highlighting
 */

export interface ComboBoxOptionTextProps {
  value: string;
}

export const ComboBoxOptionText: React.FunctionComponent<
  ComboBoxOptionTextProps
> = ({ value, ...other }) => {
  const context = React.useContext(ComboBoxContext);
  const theme = useTheme();

  if (!context) {
    throw new Error("ComboBoxInput must be wrapped in a ComboBox component");
  }

  const { query } = context;

  return (
    <Text
      className="ComboBoxOptionText"
      css={{ fontWeight: theme.fontWeights.heading }}
      {...other}
    >
      <Highlighter
        highlightStyle={{
          color: theme.colors.text.selected,
          background: "transparent"
        }}
        className="ComboBoxOptionText__Highlighter"
        searchWords={[query]}
        autoEscape={true}
        textToHighlight={value}
      />
    </Text>
  );
};
