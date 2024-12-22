<script>
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: "friend",
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
  <div>friend</div>
</template>

<style scoped lang="css">

</style>
