import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_slidebar.mjs";
// import { set_sidebar } from "./utils/auto_slidebar.mjs";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/pp.ico",
      },
    ],
  ],
  title: "ATRIOR's Magic Blog!!!",
  description: "A VitePress Site",

  themeConfig: {
    outlineTitle: "文章目录",
    outline: [2, 6],
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "About Me",
        items: [
          {
            text: "Home",
            link: "/",
          },
          {
            text: "markdown",
            link: "/markdown-examples",
          },
        ],
      },
      {
        text: "项目合集",
        items: [
          { text: "SDUTOJ 2024 年度报告", link: "/" },
          { text: "SDUT 新生导游程序", link: "/" },
          { text: "蔚蓝系列赛Round2.5：崩铁主题赛", link: "/" },
        ],
      },
      { text: "前端", link: "/frontend/react/" },
      { text: "后端", link: "/backend/python/" },
    ],

    sidebar: {
      "/frontend/react/": set_sidebar("/frontend/react"),
      "/backend/python/": set_sidebar("/backend/python"),
    },

    socialLinks: [{ icon: "github", link: "https://github.com/ATRIOR-LCL" }],
    footer: {
      copyright: "Copyright © 2023-present ATRIOR'S Magic Blog",
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "去码头整点薯条？",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
});
