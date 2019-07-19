import Popper from "popper.js";
import React from "react";

// @ts-ignore
const popperStyles: CSSStyleDeclaration = {
  position: "absolute",
  top: "0",
  left: "0",
  opacity: "0",
  pointerEvents: "none"
};

function usePopperState(
  placement: Popper.Placement
): [
  {
    placement: Popper.Placement;
    popperStyles: CSSStyleDeclaration;
    arrowStyles?: CSSStyleDeclaration | {};
  },
  (data: Popper.Data) => Popper.Data
] {
  const [currentPopperStyles, setPopperStyles] = React.useState(popperStyles);
  const [currentArrowStyles, setArrowStyles] = React.useState({});
  const [currentPlacement, setPlacement] = React.useState<Popper.Placement>(
    placement
  );

  const setState = React.useCallback((data: Popper.Data) => {
    const { styles, arrowStyles, placement: p } = data;

    setPopperStyles(styles);
    setArrowStyles(arrowStyles);
    setPlacement(p);

    return data;
  }, []);

  const state = {
    placement: currentPlacement,
    popperStyles: currentPopperStyles,
    arrowStyles: currentArrowStyles
  };

  return [state, setState];
}

export default usePopperState;
