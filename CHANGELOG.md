## 3.2.0

- Added `Skeleton`, `AlertDialog`, and `useInfiniteScroll` hook.
- Start using `useCallback` in more places to ensure better performance.

## 3.1.1

- Update react-spring, react-gesture-view, toasted-notes

## 3.1.0

- Upgrade react-gesture-view and react-gesture-responder. This enables users to disable gestures for GestureView.
- Fix disabled form states
- Improve input error appearances

## 3.0.0

#### Breaking changes

- Replace TabContent and ReactSwipeableView with our own `GestureView` component. Because GestureView uses the pan-responder-hook it works better with our other gestures.
- `DarkMode` and `LightMode` now forward refs and props. Unfortunately, this requires that both components only accept a single child which results in a breaking change.
