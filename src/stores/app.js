// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    showFab: false,
  }),
  actions:{
    onShowFab(isIntersecting, entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.showFab = !isIntersecting;
    },
  }
})
