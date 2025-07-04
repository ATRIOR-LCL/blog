// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import Layout from './Layout.vue'
import { initBackgroundLoader } from './background-loader.js'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 初始化背景图加载器
    if (typeof window !== 'undefined') {
      initBackgroundLoader();
      
      // 路由变化时重新检查
      router.onAfterRouteChanged = () => {
        initBackgroundLoader();
      };
    }
  }
}
