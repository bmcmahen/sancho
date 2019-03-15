import * as React from "react";
import uniqueId from "lodash.uniqueid";

/**
 * Generate a unique id for a component.
 * Useful for accessibility controls (htmlFor, describedBy)
 * @param id string
 */

export function useUid(id?: string) {
  const idRef = React.useRef(id || uniqueId());
  return idRef.current;
}
