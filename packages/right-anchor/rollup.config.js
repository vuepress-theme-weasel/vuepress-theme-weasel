import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", { external: ["@vuepress/utils"] }),
  ...rollupTypescript("client/components/RightAnchor", {
    external: ["vue", /\.css$/],
    dtsExternal: [/\.css$/],
    copy: [["client/styles", "client"]]
  }),
];
