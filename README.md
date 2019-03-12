<div align="center">
  <a href="https://sancho.surge.sh/">
    <img aria-hidden="true"  src="https://raw.githubusercontent.com/bmcmahen/sancho/master/docs/src/images/donkey.png" style="width: 60px; height: 60px;">
    <br>
    <br>
    <h1 style="color: #1971c2">Sancho</h1>
  </a>
</div>

Sancho is a design system built with React, Typescript and Emotion. It's designed to be responsive, accessible, and beautiful. It takes its inspiration from [Evergreen](https://evergreen.segment.com/), [Bootstrap](https://getbootstrap.com/), [Material-UI](https://material-ui.com/), and [Reach-UI](https://github.com/reach/reach-ui) for accessibility.

[View the docs](/https://sancho.surge.sh) for full usage details.

## Install

```
yarn add sancho
```

```jsx
import { Button } from "sancho";

function MyApp() {
  return <Button>Hello world</Button>;
}
```

### Development:

```
yarn run storybook
```

### Build:

```
yarn run build
```

### Docs:

Our documentation is built with gatsby.

```
cd docs
yarn run start
```
