declare module "*.vue" {
  import type { App } from "@vue/runtime-core";
  const comp: App.components;
  export default comp;
}
