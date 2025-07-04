import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_slidebar.mjs";
// import { set_sidebar } from "./utils/auto_slidebar.mjs";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/blog/pp.ico",
      },
    ],
    // 预加载背景图片资源
    [
      "link",
      {
        rel: "prefetch",
        href: "/blog/bg-small.jpg",
        as: "image",
      },
    ],
    [
      "link",
      {
        rel: "prefetch",
        href: "/blog/bg-medium.jpg",
        as: "image",
      },
    ],
    [
      "link",
      {
        rel: "prefetch",
        href: "/blog/bg-optimized.jpg",
        as: "image",
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
        text: "学习笔记",
        items: [
          { text: "党员基础知识", link: "/party/basic/" },
          { text: "操作系统", link: "/os/" },
          { text: "Git 规范", link: "/git/" },
        ],
      },
      {
        text: "About Me",
        items: [
          { text: "关于本博客", link: "/about/关于本博客" },
          { text: "我的爱好", link: "/about/我的爱好" },
          { text: "学习历程", link: "/about/学习历程" },
        ],
      },
      {
        text: "项目合集",
        items: [
          { text: "CodeForces 选手/比赛 信息爬虫", link: "/" },
          { text: "SDUTOJ 2024 年度报告", link: "/" },
          { text: "SDUT 新生导游程序", link: "/" },
          { text: "OJ3 压力测试脚本", link: "/project/OJ3StressTesting/" },
          { text: "蔚蓝系列赛Round2.5：崩铁主题赛", link: "/" },
          { text: "SDUTACM首页 2.0", link: "/" },
        ],
      },
      {
        text: "前端",
        items: [
          { text: "react", link: "/frontend/react/" },
          { text: "vue", link: "/frontend/vue/" },
          { text: "事件循环", link: "/frontend/eventloop/" },
          { text: "ES6", link: "/frontend/es6/" },
          { text: "TailwindCSS", link: "/frontend/tailwindcss/" },
        ],
      },
      {
        text: "后端",
        items: [
          { text: "node", link: "/backend/node/" },
          { text: "SQL", link: "/backend/sql/" },
          { text: "Nest", link: "/backend/nest/" },
        ],
      },
      {
        text: "算法",
        items: [],
      },
      {
        text: "网络",
        items: [{ text: "HTTP协议", link: "/network/http/" },
        { text: "TCP/IP协议", link: "/network/tcpip/" }
        ],
      },
    ],
    sidebar: {
      "/frontend/vue/": [
        {
          text: "Vue",
          link: "/frontend/vue/",
        }
      ],
      "/frontend/react/": [
        {
          text: "React",
          link: "/frontend/react/",
          items: [
            { text: "JSX", link: "/frontend/react/C1/" },
            { text: "虚拟DOM", link: "/frontend/react/C2/" },
          ],
        }
      ],
      "/frontend/eventloop/": [
        {
          text: "事件循环",
          link: "/frontend/eventloop/",
          items: [
            { text: "引言", link: "/frontend/eventloop/" },
            { text: "JS 异步", link: "/frontend/eventloop/何为异步.md" },
            { text: "简述事件循环", link: "/frontend/eventloop/简述事件循环.md" },
            { text: "JS 计时器能够精确运行", link: "/frontend/eventloop/JS 计时器能够精确运行.md" },
          ],
        }
      ],
      "/frontend/es6/": [
        {
          text: "ES6",
          link: "/frontend/es6/",
          items: [
            { text: "引言", link: "/frontend/es6/" },
            { text: "基本语法", link: "/frontend/es6/C1/" },
          ],
        }
      ],
      "/backend/sql/": [
        {
          text: "SQL",
          link: "/backend/sql/",
          items: [
            { text: "引言", link: "/backend/sql/" },
            { text: "基本概念", link: "/backend/sql/M0基本概念.md" },
            { text: "基本语法", link: "/backend/sql/M1基本语法.md" },
            { text: "分组查询", link: "/backend/sql/M2分组查询.md" },
            { text: "排序查询", link: "/backend/sql/M3排序查询.md" },
            { text: "分页查询", link: "/backend/sql/M4分页查询.md" },
            { text: "约束", link: "/backend/sql/M5约束.md" },
          ],
        }
      ],
      "/backend/node/": [
        {
          text: "NodeJS",
          link: "/backend/node/",
        }
      ],
      "/network/": [
        {
          text: "计算机网络",
          link: "/network/",
          items: [
            { text: "HTTP协议", link: "/network/http/" },
            { text: "TCP/IP协议", link: "/network/tcpip/" },
          ]
        }
      ],
      "/party/": [
        {
          text: "学习笔记",
          items: [
            { text: "引言", link: "/party/", },
            {
              text: "党员基础知识",
              link: "/party/basic/",
              items: [
                { text: "基本概念", link: "/party/basic/M0基本概念" },
                { text: "党员", link: "/party/basic/M1党员" },
                { text: "党建", link: "/party/basic/M2党建" },
                { text: "入党", link: "/party/basic/M3入党" },
              ],
            },
          ],
        },
      ],
      "/project/": [
        {
          text: "项目合集",
          link: "/project/",
          items: [
            { text: 'OJ3 压力测试脚本', link: '/project/OJ3StressTesting/' },
          ]
        }
      ],
      "/os/": [
        {
          text: "引言",
          link: "/os/",
          items: [
            { text: "第一章", link: "/os/C1/" },
            { text: "第二章", link: "/os/C2/" },
            { text: "第三章", link: "/os/C3/" },
            { text: "第四章", link: "/os/C4/" },
            { text: "第五章", link: "/os/C5/" },
            { text: "第六章", link: "/os/C6/" },
            { text: "基础算法", link: "/os/C7/" },
            { text: "课程设计", link: "/os/C8/" },
          ],
        },
      ],
      "/about/": [
        {
          text: "About Me",
          link: "/about/",
          items: [
            { text: "关于本博客", link: "/about/C1/" },
            { text: "我的爱好", link: "/about/C2/" },
            { text: "学习历程", link: "/about/C3/" },
          ],
        },
      ],
      "/backend/nest/": [
        {
          test: "Nest",
          link: "/backend/nest/",
          items: [
            { text: "前置知识", link: "/backend/nest/C1/" },
            { text: "Nest 脚手架(CLI)", link: "/backend/nest/C2/" },
            { text: "Nest 控制器(Controller)", link: "/backend/nest/C3/" },
            { text: "Nest Session 案例", link: "/backend/nest/C4/" },
            { text: "Nest Providers", link: "/backend/nest/C5/" },
            { text: "Nest Module", link: "/backend/nest/C6/" },
            { text: "Nest Middleware", link: "/backend/nest/C7/" },
            { text: "Nest 文件上传 与 静态目录", link: "/backend/nest/C8/" },
            { text: "Nest 文件下载 与 文件流", link: "/backend/nest/C9/" },
            { text: "Rxjx", link: "/backend/nest/C10/" },
            { text: "Nest 拦截器", link: "/backend/nest/C11/" },
            { text: "Nest 管道", link: "/backend/nest/C12/" },
            { text: "Nest 守卫", link: "/backend/nest/C13/" },
          ]
        }
      ],
      "/fontend/tailwindcss/": [
        {
          text: "TailwindCSS",
          link: "/frontend/tailwindcss/",
          items: [
            { text: "引言", link: "/frontend/tailwindcss/" },
            { text: "基本语法", link: "/frontend/tailwindcss/C1/" },
            { text: "配置文件", link: "/frontend/tailwindcss/C2/" },
            { text: "响应式设计", link: "/frontend/tailwindcss/C3/" },
            { text: "自定义样式", link: "/frontend/tailwindcss/C4/" },
          ],
        }
      ],
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
