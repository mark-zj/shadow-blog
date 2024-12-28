<script>
import {mapActions, mapState, mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";
import {version, useGoTo} from "vuetify";

export default {
  name: "ShadowBlogApp",
  setup() {
    const goTo = useGoTo();
    return {
      goTo,
      version,
    };
  },
  created() {
    window.addEventListener('online', () => {
      console.info("网络已连接！");
      this.appSnackBar.open = true;
      this.appSnackBar.text = '网络已连接！';
    });
    window.addEventListener('offline', () => {
      console.warn("网络未连接！");
      this.appSnackBar.open = true;
      this.appSnackBar.text = '网络未连接！';
    });
    if (localStorage.getItem('lookCommitsDrawer') == null) {
      localStorage.setItem('lookCommitsDrawer', false);
    }
    if (localStorage.getItem('preCommitsSize') == null) {
      localStorage.setItem('preCommitsSize', 0);
    }
  },
  beforeMount() {
    console.log('Shadow Blog App starting... (beforeMount)');
    this.appLaunchOverlay = true;
    this.startAppBarTransition = false;
    this.showWelcomeBanner = true;
  },
  mounted() {
    this.launch().then(v => {
      console.log('启动代码->', v);
      // todo:暂时 没到顶部就不会触发回调
      if (this.showFab) {
        this.appLaunchOverlay = false;
      }

      // this.appLaunchOverlay = false; 暂时移动至 welcomeBannerLoadend 中
      this.startAppBarTransition = true;

      console.log('Shadow Blog App started ~ (mounted)');
    });
  },
  data: () => ({
    showToolBoxOverlay: false,
    visitorCard: {
      openedPanels: ['systems', 'browsers', 'ssr', 'touch'],
    },
    showSearchBox: false,
    showDrawer: false,
    items: Array.from({length: 50}, (k, v) => v + 1),
  }),
  computed: {
    ...mapState(useAppStore, ['navItems', 'showFab', 'visitorInfo']),
    ...mapWritableState(useAppStore, [
      'appSnackBar', 'appLaunchOverlay', 'startAppBarTransition', 'showWelcomeBanner', 'commitsDrawer',
    ]),
  },
  methods: {
    ...mapActions(useAppStore, ['onShowCommitsDrawer', 'loadShadowBlogCommits']),
    ...mapActions(useAppStore, ['loadVisitorInfo',]),

    async launch() {
      await this.loadVisitorInfo(this);
      // api
      this.commitsDrawer.commits = await this.loadShadowBlogCommits().catch(error => {
        console.error(error);
      });
      return 0;
    },
    load({done}) {
      setTimeout(() => {
        this.items.push(...Array.from({length: 10}, (k, v) => v + this.items.at(-1) + 1))
        done('ok')
      }, 1000)
    },
    goToRoute(path) {
      this.$router.push({path: path});
    },
    async toggleThemeByName(themeName) {
      const theme = this.$vuetify.theme;
      theme.name = themeName;
    },
  },
  destroyed() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  },
}
</script>

