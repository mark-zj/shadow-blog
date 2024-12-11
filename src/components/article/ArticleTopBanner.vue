<script>
import {useAppStore} from "@/stores/app";

export default {
  name: "ArticleTopBanner",
  setup() {
    const appStore = useAppStore();
    return {
      appStore
    }
  },
}
</script>

<template>
  <v-parallax id="goto-target-container" class="elevation-24" v-intersect="appStore.onShowFab" >
    <v-img src="@/assets/banner-3.png"
           width="100%"
           height="35vh"
           cover
    >
      <div class="d-flex flex-column fill-height justify-center align-center text-white font-weight-bold">
        <div class="text-h4">
          开发小贴士
        </div>
        <div class="sub-title text-overline">
          发表于2024-02-04|更新于2024-02-04|教程
          <div>
            字数总计:155|阅读时长:1分钟|阅读量:103
          </div>
        </div>
      </div>
    </v-img>
  </v-parallax>
</template>

<style scoped lang="css">

</style>
