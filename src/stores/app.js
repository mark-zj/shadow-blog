// Utilities
import {defineStore} from 'pinia'
import api from '@/api/index'

export const useAppStore = defineStore('app', {
  state: () => ({
    appLaunchOverlay: false,
    showBanner: false,
    startTransition: false,

    showFab: false,
    showCommitsDrawer: false,
    commitsLoading: false,
    shadowBlogCommits: [],
  }),
  actions: {
    async launch()  {
      console.log('App Starting...')
      // 打开遮罩
      this.appLaunchOverlay = true;
      // 显示bannerDOM
      this.showBanner = true;
      // 根据API获取必要数据
      console.log('App Started ~')
    },
    onShowFab(isIntersecting, entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.showFab = !isIntersecting;
    },
    onShowCommitsDrawer() {
      this.showCommitsDrawer = !this.showCommitsDrawer;
    },
    _getShadowBlogCommits(isIntersecting, entries, observer) {
      if (this.showCommitsDrawer || isIntersecting) {
        this.commitsLoading = true;
        api.App.getShadowBlogCommits()
          .then(data => {
            this.shadowBlogCommits = data;
            this.commitsLoading = false;
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
})
