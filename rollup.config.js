import resolve from "rollup-plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import commonjs from "rollup-plugin-commonjs";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import json from "rollup-plugin-json";

const input = "cjs/index.js";

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    "../../node_modules/prop-types/index.js": [
      "elementType",
      "bool",
      "func",
      "object",
      "oneOfType",
      "element"
    ]
  }
};

const plugins = [
  resolve(),
  commonjs(commonjsOptions),
  json(),
  cleanup(),
  uglify(),
  filesize()
];

const globals = {
  react: "React",
  "react-doc": "ReactDOM"
};

export default [
  {
    input,
    output: {
      file: "umd/sancho-ui.production.min.js",
      format: "umd",
      name: "Sancho",
      globals
    },
    external: Object.keys(globals),
    plugins
  }
];
