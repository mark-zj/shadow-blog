<script>
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: "chat",
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
  <div>chat</div>
</template>

<style scoped lang="css">

</style>
