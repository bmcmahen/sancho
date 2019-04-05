import resolve from "rollup-plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

const input = "src/index.tsx";

const plugins = [
  resolve(),
  commonjs(),
  typescript({
    typescript: require("typescript")
  }),
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
