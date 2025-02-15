export function registerDirectives (app) {
  app.directive('longpress',{
    mounted(el,binding,vNode) {
      var pressTimer = null;
      var clear = () => {
        clearTimeout(pressTimer);
      };
      var add = (e) => {
        pressTimer = setTimeout(() => {
          // 触发长按事件
          if (binding.value) {
            binding.value(e);
          }
        }, 500);
      };
      el.addEventListener('touchstart', add);
      el.addEventListener('touchend', clear);
      el.addEventListener('touchcance',clear);

      el.addEventListener('mousedown',add);
      el.addEventListener('mouseup',clear);
      el.addEventListener('mouseout',clear);
    },
  });
}
