import { useState, useEffect } from "react";

let id = 0;
const genId = () => ++id;

/**
 * Generate a unique id for a component.
 * Useful for accessibility controls (htmlFor, describedBy)
 */

export const useUid = (id: string = "") => {
  const [generatedId, setGeneratedId] = useState<string>(id);
  useEffect(() => setGeneratedId(id || genId().toString()), [id]);
  return generatedId;
};
