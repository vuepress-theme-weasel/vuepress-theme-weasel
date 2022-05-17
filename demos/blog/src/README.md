---
home: true
title: Home
heroImage: /logo.png
heroText: "@mr-huang/vuepress-plugin-blog"
tagline: Add blog support for VuePress2
actions:
  - text: Docs
    link: /

footer: MIT Licensed | Copyright © 2021-present Mr.Huang
---

## How to use

### Install

```bash
pnpm add -D @mr-huang/vuepress-plugin-blog@next
```

### Usage

```ts
// .vuepress/config.ts
import { blogPlugin } from "@mr-huang/vuepress-plugin-blog";

export default {
  plugins: [
    blogPlugin({
      // your options
    }),
  ],
};
```
