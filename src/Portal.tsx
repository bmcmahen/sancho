import * as React from "react";
import * as ReactDOM from "react-dom";
import PropTypes from "prop-types";

export interface PortalProps {
  /** The element to be rendered in the portal */
  children: React.ReactNode;
}

let container: Element | null = null;

export const Portal: React.FunctionComponent<PortalProps> = ({ children }) => {
  const [target] = React.useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") {
      return null;
    }

    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }

    const div = document.createElement("div");
    container.appendChild(div);
    return div;
  });

  React.useEffect(() => {
    return () => {
      if (target) {
        container!.removeChild(target);
      }
    };
  }, [target]);

  return target ? ReactDOM.createPortal(children, target) : null;
};

Portal.propTypes = {
  children: PropTypes.node
};
