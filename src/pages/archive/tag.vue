<script>
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: "tag",
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
  <div>tag</div>
</template>

<style scoped lang="css">

</style>
