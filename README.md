<div align="center">
  <a href="https://sancho-ui.com/">
    <img alt="sancho logo"
    alt="Sancho is a responsive and accessible design system built with React, Typescript and Emotion. Named after the ever-faithful, hilariously acerbic sidekick of Don Quixote, Sancho is designed to help you no matter how quixotic your dreams may be."
     src="https://raw.githubusercontent.com/bmcmahen/sancho/theme/branding.jpg">
  </a>
</div>

## Getting started

Install Sancho and Emotion using Yarn or NPM:

```
yarn add sancho @emotion/core @emotion/css
```

And import your desired components into your React project. If you're using [Create React App](https://github.com/facebook/create-react-app) or a build process that supports tree shaking, only the imported components will end up in your final build.

```jsx
import { Button } from "sancho";

function MyApp() {
  return <Button>Hello world</Button>;
}
```

[View the documentation](https://sancho-ui.com) for full usage details including a complete component list.

### Development

```
yarn run storybook
```

### Build

```
yarn run build
```

### License

MIT
