// Utilities
import {defineStore} from 'pinia'

import api from '@/api/index'

export const useAppStore = defineStore('app', {
  actions: {
    welcomeBannerLoadstart(value) {
      console.log('welcomeBanner开始加载...')
      this.startWelcomeTransition = false;
    },
    // 这个函数会被调用两次，第二次是再次渲染
    welcomeBannerLoadend(value) {
      console.log('welcomeBanner加载结束 ~')
      this.startWelcomeTransition = true;
      this.appLaunchOverlay = false;
    },
    onShowFab(isIntersecting, entries, observer) {
      this.showFab = !isIntersecting;
    },
    showCommitsDrawer() {
      this.commitsDrawer.open = !this.commitsDrawer.open;
      localStorage.setItem('lookCommitsDrawer', true);
      this.commitsDrawer.badgeContent = 0;
    },
    onShowCommitsDrawer() {
      const obj = this.commitsDrawer;
      obj.loading = true;
      this.loadShadowBlogCommits().then(data => {
        obj.loading = false;
        obj.commits = data;
      }).catch(() => {
        obj.loading = false;
      })
    },
    loadShadowBlogCommits() {
      return api.App.getShadowBlogCommits().then(data => {
        console.log('开始获取项目代码提交信息...');
        console.log(data);
        const obj = this.commitsDrawer;
        // 利用local storage实现
        // 1. 如果查看了drawer就是badgeContent 0
        // 2. 如果查看了但是请求过后有新的数据就要减去差值在badgeContent 中显示
        // 3. 如果查看了但是请求过后没有新的数据就要显示 0 | 有可能变少

        // 4. 如果没有查看直接显示数据长度 | 重新刷新不算
        const look = JSON.parse(localStorage.getItem('lookCommitsDrawer'));
        // 上一次请求不包括初始化
        const preSize = JSON.parse(localStorage.getItem('preCommitsSize'));
        const curSize = data.length;
        let res = 0;
        if (look) {
          res = curSize > preSize ? curSize - preSize : 0;
        } else {
          res = curSize;
        }
        localStorage.setItem('preCommitsSize',curSize);
        obj.badgeContent = res;
        console.log('获取项目代码提交结束 ~');
        return data;
      }).catch(error => {
        console.error('获取项目代码提交信息失败 !');
        console.log(error);
        return error;
      });
    },
    // 获取访客的系统，浏览器名称以及屏幕是否能够触摸和ssr
    async loadVisitorInfo(app) {
      var platform = app.$vuetify.display.platform;
      let field = null;
      let knows = [];
      const that = this;

      function filter_(visitorInfoField) {
        that.visitorInfo.platform[`${visitorInfoField}`] =
          that.visitorInfo.platform[`${visitorInfoField}`].filter(value => knows.includes(value));
      }

      for (field in platform) if (platform[field]) knows.push(field);
      filter_('systems');
      filter_('browsers');
      this.visitorInfo.platform.touch = knows.includes('touch');
      this.visitorInfo.platform.ssr = knows.includes('ssr');
      // console.log(this.visitorInfo);
    },
  },
  state: () => ({
    appLaunchOverlay: false,//app 启动遮罩
    // 离线提示和下线提示
    appSnackBar: {
      open: false,
      text: 'default',
      timeout: 3000,
    },
    startAppBarTransition: false,// 是否开始app bar 过渡
    showWelcomeBanner: false,// 是否显示welcome banner
    startWelcomeTransition: false,// 是否开始welcome banner 过渡

    showFab: false,// 是否显示底部fab

    commitsDrawer: {
      open: false,// 是否显示项目代码提交抽屉
      loading: false,// 是否项目代码提交加载条
      commits: [],// 项目代码提交数据
      // 项目代码提交数据的数量
      badgeContent: 0,
    },
    // 访客信息
    visitorInfo: {
      open: false,
      platform: {
        systems: ['android', 'ios', 'win', 'mac', 'linux',],
        browsers: ['chrome', 'edge', 'firefox', 'opera',],
        touch: false,
        ssr: false,
        // cordova ???
        // electron ???
      },
    },
    // app 导航项
    navItems: [
      {
        icon: 'mdi-home',
        title: '主页',
        path: '/',
      },
      {
        icon: 'mdi-archive',
        title: '归档',
        childNavItems: [
          {
            icon: 'mdi-timeline-text',
            title: '时间轴',
            path: '/archive/timeline',
          },
          {
            icon: 'mdi-tag',
            title: '标签',
            path: '/archive/tag',
          },
          {
            icon: 'mdi-shape',
            title: '分类',
            path: '/archive/shape',
          },
          {
            icon: 'mdi-chat',
            title: '说说',
            path: '/archive/chat',
          },
        ],
      },
      {
        icon: 'mdi-file-cabinet',
        title: '文件',
        childNavItems: [
          {
            icon: 'mdi-image',
            title: '相册',
            path: '/',
          },
          {
            icon: 'mdi-image-multiple',
            title: '壁纸',
            path: '/',
          },
          {
            icon: 'mdi-movie-roll',
            title: '电影',
            path: '/',
          },
        ],
      },
      {
        icon: 'mdi-book-open-page-variant',
        title: '友人帐',
        path: '/friend',
      },
      {
        icon: 'mdi-information-variant-box',
        title: '自言自语',
        path: '/talk'
      },
    ],
  }),
})
