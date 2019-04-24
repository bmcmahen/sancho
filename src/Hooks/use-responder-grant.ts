import * as React from "react";

/**
 * Todo: Provide a sophisticated mechanism which
 * lets us layer and prioritize gestures.
 *
 * E.g., Gesture A, B respond to the same events. We provide
 * a mechanism to resolve which should get priority.
 * - Does A cancel B?
 * - Does B cancel A?
 * - Do they both coexist?
 */

const defaultValue = {
  disabled: false
};

export const ResponderContext = React.createContext(defaultValue);

export function useResponderGrant() {
  return React.useContext(ResponderContext);
}