<template>
  <v-app>
    <!--  app 启动遮罩开始  -->
    <v-overlay
      :model-value="appLaunchOverlay"
      class="align-center justify-center text-center"
      persistent
    >
      <div>
        <v-progress-circular color="primary" :indeterminate="appLaunchOverlay"/>
        <span class="pa-5 font-weight-bold text-subtitle-2">正在启动...</span>
      </div>
      <p class="pa-5">你好，陌生人 ~</p>
    </v-overlay>
    <!--  app 启动遮罩结束  -->

    <!--  上线 离线提示snake bar开始 -->
    <v-snackbar
      class="pa-0"
      color="primary"
      variant="tonal"
      v-model="appSnackBar.open"
      :timeout="appSnackBar.timeout"
      transition="scale-transition"
    >
      <template #text>
        <div class="d-inline-flex align-center gc-2">
          <v-icon icon="mdi-information-box"/>
          <span>{{ appSnackBar.text }}</span>
        </div>
      </template>
    </v-snackbar>
    <!--  上线 离线提示snake bar结束  -->
    <!--  app layout  -->
    <!--    大屏幕导航开始  -->
    <v-app-bar
      class="px-5"
      order="0"
      color="rgba(var(--v-theme-surface) , .6)"
      :image="$vuetify.theme.name === 'shadowTheme' ? 'src/assets/banner-1.jpg' : ''"
      scroll-behavior="fade-image inverted"
      scroll-threshold="2000"
      density="comfortable"
      elevation="0"
    >
      <v-app-bar-title #text>
        <transition name="public-fade">
          <span
            class="app-bar-title d-inline-block"
            v-show="startAppBarTransition"
          >
            Shadow Blog
          </span>
        </transition>
      </v-app-bar-title>

      <!--       搜索框开始     -->
      <v-scale-transition>
        <template>
          <v-dialog
            v-model="showSearchBox"
            content-class="justify-space-evenly"
            persistent
            fullscreen
          >
            <v-container
              max-width="500px"
              fluid
            >
              <v-row>
                <v-col
                  class="d-flex align-center justify-center"
                  cols="12"
                >
                  <v-text-field
                    variant="solo"
                    min-width="300px"
                    max-width="300px"
                    bg-color="rgba(var(--v-theme-surface) , .8)"
                    color="primary"
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
                  <v-btn
                    @click="showSearchBox = !showSearchBox"
                    class="ml-5"
                    icon="mdi-close"
                    color="rgba(var(--v-theme-surface) , .8)"
                  />
                </v-col>
                <v-col cols="12">
                  <!--  结果-->
                  <v-sheet
                    class="pa-5 border-opacity-75"
                    color="rgba(var(--v-theme-surface) , .8)"
                    border
                  >
                    <div class="v-card-title">
                      <v-icon icon="mdi-receipt-clock"/>
                      <span class="font-weight-bold">最近</span>
                    </div>
                    <v-infinite-scroll
                      height="300"
                      mode="intersect"
                      @load="load"
                      color="primary"
                      empty-text="没有更多了..."
                      border
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
        </template>
      </v-scale-transition>
      <!--       搜索框结束     -->

      <!--   顶部导航开始   -->
      <template v-slot:append>
        <transition name="app-nav">
          <div
            v-if="startAppBarTransition"
            class="d-inline-flex align-center"
          >
            <!--     搜索框     -->
            <div
              class="app-bar-nav-item"
              @click="showSearchBox = !showSearchBox"
            >
              <div class="d-inline-flex align-center gc-1">
                <v-icon size="small" icon="mdi-magnify"/>
                <span class="hidden-sm-and-down">搜索</span>
              </div>
            </div>
            <!--     搜索框     -->

            <!--     小屏幕抽屉开关开始    -->
            <div class="hidden-md-and-up app-bar-nav-item">
              <div class="d-inline-flex align-center gc-1">
                <v-icon icon="mdi-menu" @click="showDrawer = !showDrawer"/>
              </div>
            </div>
            <!--     小屏幕抽屉开关结束     -->

            <!--     大屏幕导航选项开始     -->
            <template v-for="navItem in navItems">
              <div
                v-if="navItem.childNavItems === undefined"
                class="hidden-sm-and-down"
                @click="goToRoute(navItem.path)"
              >
                <div class="app-bar-nav-item d-inline-flex align-center gc-1">
                  <v-icon size="small" :icon="navItem.icon"/>
                  <span>{{ navItem.title }}</span>
                </div>
              </div>
              <v-menu
                v-else
                open-on-hover
              >
                <template v-slot:activator="{props}">
                  <div class="hidden-sm-and-down" v-bind="props">
                    <div class="app-bar-nav-item d-inline-flex align-center gc-1">
                      <v-icon size="small" :icon="navItem.icon"/>
                      <span>{{ navItem.title }}</span>
                      <v-icon class="pl-1"
                              :icon="props['aria-expanded'] === 'false' ?'mdi-chevron-up':'mdi-chevron-down'"/>
                    </div>
                  </div>
                </template>
                <v-list
                  class="pa-0"
                  bg-color="rgba(var(--v-theme-surface) , .5)"
                  color="primary"
                  nav
                  slim
                  lines
                >
                  <v-list-item
                    v-for="childNavItem in navItem.childNavItems"
                    :title="childNavItem.title"
                    :value="childNavItem.title"
                    :to="{path: childNavItem.path}"
                  >
                    <template v-slot:prepend>
                      <v-icon size="small" :icon="childNavItem.icon"/>
                    </template>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <!--     大屏幕导航选项结束     -->
          </div>
        </transition>
      </template>
      <!--   顶部导航结束   -->
    </v-app-bar>
    <!--    大屏幕导航结束  -->

    <!--    小屏幕导航开始   -->
    <v-navigation-drawer
      v-model="showDrawer"
      class="hidden-md-and-up slide-y-transition-move"
      color="rgba(var(--v-theme-surface) , .8)"
      order="-1"
      location="left"
      floating
      temporary
    >
      <v-container fluid>
        <v-row class="pt-10">
          <v-col class="text-center">
            <v-avatar
              image="@/assets/avatar.jpg"
              size="90"
              border
              color="#eeeeee"
            />
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12" class="py-0">
            <v-row>
              <v-col>文 章</v-col>
              <v-col>分 类</v-col>
              <v-col>标 签</v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row>
              <v-col>1</v-col>
              <v-col>2</v-col>
              <v-col>3</v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="">
            <v-divider class="border-opacity-75" :thickness="2" color="white"></v-divider>
          </v-col>
        </v-row>
        <v-list
          color="primary"
          nav
          slim
          lines
        >
          <v-list-subheader
            class="text-caption font-weight-bold"
            title="成为你的影子 ~"
          />
          <template v-for="navItem in navItems">
            <v-list-item
              v-if="navItem.childNavItems === undefined"
              :title="navItem.title"
              :value="navItem.title"
              :to="navItem.path"
              :prepend-icon="navItem.icon"
            />
            <v-list-group
              v-else
              color="primary"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="navItem.icon"
                  :title="navItem.title"
                  :value="navItem.title"
                />
              </template>
              <v-list
                class="pl-5"
                color="primary"
                nav
                slim
                lines
              >
                <v-list-item
                  v-for="childNavItem in navItem.childNavItems"
                  :prepend-icon="childNavItem.icon"
                  :title="childNavItem.title"
                  :value="childNavItem.title"
                  :to="childNavItem.path"
                />
              </v-list>
            </v-list-group>
          </template>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <!--    小屏幕导航结束   -->

    <!--   代码提交日志开始 -->
    <v-navigation-drawer
      v-model="commitsDrawer.open"
      class="slide-y-transition-move"
      color="rgba(var(--v-theme-surface) , .8)"
      order="-1"
      location="left"
      width="350"
      floating
      temporary
    >
      <v-container class="h-75" fluid>
        <v-toolbar
          color="transparent"
          title="代码提交日志"
        >
          <v-btn
            @click="onShowCommitsDrawer"
            color="primary"
            icon="mdi-refresh"
            border
          />
        </v-toolbar>
        <v-divider class="border-opacity-75" thickness="2"/>
        <v-container class="pa-0 my-3 h-100 overflow-hidden overflow-scroll overflow-x-hidden">
          <div v-if="commitsDrawer.loading" class="text-center">
            <v-progress-circular color="primary" indeterminate/>
          </div>
          <v-timeline
            v-else
            align="center"
            side="start"
          >
            <v-timeline-item
              v-for="(item,index) in commitsDrawer.commits"
              :key="index" hide-on-leave leave-absolute
              dot-color="pink"
              size="small"
            >
              <template v-slot:default>
                <v-card density="compact">
                  <template #text>
                    <div>
                      <div>
                        {{ item.commit.message }}
                      </div>
                      <div class="text-caption opacity-70">{{ item.commit.author.date }}</div>
                    </div>
                  </template>
                </v-card>
              </template>
              <template v-slot:opposite>
                <strong>{{ item.commit.author.name }}</strong>
              </template>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-container>
    </v-navigation-drawer>
    <!--  代码提交日志结束  -->

    <!--    主体    -->
    <v-main id="app-main" :class="{'app-main-bg-image': $vuetify.theme.name === 'shadowTheme'}">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </v-main>

    <!--页脚开始 -->
    <v-footer
      class="public-transition"
      color="rgba(var(--v-theme-surface) , .8)"
      app
      absolute
    >
      <v-container
        class="pa-0 d-flex flex-column justify-center align-center footer-container-border"
        height="150"
      >
        <div>
          <div class="v-card-title text-capitalize">
            welcome to shadow blog ~
          </div>
          <div class="text-subtitle-2 text-end">
            💦 Copyright © 2024-2025
          </div>
        </div>
        <div class="text-left opacity-80">
          <div class="text-overline">
            <div class="text-subtitle-2">
              Designed By
              <span class="cursor-pointer">
                <strong>Mark·ZJ</strong>
              </span>
            </div>
            <div class="text-subtitle-2">
              Powered By
              <span class="cursor-pointer" v-tooltip="{text:`v ${version}`,openOnClick:true}">
                <v-icon icon="$vuetify"/>
                <strong>Vuetify</strong>
              </span>
            </div>
          </div>
          <div class="text-subtitle-2 text-disabled">
            备案号:湘 ICP 备 xxxxxxxx 号
          </div>
        </div>
      </v-container>
    </v-footer>
    <!--页脚结束 -->

    <!--  工具Fab 开始 -->
    <v-overlay
      v-model="showToolBoxOverlay"
      scrim="#12121250"
      scroll-strategy="none"
      content-class="bottom-0 top-0 left-0 right-0"
      close-on-content-click>
      <v-container class="fill-height justify-center align-center">
        <v-card
          class="pa-5 overflow-y-auto overflow-x-hidden"
          width="560px"
          height="550px"
          color="rgba(var(--v-theme-surface) , 1)"
          prepend-icon="mdi-devices"
          title="设备信息"
          :link="false"
          :ripple="false"
          :hover="false"
          border
          @click.stop
        >
            <v-card-item>
                <v-divider color="primary"/>
            </v-card-item>
          <v-card-subtitle># 主题</v-card-subtitle>
          <v-card-item>
            <v-row>
              <v-col cols="12">
                <div class="v-card-subtitle">
                  Vuetify 内置
                </div>
                <v-btn-group color="primary" variant="outlined">
                  <v-btn text="明亮" @click.stop="toggleThemeByName('light')"/>
                  <v-btn text="暗黑" @click.stop="toggleThemeByName('dark')"/>
                </v-btn-group>
              </v-col>
              <v-col cols="12">
                <div class="v-card-subtitle">
                  定制化
                </div>
                <v-btn-group color="primary" variant="outlined">
                  <v-btn text="影子主题" @click.stop="toggleThemeByName('shadowTheme')"/>
                  <v-btn text="简洁主题" @click.stop="toggleThemeByName('simpleTheme')"/>
                </v-btn-group>
              </v-col>
            </v-row>
          </v-card-item>
            <v-card-item>
                <v-divider color="primary"/>
            </v-card-item>
          <v-card-subtitle># 运行环境</v-card-subtitle>
          <v-card-item>
            <v-expansion-panels
              v-model="visitorCard.openedPanels"
              variant="accordion"
              bg-color="transparent"
              multiple
              focusable
              static
            >
              <v-expansion-panel value="systems">
                <v-expansion-panel-title>
                  <div class="d-inline-flex align-center gc-1">
                    <v-icon icon="mdi-cog-outline"/>
                    系统
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-chip-group
                    v-model="visitorInfo.platform.systems"
                    selected-class="bg-success opacity-100"
                    variant="plain"
                    disabled
                    filter
                    column
                  >
                    <v-chip value="android" prepend-icon="mdi-android" text="Android"/>
                    <v-chip value="ios" prepend-icon="mdi-apple-ios" text="IOS"/>
                    <v-chip value="win" prepend-icon="mdi-microsoft-windows" text="Windows"/>
                    <v-chip value="mac" prepend-icon="mdi-apple-keyboard-command" text="Mac"/>
                    <v-chip value="linux" prepend-icon="mdi-linux" text="Linux"/>
                  </v-chip-group>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel value="browsers">
                <v-expansion-panel-title>
                  <div class="d-inline-flex align-center gc-1">
                    <v-icon icon="mdi-monitor-eye"/>
                    浏览器
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-chip-group
                    v-model="visitorInfo.platform.browsers"
                    variant="plain"
                    selected-class="bg-success opacity-100"
                    disabled
                    filter
                    column
                  >
                    <v-chip value="chrome" prepend-icon="mdi-google-chrome" text="Chrome"/>
                    <v-chip value="edge" prepend-icon="mdi-microsoft-edge" text="Edge"/>
                    <v-chip value="firefox" prepend-icon="mdi-firefox" text="Firefox"/>
                    <v-chip value="opera" prepend-icon="mdi-opera" text="Opera"/>
                  </v-chip-group>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                value="ssr"
                :focusable="false"
                hide-actions
              >
                <v-expansion-panel-title>
                  <div class="d-inline-flex align-center gc-1">
                    <v-icon icon="mdi-server-network-outline"/>
                    SSR 渲染
                  </div>
                  <template v-if="visitorInfo.platform.ssr">✅</template>
                  <template v-else>❌</template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-subtitle-2">
                    服务器端动态生成Web页面
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                value="touch"
                :focusable="false"
                hide-actions
              >
                <v-expansion-panel-title>
                  <div class="d-inline-flex align-center gc-1">
                    <v-icon icon="mdi-gesture-tap-button"/>
                    可触摸
                  </div>
                  <template v-if="visitorInfo.platform.touch">✅</template>
                  <template v-else>❌</template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="text-subtitle-2">
                    使用可触摸界面交互
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-item>
        </v-card>
      </v-container>
    </v-overlay>
    <v-speed-dial
      location="right center"
      location-strategy="connected"
      content-class="flex-column"
      close-delay="1000"
      open-delay="0"
      open-on-click
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-fab
          v-bind="props"
          icon="mdi-toolbox"
          color="primary"
          variant="outlined"
          location="left center"
          app
          appear
          rounded
        />
      </template>
      <template #default>
        <v-btn
          key="1"
          color="primary"
          icon="mdi-devices"
          v-tooltip="{text: '设备信息'}"
          @click="showToolBoxOverlay = true"
        />
        <v-btn
          key="2"
          color="primary"
          icon="mdi-comment-alert"
          v-tooltip="{text: '建议反馈(建设中...)'}"
        />
        <v-btn
          key="3"
          color="primary"
          icon="mdi-wrench"
          v-tooltip="{text: '更多功能正在加入...'}"
        />
      </template>
    </v-speed-dial>
    <!--  工具Fab 结束 -->

    <!--  回到顶部  -->
    <v-fab
      @click="goTo('#goto-target-container',{duration:1000})"
      :active="showFab"
      color="primary"
      icon="mdi-arrow-up"
      variant="tonal"
      location="bottom end"
      order="-1"
      app
      appear
    />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/main';

