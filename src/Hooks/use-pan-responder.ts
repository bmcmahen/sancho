import { noOp } from "../misc/noop";
import * as React from "react";

// https://facebook.github.io/react-native/docs/gesture-responder-system.html

// const bind = usePanResponder({
//   onStartShouldSetCapture: () => true,
//   onStartShouldSet: () => true,
//   onMoveShouldSetCapture: () => true,
//   onMoveShouldSet: () => true,
//   onGrant: highlight,
//   onMove: updatePosition,
//   onTerminationRequest: () => true,
//   onRelease: () => unhighlight(),
//   onTerminate: () => unhighlight(),
// })

interface Options {
  onStartShouldSetCapture?: (state: StateType) => boolean;
  onStartShouldSet?: (state: StateType) => boolean;
  onMoveShouldSetCapture?: (state: StateType) => boolean;
  onMoveShouldSet?: (state: StateType) => boolean;
  onGrant?: (state: StateType) => void;
  onMove?: (state: StateType) => void;
  onTerminationRequest?: (state: StateType) => boolean;
  onRelease?: (state: StateType) => void;
  onTerminate?: (state: StateType) => void;
}

const initialXY = {
  xy: [0, 0],
  velocity: 0,
  vxvy: [0, 0],
  distance: 0,
  direction: [0, 0]
}; // xy coordinates

const initialCommon = {
  event: undefined,
  delta: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  transform: undefined,
  local: [0, 0],
  lastLocal: [0, 0],
  first: true,
  last: false,
  active: true,
  time: undefined,
  temp: undefined,
  cancel: noOp,
  canceled: false,
  args: undefined
};

const initialState = {
  ...initialCommon,
  ...initialXY
};

type StateType = typeof initialState;

interface GrantedTouch {
  id: string | number;
  onTerminationRequest: () => boolean;
  onTerminate: () => void;
}

let grantedTouch: GrantedTouch | null = null;

export function usePanResponder(options: Options = {}, uid?: string) {
  const ref = React.useRef<any>(null);
  const state = React.useRef(initialState);
  const id = React.useRef(uid || Math.random());

  React.useEffect(() => {
    if (!ref.current) {
      throw new Error("Unable to find current ref");
    }

    const el = ref.current!;
    el.addEventListener("touchstart", handleStart);
    el.addEventListener("touchend", handleEnd);
    el.addEventListener("touchmove", handleMove);
    console.log("added event listeners", id.current);
  }, []);

  function claimTouch() {
    if (grantedTouch) {
      grantedTouch.onTerminate();
    }

    grantedTouch = {
      id: id.current,
      onTerminate,
      onTerminationRequest
    };

    state.current = {
      ...state.current,
      last: false,
      first: true
    };

    onGrant();
  }

  function handleGrant() {
    // if a touch is already active we won't register
    console.log("already granted?", grantedTouch);
    if (grantedTouch) {
      return;
    }

    grantedTouch = {
      id: id.current,
      onTerminate,
      onTerminationRequest
    };

    state.current = {
      ...state.current,
      last: false,
      first: true
    };

    onGrant();
  }

  function handleStart(e: Event) {
    if (e.cancelable) {
      e.preventDefault();
    }

    const granted = onStartShouldSet();

    if (granted) {
      handleGrant();
    }

    console.log("initial state", id.current, state.current.active);
  }

  function isGrantedTouch() {
    return grantedTouch && grantedTouch.id === id.current;
  }

  function handleEnd(e: Event) {
    if (!isGrantedTouch()) {
      return;
    }

    // remove touch
    grantedTouch = null;

    state.current = {
      ...state.current,
      last: true,
      first: false
    };

    if (e.cancelable) {
      e.preventDefault();
    }

    onRelease();
  }

  function handleMove(e: Event) {
    console.log("move state", id.current, state, state.current.active);
    if (!isGrantedTouch()) {
      const grant = onMoveShouldSet();
      console.log("should focus?", id.current, grant);
      if (grant) {
        claimTouch();
      } else {
        return;
      }
    }

    onMove();
  }

  function onStartShouldSet() {
    return options.onStartShouldSet
      ? options.onStartShouldSet(state.current)
      : false;
  }

  function onMoveShouldSet() {
    return options.onMoveShouldSet
      ? options.onMoveShouldSet(state.current)
      : false;
  }

  function onGrant() {
    if (options.onGrant) {
      options.onGrant(state.current);
    }
  }

  function onMove() {
    if (options.onMove) {
      options.onMove(state.current);
    }
  }

  function onTerminationRequest() {
    return options.onTerminationRequest
      ? options.onTerminationRequest(state.current)
      : true;
  }

  function onRelease() {
    state.current = {
      ...state.current,
      active: false
    };
    if (options.onRelease) {
      options.onRelease(state.current);
    }
  }

  function onTerminate() {
    console.log("onTerminate", id.current);
    state.current = {
      ...state.current,
      active: false
    };
    if (options.onTerminate) {
      options.onTerminate(state.current);
    }
  }

  return {
    ref
  };
}
