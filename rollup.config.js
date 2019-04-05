import resolve from "rollup-plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import sourceMaps from "rollup-plugin-sourcemaps";
import pkg from "./package.json";
import commonjs from "rollup-plugin-commonjs";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";

const input = "src/index.ts";

const plugins = [
  resolve(),
  typescript({
    typescript: require("typescript")
  }),
  commonjs(),
  cleanup(),
  sourceMaps(),
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
        format: "es",
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
