// 背景图预加载和优化
export function initBackgroundLoader() {
  // 只在首页执行
  if (typeof window === 'undefined') return;
  
  const isHomePage = () => {
    return window.location.pathname === '/blog/' || 
           window.location.pathname === '/blog/index.html' ||
           document.querySelector('.VPHome');
  };

  if (!isHomePage()) return;

  // 预加载背景图
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // 根据屏幕尺寸选择合适的图片
  const getImageSources = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      return {
        primary: '/blog/bg-medium.jpg',
        highQuality: '/blog/bg-optimized.jpg'
      };
    } else if (width >= 768) {
      return {
        primary: '/blog/bg-small.jpg',
        highQuality: '/blog/bg-medium.jpg'
      };
    } else {
      return {
        primary: '/blog/bg-small.jpg',
        highQuality: '/blog/bg-medium.jpg'
      };
    }
  };

  // 延迟加载背景图
  const loadBackground = async () => {
    try {
      const homeElement = document.querySelector('.VPHome');
      if (!homeElement) return;

      // 等待页面内容加载完成后再加载背景图
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });

      // 短暂延迟，确保关键内容先显示
      await new Promise(resolve => setTimeout(resolve, 300));

      const { primary, highQuality } = getImageSources();

      // 第一阶段：加载并显示主要图片（从模糊到清晰）
      try {
        await preloadImage(primary);
        homeElement.classList.add('bg-loaded');
        
        // 添加一个小延迟让用户看到第一阶段的效果
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.warn('主要背景图加载失败:', error);
      }

      // 第二阶段：加载高质量图片（如果不同的话）
      if (highQuality !== primary) {
        try {
          await preloadImage(highQuality);
          
          // 更新背景图片为高质量版本
          const style = document.createElement('style');
          const width = window.innerWidth;
          let mediaQuery = '';
          
          if (width >= 1280) {
            mediaQuery = '@media (min-width: 1280px)';
          } else if (width >= 768) {
            mediaQuery = '@media (min-width: 768px)';
          }
          
          if (mediaQuery) {
            style.textContent = `
              ${mediaQuery} {
                .VPHome.bg-hq-loaded::before {
                  background-image: url('${highQuality}') !important;
                }
              }
            `;
          } else {
            style.textContent = `
              .VPHome.bg-hq-loaded::before {
                background-image: url('${highQuality}') !important;
              }
            `;
          }
          
          document.head.appendChild(style);
          
          // 短暂延迟后应用高质量效果
          await new Promise(resolve => setTimeout(resolve, 200));
          homeElement.classList.add('bg-hq-loaded');
          
        } catch (error) {
          console.warn('高质量背景图加载失败:', error);
        }
      } else {
        // 如果没有更高质量的版本，直接应用高质量效果
        homeElement.classList.add('bg-hq-loaded');
      }

      // 预加载其他尺寸的图片（低优先级）
      setTimeout(() => {
        const allSizes = ['/blog/bg-small.jpg', '/blog/bg-medium.jpg', '/blog/bg-optimized.jpg'];
        allSizes.forEach(src => {
          if (src !== primary && src !== highQuality) {
            preloadImage(src).catch(() => {}); // 静默失败
          }
        });
      }, 2000);

    } catch (error) {
      console.warn('背景图加载过程出错:', error);
    }
  };

  // 使用 requestIdleCallback 在浏览器空闲时加载
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadBackground, { timeout: 3000 });
  } else {
    // 降级方案
    setTimeout(loadBackground, 500);
  }

  // 监听窗口大小变化，重新加载合适的图片
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const homeElement = document.querySelector('.VPHome');
      if (homeElement && isHomePage()) {
        // 重置状态
        homeElement.classList.remove('bg-loaded', 'bg-hq-loaded');
        // 重新加载
        setTimeout(loadBackground, 100);
      }
    }, 800);
  });
}
