/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import {routes} from 'vue-router/auto-routes'

const myRoutes = [
  {
    name: 'NotFound',
    path: '/notfound',
    component: () => import('@/pages/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([...routes, ...myRoutes]),
  scrollBehavior(to, from, savedPosition) {
    // setTimeout(()=>{
    //   let goTo = useGoTo();
    //   goTo("#goto-target-container",{duration:2000 , offset: 10});
    // },500);
    if (savedPosition) return savedPosition;
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      // el: '#goto-target-container',
      // 在元素上 10 像素
      top: 0,
      // behavior: 'smooth',
    }
  },
})

router.beforeEach((to, from, next) => {
  const routeExists = router.getRoutes().some(route => route.name === to.name);
  if(to.name === undefined){
    next({ path: '/notfound' });
  }else{
    if (routeExists) {
      next(); // 如果路由存在，继续正常的导航
    } else {
      next({ path: '/notfound' }); // 如果路由不存在，重定向到 NotFound 路由
    }
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
