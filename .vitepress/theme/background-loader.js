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
  const getImageSrc = () => {
    const width = window.innerWidth;
    if (width >= 1280) {
      return '/blog/bg-optimized.jpg';
    } else if (width >= 768) {
      return '/blog/bg-medium.jpg';
    } else {
      return '/blog/bg-small.jpg';
    }
  };

  // 延迟加载背景图
  const loadBackground = async () => {
    try {
      // 等待页面内容加载完成后再加载背景图
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });

      // 短暂延迟，确保关键内容先显示
      await new Promise(resolve => setTimeout(resolve, 200));

      // 预加载当前屏幕尺寸对应的背景图
      const imageSrc = getImageSrc();
      await preloadImage(imageSrc);

      // 添加加载完成的类
      const homeElement = document.querySelector('.VPHome');
      if (homeElement) {
        homeElement.classList.add('bg-loaded');
      }

      // 预加载其他尺寸的图片（低优先级）
      setTimeout(() => {
        const allSizes = ['/blog/bg-small.jpg', '/blog/bg-medium.jpg', '/blog/bg-optimized.jpg'];
        allSizes.forEach(src => {
          if (src !== imageSrc) {
            preloadImage(src).catch(() => {}); // 静默失败
          }
        });
      }, 1000);

    } catch (error) {
      console.warn('背景图加载失败:', error);
    }
  };

  // 使用 requestIdleCallback 在浏览器空闲时加载
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadBackground, { timeout: 2000 });
  } else {
    // 降级方案
    setTimeout(loadBackground, 300);
  }

  // 监听窗口大小变化，重新加载合适的图片
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isHomePage()) {
        loadBackground();
      }
    }, 500);
  });
}
