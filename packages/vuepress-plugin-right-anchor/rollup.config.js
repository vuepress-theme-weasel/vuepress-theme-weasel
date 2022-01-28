import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", { external: ["@vuepress/utils"] }),
  ...rollupTypescript("client/components/index", {
    external: ["vue", /\.css$/],
    dtsExternal: [/\.css$/],
    copy: [["client/styles", "client"]]
  }),
];
