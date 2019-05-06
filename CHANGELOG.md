## 3.0.0

#### Breaking changes

- Replace TabContent and ReactSwipeableView with our own `GestureView` component. Because GestureView uses the pan-responder-hook it works better with our other gestures.
- `DarkMode` and `LightMode` now forward refs and props. Unfortunately, this requires that both components only accept a single child which results in a breaking change.
