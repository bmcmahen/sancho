## 3.5.4

- Update `Stack` to better support gestures.

## 3.5.3

- Use a `button` tag when `type=submit` is used on a `Button`.

## 3.5.2

- Fix `useFocusLock` hook to prevent unwanted focusing.

## 3.5.1

- `ComboBox` now accepts an autocomlete prop, and `ComboBoxInput` uses a `BaseInput` by default.

## 3.5.0

- Add `ComboBox`, `usePositioner` and improve `useMeasure`.

## 3.4.0

- Rename `GestureStack` to `Pager`
- use new scroll-lock hook

## 3.3.2

- Update Stack to fix measurement issues

## 3.3.1

- Fix `Stack` dropshadow in dark mode

## 3.3.0

- Added `Stack`
- `ScrollView` now accepts arbitrary props (for things like styling)

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
