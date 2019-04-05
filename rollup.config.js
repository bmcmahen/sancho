import resolve from "rollup-plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";

const input = "src/index.tsx";

const plugins = [
  resolve(),
  typescript({
    typescript: require("typescript")
  }),
  cleanup(),
  filesize()
];

export default [
  {
    input,
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    output: [
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true
      },
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      }
    ],
    plugins
  }
];
