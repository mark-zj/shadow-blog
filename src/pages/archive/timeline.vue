<script>
import {mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";

export default {
  name: "timeline",
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
  <div>timeline</div>
</template>

<style scoped lang="css">

</style>
