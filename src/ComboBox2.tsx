/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import Downshift from "downshift";

export interface AutoCompleteProps {}

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

export const AutoComplete: React.FunctionComponent<
  AutoCompleteProps
> = props => {
  return (
    <Downshift
      onChange={selection => {
        console.log("selection", selection);
      }}
    >
      {({
        isOpen,
        inputValue,
        getItemProps,
        getInputProps,
        getLabelProps,
        getMenuProps,
        selectedItem,
        highlightedIndex,
        selectItemAtIndex,
        ...other
      }) => (
        <div>
          <label {...getLabelProps()}>This is the label</label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(
                    item => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item.value}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