// 预置前置变量(保证不暴红) 框架进行替换
:root {
  --v-theme-primary: '';
  --v-theme-background: '';
}

* {
  scrollbar-width: thin;
  // scss 中使用变量就可以分开写
  scrollbar-color: rgba($scrollbar-color-frontend, 1) rgba($scrollbar-color-backend, .4);
}

.public-transition > * {
  transition: all 1s ease-in-out;
}

.app-main-bg-image {
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
  font-size: .9rem;
  opacity: 0.7;
  transition: .5s;
  position: relative;
  padding: 0 10px;
}

.app-bar-nav-item:after {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 3px;
  content: '';
  transition: all .3s ease-in-out;
}

.app-bar-nav-item:hover::after {
  width: 100%;
  background-color: rgb(var(--v-theme-primary));
}

.app-bar-nav-item:hover {
  opacity: 1;
  cursor: pointer;
}

.footer-container-border {
  border-inline-start-width: 3px;
  border-inline-start-style: dashed;
  animation: border_animation 2s infinite;
  animation-direction: alternate;
}

@keyframes border_animation {
  from {
    border-inline-start-color: rgba($footer-border-from-color, 30%);
  }
  to {
    border-inline-start-color: rgba($footer-border-to-color, 100%);
  }
}

.public-fade-enter-active,
.public-fade-leave-active {
  transition: opacity 1s ease;
  transition-delay: 1s;
}

.public-fade-enter-from,
.public-fade-leave-to {
  opacity: 0;
}

.app-nav-enter-active {
  transition: all 0.5s ease;
}

.app-nav-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

</style>

