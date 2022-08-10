# 自定义指令---监听dom元素宽高尺寸变化

## src/main.js 全局引入指令
``` vue
import '@/directives/resize.js';
```


## 在methods周期函数中调用
``` vue
handleResize({ width, height }) {
  console.log('handleResize', width, height);
}
```


