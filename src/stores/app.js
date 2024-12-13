// Utilities
import {defineStore} from 'pinia'
import api from '@/api/index'

export const useAppStore = defineStore('app', {
  state: () => ({
    showFab: false,
    showCommitsDrawer: true,
    commitsLoading: false,
    shadowBlogCommits: [],
  }),
  actions: {
    onShowFab(isIntersecting, entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.showFab = !isIntersecting;
    },
    onShowCommitsDrawer() {
      this.showCommitsDrawer = !this.showCommitsDrawer;
    },
    _getShadowBlogCommits(isIntersecting, entries, observer) {
      if (this.showCommitsDrawer) {
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
