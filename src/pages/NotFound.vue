<script>
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: "NotFound",
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
  <div>
    访问的页面不存在 ~
  </div>
</template>

<style scoped lang="css">

</style>
