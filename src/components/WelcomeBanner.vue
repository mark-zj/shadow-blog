<script>
import {useGoTo} from "vuetify";
import {useAppStore} from "@/stores/app";

export default {
  name:"WelcomeBanner",
  setup() {
    const goTo = useGoTo()
    const appStore = useAppStore()
    return {
      goTo, appStore
    }
  }
}
</script>

<template>
  <v-parallax v-intersect="appStore.onShowFab">
    <v-img
      key="banner-1"
      src="@/assets/banner-1.jpg"
      width="100%"
      height="100vh"
      cover
    >
      <div class="d-flex flex-column fill-height justify-space-around align-center text-white font-weight-bold">
        <div class="pt-16 text-h2 text-md-h1 font-weight-thin mb-4">
          Shadow <span class="text-md-end font-weight-bold text-decoration-overline">Blog</span>
          <br/>
          <p class="text-body-1 text-end pt-5">
            <span class="text-subtitle-1 text-capitalize cursor-pointer">💦 beta v0.0.1</span>
          </p>
          <h2 class="pt-10 text-subtitle-1 font-weight-bold">
            😎思想有多远，😁宇宙就有多大
          </h2>
        </div>

        <div>
          <h3>
            遇见你时，可否如影随形...
          </h3>
          <div class="banner-arrow pt-10"
               @click="goTo('#goto-target-container',{duration:2000 , offset: 10})">
            <v-icon icon="mdi-arrow-down"/>
          </div>
        </div>
      </div>
    </v-img>
  </v-parallax>
</template>

<style scoped lang="css">
.banner-arrow {
  text-align: center;
  cursor: pointer;
  animation: loading 2s infinite;
}


@keyframes loading {
  0% {
    opacity: 0.4;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translate(0, -20px);
  }
  100% {
    opacity: 0.4;
    transform: translateY(0);
  }
}
</style>
