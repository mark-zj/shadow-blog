<script>
import {useAppStore} from "@/stores/app";
import {version, useGoTo} from "vuetify";

export default {
  name: "VuetifyApp",
  setup() {
    const goTo = useGoTo();
    const appStore = useAppStore()
    return {goTo, version, appStore}
  },
  created() {
    window.addEventListener('DOMContentLoaded',()=>{
      setTimeout(()=> {
        this.dOMContentLoading = false;
      },5000);
    })
  },
  data: () => ({
    dOMContentLoading: true,
    showSearchBox: false,
    showDrawer: false,
    open: ['pigeonhole'],
    items: Array.from({length: 50}, (k, v) => v + 1),
  }),
  methods: {
    load({done}) {
      setTimeout(() => {
        this.items.push(...Array.from({length: 10}, (k, v) => v + this.items.at(-1) + 1))
        done('ok')
      }, 1000)
    },

  },
  destroyed() {
    window.removeEventListener('DOMContentLoaded');
  },
}
</script>

<template>
  <v-app>
    <v-overlay
      :model-value="dOMContentLoading"
      class="align-center justify-center text-center"
      persistent
    >
      <div>
        <v-progress-circular color="#00adb5" indeterminate />
        <span class="pa-5 font-weight-bold text-subtitle-2">正在启动...</span>
      </div>
      <p class="pa-5">你好，陌生人 ~</p>
    </v-overlay>
    <!--    大屏幕导航   -->
    <v-app-bar class="px-5"
               color="#121212cc"
               scroll-behavior="hide"
               :elevation="0">
      <v-app-bar-title v-slot:text>
        <span class="app-bar-title">
          Shadow Blog
        </span>
      </v-app-bar-title>
      <!--       搜索框开始     -->
      <v-dialog v-model="showSearchBox"
                transition="dialog-top-transition"
                opacity=".1"
                class="dialog-bg-color"
                content-class="justify-space-evenly"
                fullscreen
      >
        <v-container max-width="500px" fluid>
          <v-row>
            <v-col cols="12" class="d-flex align-center justify-center">
              <v-text-field variant="solo"
                            min-width="300px"
                            max-width="300px"
                            bg-color="#121212cc"
                            color="#00adb5"
                            density="comfortable"
                            hide-details
                            hide-spin-buttons
              >
                <template v-slot:prepend-inner>
                  <v-icon icon="mdi-file-find"/>
                </template>
                <template v-slot:append-inner>
                  <v-icon icon="mdi-magnify"/>
                </template>
              </v-text-field>
              <v-btn class="ml-5" @click="showSearchBox = !showSearchBox" icon="mdi-close"
                     color="#121212cc"/>
            </v-col>
            <v-col cols="12">
              <!--  结果-->
              <v-sheet class="pa-5" color="#121212cc" border>
                <div class="v-card-title">
                  <v-icon icon="mdi-receipt-clock"/>
                  <span class="font-weight-bold">最近</span>
                </div>
                <v-infinite-scroll border
                                   height="300"
                                   mode="intersect"
                                   @load="load"
                                   color="#00adb5"
                                   empty-text="没有更多了..."
                >
                  <template v-for="(index) in items" :key="index">
                    <div class="v-list-item">
                      Item number {{ index }}
                    </div>
                  </template>
                </v-infinite-scroll>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

      </v-dialog>
      <!--       搜索框结束     -->
      <!--   顶部导航开始   -->
      <template v-slot:append>
        <div class="d-inline-flex">
          <!--     搜索框     -->
          <div class="app-bar-nav-item" @click="showSearchBox = !showSearchBox">
            <v-icon class="app-bar-nav-item-icon" icon="mdi-magnify"/>
            <span class="hidden-sm-and-down app-bar-nav-item-text">搜索</span>
          </div>
          <div class="hidden-md-and-up app-bar-nav-item">
            <v-icon icon="mdi-menu" @click="showDrawer = !showDrawer"/>
          </div>
          <div class="hidden-sm-and-down app-bar-nav-item" @click="this.$router.push({path:'/'})">
            <v-icon class="app-bar-nav-item-icon" icon="mdi-home"/>
            <span class="app-bar-nav-item-text">主页</span>
          </div>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props}">
              <div class="hidden-sm-and-down app-bar-nav-item" v-bind="props">
                <v-icon class="app-bar-nav-item-icon" icon="mdi-zip-box"/>
                <span class="app-bar-nav-item-text">归档</span>
                <v-icon class="pl-1"
                        :icon="props['aria-expanded'] === 'false' ?'mdi-chevron-up':'mdi-chevron-down'"/>
              </div>
            </template>
            <v-list nav slim class="pa-0" bg-color="#1212127f">
              <v-list-item value="1">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-timeline-text"/>
                </template>
                <v-list-item-title>时间轴</v-list-item-title>
              </v-list-item>
              <v-list-item value="2" prepend-icon="mdi-tag">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-tag"/>
                </template>
                <v-list-item-title>标签</v-list-item-title>
              </v-list-item>
              <v-list-item value="3" prepend-icon="mdi-shape">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-shape"/>
                </template>
                <v-list-item-title>分类</v-list-item-title>
              </v-list-item>
              <v-list-item value="4" prepend-icon="mdi-chat">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-chat"/>
                </template>
                <v-list-item-title>说说</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props}">
              <div class="hidden-sm-and-down app-bar-nav-item" v-bind="props">
                <v-icon class="app-bar-nav-item-icon" icon="mdi-file-multiple"/>
                <span class="app-bar-nav-item-text">文件</span>
                <v-icon class="pl-1"
                        :icon="props['aria-expanded'] === 'false' ?'mdi-chevron-up':'mdi-chevron-down'"/>
              </div>
            </template>
            <v-list nav slim class="pa-0" bg-color="#1212127f">
              <v-list-item value="1">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-image"/>
                </template>
                <v-list-item-title>相册</v-list-item-title>
              </v-list-item>
              <v-list-item value="2" prepend-icon="mdi-tag">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-image-multiple"/>
                </template>
                <v-list-item-title>壁纸</v-list-item-title>
              </v-list-item>
              <v-list-item value="3" prepend-icon="mdi-shape">
                <template v-slot:prepend>
                  <v-icon class="v-icon--size-x-small" icon="mdi-movie-roll"/>
                </template>
                <v-list-item-title>电影</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <div class="hidden-sm-and-down app-bar-nav-item">
            <v-icon class="app-bar-nav-item-icon" icon="mdi-book-open-page-variant"/>
            <span class="app-bar-nav-item-text">友人帐</span>
          </div>
          <div class="hidden-sm-and-down app-bar-nav-item">
            <v-icon class="app-bar-nav-item-icon" icon="mdi-information-variant-box"/>
            <span class="app-bar-nav-item-text">自言自语</span>
          </div>
        </div>
      </template>
      <!--   顶部导航结束   -->
    </v-app-bar>

    <!--    小屏幕导航开始   -->
    <v-navigation-drawer
      v-model="showDrawer"
      class="hidden-md-and-up slide-y-transition-move"
      color="#121212cc"
      order="-1"
      location="left"
      floating
      temporary
    >
      <v-row class="pt-10">
        <v-col class="text-center">
          <v-avatar image="@/assets/avatar.jpg"
                    size="90"
                    border
                    color="#eeeeee"
          ></v-avatar>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col cols="12" class="py-0 px-10">
          <v-row>
            <v-col>文 章</v-col>
            <v-col>分 类</v-col>
            <v-col>标 签</v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="py-0 px-10">
          <v-row>
            <v-col>1</v-col>
            <v-col>2</v-col>
            <v-col>3</v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-10">
          <v-divider class="border-opacity-75" :thickness="2" color="white"></v-divider>
        </v-col>
      </v-row>
      <!--   手机导航开始   -->
      <v-list v-model:opened="open" nav slim lines class="px-6">
        <v-list-item prepend-icon="mdi-home" title="主页" link to="/"/>

        <v-list-group value="pigeonhole">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-zip-box"
              title="归档"
            />
          </template>
          <v-list class="pl-5" nav slim lines>
            <v-list-item
              prepend-icon="mdi-timeline-text"
              title="时间线"
            />
            <v-list-item
              prepend-icon="mdi-tag"
              title="标签"
            />
            <v-list-item
              prepend-icon="mdi-shape"
              title="分类"
            />
            <v-list-item
              prepend-icon="mdi-chat"
              title="说说"
            />
          </v-list>
        </v-list-group>
        <v-list-group value="file">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-file-multiple"
              title="文件"
            />
          </template>
          <v-list class="pl-5" nav slim lines>
            <v-list-item
              prepend-icon="mdi-image"
              title="相册"
            />
            <v-list-item
              prepend-icon="mdi-image-multiple"
              title="壁纸"
            />
            <v-list-item
              prepend-icon="mdi-movie-roll"
              title="电影"
            />
          </v-list>
        </v-list-group>

        <v-list-item prepend-icon="mdi-book-open-page-variant" title="友人帐"/>
        <v-list-item prepend-icon="mdi-information-variant-box" title="自言自语"/>
      </v-list>
      <!--   手机导航结束   -->
    </v-navigation-drawer>

    <!--   工作日志开始 -->
    <v-navigation-drawer>

    </v-navigation-drawer>
    <!--  工作日志结束  -->

    <!--    主体    -->
    <v-main class="pt-0" id="app-main">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </v-main>

    <!--  回到顶部  -->
    <v-fab
      @click="goTo('#goto-target-container',{duration:1000,offset:-64})"
      :active="appStore.showFab"
      color="#00adb5"
      icon="mdi-arrow-up"
      variant="tonal"
      location="bottom end"
      app
      appear
    />

    <!--页脚 -->
    <v-footer
      class="public-transition"
      color="#121212cc"
      app
      absolute
    >
      <v-container class="pa-0 d-flex flex-column justify-center align-center footer-container"
                   height="150"
      >
        <p class="v-card-title text-capitalize">
          welcome to shadow blog ~
        </p>
        <div class="text-left opacity-80">
          <div class="text-overline">
            <div class="text-subtitle-1">
              ©2024-2025 By Mark·ZJ
            </div>
            <div class="text-subtitle-2">
              Powered By
              <span class="cursor-pointer" v-tooltip="{text:`v ${version}`,openOnClick:true}">
                <v-icon icon="$vuetify"/>
                <strong>Vuetify</strong>
              </span>
            </div>
          </div>
          <div class="text-subtitle-2">
            备案号:湘 ICP 备 xxxxxxxx 号
          </div>
        </div>
      </v-container>
    </v-footer>

  </v-app>
</template>

<style lang="css">

* {
  scrollbar-width: thin;
  scrollbar-color: #00adb5cc #121212cc;
}

.public-transition > * {
  transition: all 1s ease-in-out;
}

#app-main {
  position: relative;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-image: url('@/assets/banner-5.png');
}

.app-bar-title {
  font-size: medium;
  opacity: 0.7;
  transition: .5s;
}

.app-bar-title:hover {
  opacity: 1;
  cursor: pointer;
}

.app-bar-nav-item {
  color: #eeeeee;
  font-size: .9rem;
  opacity: 0.7;
  transition: .5s;
  position: relative;
  padding: 0 10px;
}

.app-bar-nav-item-icon {
  padding-right: 10px;
}

.app-bar-nav-item:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 3px;
  content: '';
  transition: all 0.3s ease-in-out;
}

.app-bar-nav-item:hover::after {
  width: 100%;
  background-color: #00adb5;
}

.app-bar-nav-item:hover {
  opacity: 1;
  cursor: pointer;
}

.dialog-bg-color {
  background-color: #00000047;
}


.footer-container {
  border-left: #00adb5 dashed 3px;

}
</style>

