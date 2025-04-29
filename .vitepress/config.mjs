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
            text: "关于本博客",
            link: "/about/关于本博客",
          },
          {
            text: "我的爱好",
            link: "/about/我的爱好",
          },
          {
            text: "学习历程",
            link: "/about/学习历程",
          },
        ],
      },
      {
        text: "项目合集",
        items: [
          { text: "CodeForces 选手/比赛 信息爬虫", link: "/" },
          { text: "SDUTOJ 2024 年度报告", link: "/" },
          { text: "SDUT 新生导游程序", link: "/" },
          { text: "蔚蓝系列赛Round2.5：崩铁主题赛", link: "/" },
          { text: "SDUTACM首页 2.0", link: "/" },
        ],
      },
      {
        text: "前端",
        items: [
          { text: "vue", link: "/frontend/vue/" },
          { text: "react", link: "/frontend/react/" },
          { text: "事件循环", link: "/frontend/eventloop/" },
          { text: "ES6", link: "/frontend/es6/" },
        ],
      },
      {
        text: "后端",
        items: [
          { text: "node", link: "/backend/node/" },
          { text: "python", link: "/backend/python/" },
          { text: "SQL", link: "/backend/sql/" },
        ],
      },
      {
        text: "算法",
        items: [],
      },
      {
        text:'网络',
        items:[
          {text: 'HTTP协议', link: '/network/http'},
        ]
      }
    ],
    sidebar: {
      "/frontend/vue/": set_sidebar("/frontend/vue"),
      "/frontend/react/": set_sidebar("/frontend/react"),
      "/frontend/eventloop/": set_sidebar("/frontend/eventloop"),
      "/frontend/es6": set_sidebar("/frontend/es6"),
      "/backend/sql/": set_sidebar("/backend/sql"),
      "/backend/node/": set_sidebar("/backend/node"),
      "/backend/python/": set_sidebar("/backend/python"),
      "/network/http/": set_sidebar("/network/http"),
      // "/about/": set_sidebar("/about"),
      '/about/':[
        {
          text: 'About Me',
          items:[
            {
              text: '关于我',
              link: '/about/about-me'
            },
            {
              text: ''
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/ATRIOR-LCL" }],
    footer: {
      copyright: "Copyright © 2025-present ATRIOR'S Magic Blog ❤️",
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
