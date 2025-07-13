
## 核心功能特性

### 1. 自定义全屏滑动交互体验

项目采用自定义的滑动逻辑实现了类似移动端App的全屏滑动效果，通过动态组件数组和条件渲染实现页面的懒加载和切换。

```vue
<template>
  <!-- 动态页面数组，根据用户数据条件渲染 -->
  <Special id="page2" class="page hide"></Special>
  <XinZeng id="page3" class="page hide"></XinZeng>
  <AC id="page5" class="page hide"></AC>
  <Night id="page6" class="page hide" v-if="hasNight"></Night>
  <Hard id="page7" class="page hide" v-if="hasMaxTries"></Hard>
  <BiSai id="page8" class="page hide" v-if="hascontest"></BiSai>
  <!-- 更多页面... -->
</template>

<script setup>
// 触摸滑动事件处理
const handleTouch = (event) => {
  if (!can.value) return;
  const touchStart = event.touches[0].clientY;
  let touchEnd;
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50 && currentPage < totalPages - 1) {
      // 页面切换动画
      pages[currentPage].classList.add("fontremove");
      setTimeout(() => {
        pages[currentPage].classList.add("hide");
        currentPage++;
        pages[currentPage].classList.remove("hide");
      }, 1000);
      can.value = false;
      isnext.value = false;
    }
  };
};

// 鼠标滚轮事件处理
const mouseScroll = (event) => {
  if (isScoll.value == false) return;
  if (event.deltaY > 0) {
    pages[currentPage].classList.add("fontremove");
    setTimeout(() => {
      pages[currentPage].classList.add("hide");
      currentPage++;
      pages[currentPage].classList.remove("hide");
    }, 1000);
    isnext.value = false;
    isScoll.value = false;
  }
};
</script>
```

**功能特点：**
- 自定义触摸和滚轮事件处理，实现流畅的页面切换
- 基于用户数据的动态页面渲染和懒加载机制
- 条件组件渲染，根据用户行为数据决定页面显示
- 精确的动画时序控制和状态管理
- 完美适配移动端触摸和桌面端滚轮操作

### 2. 个性化数据可视化

系统能够根据用户在OJ平台的具体表现，生成个性化的数据分析和可视化展示。

```vue
<!-- AC题数统计展示 -->
<template>
  <div class="ac">
    <div class="gongac">
      你 AC 了 <span>{{ total_ac }}</span> 道题目<span>🥴</span>
    </div>
    <div class="xinac" v-if="isactive">
      其中，<span>{{ new_ac }}</span> 道是今年新 AC 的题目
    </div>
    <div class="sts" v-if="isactive">
      你的刷题数<span>{{ ss }}</span>超过了 OJ <span>{{ over }}%</span>的用户
    </div>
  </div>
</template>

<script setup>
// 数据处理逻辑
let total_ac = liuyang.value.accepted;
let new_ac = liuyang.value.annualNewAccepted;
let over = Math.floor(100 * (1 - liuyang.value.annualNewAcceptedTopPercent));
</script>
```

**数据维度包括：**
- AC题目总数和年度新增
- 用户在平台中的排名百分比
- 比赛参与情况和获奖记录
- 学习时间分布和活跃度分析
- 个性化标签系统（如"夜猫子"、"刷题王"等）

### 3. 智能标签生成系统

基于用户行为数据，系统能够自动生成个性化的年度标签，增强用户的个人认同感。

```javascript
// 智能标签生成逻辑
const tags = ref([]);

if (liuyang.value.annualNewAccepted >= 100) {
  tags.value.push("刷题王");
}
if (liuyang.value.nightWalker) {
  tags.value.push("夜猫子");
}
if (liuyang.value.competition.attendedCompetitionCount > 0) {
  tags.value.push("比赛达人");
}
```

**标签特色：**
- 基于真实数据的智能分析
- 富有趣味性的标签命名
- 多维度行为模式识别
- 动态标签展示效果

### 4. 音频体验增强

集成Howler.js音频库，为用户提供沉浸式的音频体验。

```javascript
// 全局音频控制
import { Howl } from "howler";

export const musicPlay = ref(false);
export const bgmMuted = ref(false);

export const playBGM = () => {
  window.bgm && !bgmPlaying.value && window.bgm.play();
  bgmPlaying.value = true;
};

export const switchMuteBGM = () => {
  if (!window.bgm) return;
  musicPlay.value = !musicPlay.value;
  bgmMuted.value = !bgmMuted.value;
  window.bgm.mute(bgmMuted.value);
};

// 音频初始化
onMounted(() => {
  !window.bgm && (window.bgm = new Howl({
    src: [`${new URL("../assets/audio/bgm.mp3", import.meta.url).href}`],
    html5: true,
    volume: 0.66,
    loop: true,
  }));
});
```

**音频功能：**
- 背景音乐自动播放
- 用户可控的音频开关
- 跨浏览器兼容性保证
- 页面切换音效支持

