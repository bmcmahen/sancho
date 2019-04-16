<div align="center">
  <a href="https://sancho-ui.com/">
    <img alt="sancho logo"
    max-width="600px"
    alt="Sancho is a responsive and accessible design system built with React, Typescript and Emotion. Named after the ever-faithful, hilariously acerbic sidekick of Don Quixote, Sancho is designed to help you no matter how quixotic your dreams may be."
     src="https://raw.githubusercontent.com/bmcmahen/sancho/readme/branding.jpg">
  </a>
</div>

<div align="center">
  
[![npm package](https://img.shields.io/npm/v/sancho/latest.svg)](https://www.npmjs.com/package/sancho)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Sancho%20is%20a%20responsive%20and%20accessible%20design%20system%20built%20with%20React%2C%20Typescript%20and%20Emotion&url=https://sancho-ui.com&hashtags=react,design,javascript)
[![Follow on Twitter](https://img.shields.io/twitter/follow/benmcmahen.svg?style=social&logo=twitter)](
https://twitter.com/intent/follow?screen_name=benmcmahen
)

</div>

## Features

- Beautiful, generic components that you can make your own.
- Responsive and accessible.
- A fully customizable theme, which includes a dark and light mode.
- Fully typed for use with Typescript.
- Support for tree shaking. Bundle only those components that you need.

[View the documentation](https://sancho-ui.com) for full details.

## Getting started

Install Sancho and Emotion using yarn or npm:

```
yarn add sancho @emotion/core @emotion/css
```

And import your desired components into your React project.

```jsx
import { Button } from "sancho";

function MyApp() {
  return <Button>Hello world</Button>;
}
```

## Sample projects

<div align="center">
 <img alt="Screenshots of Julienne and Captioner"
    max-width="600px"
     src="https://benmcmahen.com/static/a611328a899a4d4863a29b09beec0acc/eae0a/preview.jpg">
  </a>
</div>
<br />

[Julienne](https://github.com/bmcmahen/julienne) (pictured left) is a small application built with Sancho and Firebase which helps you share recipes with family and friends.

[Captioner](https://github.com/bmcmahen/captioner) (pictured right) is an in-browser tool for generating captions for your videos. It's also built with Sancho and Firebase.

## Development

```
git clone https://github.com/bmcmahen/sancho.git
cd sancho
yarn
yarn run storybook
```

## License

MIT
