<script>
import {useGoTo} from "vuetify";
import {useAppStore} from "@/stores/app";
import {mapActions, mapState} from "pinia";

export default {
  name: "WelcomeBanner",
  setup() {
    const goTo = useGoTo()
    return {
      goTo,
    }
  },
  computed: {
    ...mapState(useAppStore, ['showWelcomeBanner', 'startWelcomeTransition']),
    ...mapState(useAppStore, ['commitsDrawer']),
  },
  methods: {
    ...mapActions(useAppStore, ['onShowFab', 'welcomeBannerLoadstart', 'welcomeBannerLoadend']),
    ...mapActions(useAppStore, ['showCommitsDrawer','onShowCommitsDrawer']),
  },
}
</script>

<template>
  <v-parallax
    class="h-screen"
    v-intersect="onShowFab"
  >
    <transition name="public-fade">
      <v-img
        v-show="showWelcomeBanner"
        :onLoadstart="welcomeBannerLoadstart"
        :onLoad="welcomeBannerLoadend"
        class="banner-transition"
        src="@/assets/banner-1.jpg"
        width="100%"
        height="100vh"
        cover
      >
        <div class="d-flex flex-column fill-height justify-space-around align-center text-white font-weight-bold">
          <div class="text-h2 text-md-h1 font-weight-thin mb-4">
            <div class="d-flex gc-3">
              <transition name="banner-title-right-in">
                <div v-if="startWelcomeTransition">
                  Shadow
                </div>
              </transition>
              <transition name="banner-title-left-in">
                <div
                  v-if="startWelcomeTransition"
                  class=" text-md-end font-weight-bold text-decoration-overline"
                >Blog
                </div>
              </transition>
            </div>
            <transition name="banner-decr-bounce">
              <p
                v-if="startWelcomeTransition"
                class="text-body-1 text-end pt-5">
                <v-badge
                  color="red"
                  :content="commitsDrawer.badgeContent"
                  floating
                >
                  <span
                    class="text-subtitle-1 text-capitalize cursor-pointer"
                    @click="showCommitsDrawer"
                    v-tooltip="{text:'查看更新日志',location:'left'}"
                  >
                  💦 beta v0.0.1
                </span>
                </v-badge>
              </p>
            </transition>
            <transition name="public-fade">
              <h2
                v-if="startWelcomeTransition"
                class="pt-10 text-subtitle-1 font-weight-bold"
              >
                😎思想有多远，😁宇宙就有多大
              </h2>
            </transition>
          </div>
          <transition name="banner-decr-bottom-bounce">
            <div v-if="startWelcomeTransition">
              <h3>
                遇见你时，可否如影随形...
              </h3>
              <div
                class="banner-arrow pt-10"
                @click="goTo('#goto-target-container',{duration:2000,offset: -10})">
                <v-icon icon="mdi-arrow-down"/>
              </div>
            </div>
          </transition>
        </div>
      </v-img>
    </transition>
  </v-parallax>
</template>

<style scoped lang="css">

.banner-transition {
  transition: all 1s;
}

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

/*
  enter-from-class
  enter-active-class
  enter-to-class
  leave-from-class
  leave-active-class
  leave-to-class

  banner-title-left-in
  banner-title-right-in


*/

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/

.banner-title-left-in-enter-active {
  animation: left-in .2s ease-in;
}

@keyframes left-in {
  from {
    transform: translateX(200px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

.banner-title-right-in-enter-active {
  animation: right-in .6s ease-in;
}

@keyframes right-in {
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

.banner-decr-bottom-bounce-enter-active {
  animation: bottom-bounce-in .5s;
}

@keyframes bottom-bounce-in {
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.banner-decr-bounce-enter-active {
  animation: bounce-in 0.5s;
  animation-delay: .5s;
}

.banner-decr-bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