### 5. 社交分享功能

支持将年度报告生成为图片分享，并集成二维码功能便于传播。

```javascript
// 页面截图生成
import html2canvas from "html2canvas";
import QRCode from "qrcode";

const downloadAsImage = async () => {
  if (sumarry.value) {
    try {
      // 生成二维码
      const qrCodeDataUrl = await generateQRCode(
        "https://acm.sdut.edu.cn/onlinejudge3/annual-report-2024"
      );
      
      // 页面截图
      html2canvas(sumarry.value, {
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const ctx = canvas.getContext("2d");
        
        // 在截图上添加二维码水印
        const img = new Image();
        img.src = qrCodeDataUrl;
        img.onload = () => {
          ctx.drawImage(img, canvas.width - 120, canvas.height - 120, 100, 100);
          
          // 生成下载链接
          const imageUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = "2024年度报告.png";
          link.click();
        };
      });
    } catch (error) {
      console.error("生成图片失败", error);
    }
  }
};
```

**分享特性：**
- 高质量图片生成
- 自动添加二维码水印
- 一键下载分享图片
- 移动端分享优化

### 6. 动画效果系统

使用Intersection Observer API和CSS3动画实现丰富的视觉效果。

```javascript
// 动画触发控制
onMounted(() => {
  const txtanim = new IntersectionObserver((lists) => {
    lists.forEach((list) => {
      if (list.isIntersecting) {
        setTimeout(() => {
          can.value = true;
          isnext.value = true;
          isScoll.value = true;
        }, 2500);
        list.target.classList.add("active");
      } else {
        list.target.classList.remove("active");
      }
    });
  });
  
  const txt = document.querySelector(".actest");
  txtanim.observe(txt);
});
```

**动画特色：**
- 进入视窗自动触发动画
- 流畅的过渡效果
- 时序控制的连续动画
- 响应式动画适配

### 7. 数据安全与认证

采用Session机制和CSRF防护，确保用户数据安全。

```javascript
// API请求封装
import Cookies from 'js-cookie';
import Axios from 'axios';

const req = Axios.create({
  baseURL: '/onlinejudge3/api',
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 请求拦截器 - 添加CSRF Token
req.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers['x-csrf-token'] = Cookies.get('csrfToken') || '';
  }
  return config;
}, (error) => {
  throw error;
});

// 响应拦截器 - 统一错误处理
req.interceptors.response.use((response) => {
  if (!response.data.success) {
    const e = new Error(`API Error: ${response.data.msg}`);
    e.code = response.data.code;
    e.msg = response.data.msg;
    throw e;
  }
  return response.data.data;
});
```

**安全特性：**
- Session状态管理
- CSRF攻击防护
- 用户权限验证
- 数据隐私保护

## 技术架构

### 前端架构设计

```
src/
├── main.js              # 应用入口文件
├── App.vue              # 根组件
├── assets/              # 静态资源
│   ├── global.js        # 全局状态管理
│   ├── *.css           # 样式文件
│   ├── img/            # 图片资源
│   └── audio/          # 音频文件
├── components/          # 业务组件
│   ├── AC.vue          # AC统计页面
│   ├── Last.vue        # 总结页面
│   ├── Night.vue       # 夜猫子分析
│   └── ...             # 其他专题组件
├── configs/            # 配置文件
│   └── achivement-config.js  # 成就系统配置
├── router/             # 路由配置
├── utils/              # 工具函数
│   └── req.js          # API请求封装
└── views/              # 页面视图
    ├── Login.vue       # 登录页
    ├── Main.vue        # 主页
    ├── Message.vue     # 消息页
    └── Start.vue       # 启动页
```

### 状态管理

采用Vue3 Composition API进行全局状态管理：

```javascript
// 全局状态定义
export const can = ref(false);           // 动画控制
export const isnext = ref(false);        // 页面切换控制
export const gogo = ref(true);           // 流程控制
export const userid = ref(null);         // 用户ID
export const liuyang = ref(null);        // 用户数据
export const global = ref(null);         // 全局数据
export const musicPlay = ref(false);     // 音乐播放状态
```

## 项目特色与创新

### 用户体验创新
- **沉浸式体验**：全屏滑动 + 背景音乐 + 动画效果的完美结合
- **情感化设计**：通过个性化标签和趣味性文案增强用户情感连接
- **社交传播**：一键生成分享图片，便于社交媒体传播

### 技术创新
- **组件化架构**：19个专题组件，清晰的功能模块划分
- **响应式设计**：完美适配移动端和桌面端
- **性能优化**：懒加载、按需加载等优化策略

### 数据驱动
- **多维度分析**：从刷题、比赛、时间等多个维度分析用户行为
- **智能算法**：基于用户行为模式的个性化标签生成
- **可视化展示**：将复杂数据转化为直观的视觉呈现