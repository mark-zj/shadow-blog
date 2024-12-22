<script>
import ArticleDetail from "@/components/article/ArticleDetail.vue";
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: 'Article',
  components: {ArticleDetail},
  mounted() {
    this.appLaunchOverlay = false;
  },
  computed: {
    ...mapWritableState(useAppStore, [
      'appLaunchOverlay',
    ]),
  },
}
</script>

<template>
  <article-detail/>
</template>

<style lang="css" scoped>

</style>
