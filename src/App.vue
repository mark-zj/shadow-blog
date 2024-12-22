<script>
import {mapActions, mapState, mapWritableState} from "pinia";
import {useAppStore} from "@/stores/app";
import {version, useGoTo} from "vuetify";
import {VScaleTransition} from "vuetify/components";
import {defineComponent} from "vue";

export default defineComponent(
    {
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
                localStorage.setItem('lookCommitsDrawer',false);
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

                // this.appLaunchOverlay = false; 暂时移动至 welcomeBannerLoadend 中
                this.startAppBarTransition = true;

                console.log('Shadow Blog App started ~ (mounted)');
            });
        },
        data: () => ({
            showSearchBox: false,
            showDrawer: false,
            items: Array.from({length: 50}, (k, v) => v + 1),
        }),
        computed: {
            VScaleTransition() {
                return VScaleTransition;
            },
            ...mapState(useAppStore, ['navItems']),
            ...mapWritableState(useAppStore, [
                'appSnackBar',
            ]),
            ...mapWritableState(useAppStore, [
                'appLaunchOverlay', 'startAppBarTransition', 'showWelcomeBanner',
            ]),

            ...mapWritableState(useAppStore, ['commitsDrawer',]),

            ...mapState(useAppStore, ['showFab']),
        },
        methods: {
            ...mapActions(useAppStore, ['onShowCommitsDrawer','loadShadowBlogCommits']),

            async launch() {
                // api
                await this.loadShadowBlogCommits().then(data => {
                    this.commitsDrawer.commits = data;
                }).catch(error => {
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
        },
        destroyed() {
            window.removeEventListener('online');
            window.removeEventListener('offline');
        },
    }
)

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
      :transition="{component: VScaleTransition}"
    >
      <template #text>
        <div class="d-inline-flex align-center gc-2">
          <v-icon icon="mdi-information-box"/>
          <span>{{appSnackBar.text}}</span>
        </div>
      </template>
    </v-snackbar>
    <!--  上线 离线提示snake bar结束  -->

    <!--    大屏幕导航   -->
    <v-app-bar
      class="px-5"
      order="0"
      color="#121212cc"
      scroll-behavior="hide"
      density="default"
      elevation="1"
    >
      <v-app-bar-title v-slot:text>
        <transition name="public-fade">
          <span
            v-show="startAppBarTransition"
            class="app-bar-title"
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
                    bg-color="#121212cc"
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
                    color="#121212cc"
                  />
                </v-col>
                <v-col cols="12">
                  <!--  结果-->
                  <v-sheet
                    class="pa-5 border-opacity-75"
                    color="#121212cc"
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
                  bg-color="#1212127f"
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
      color="#121212cc"
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
    <v-main id="app-main">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </v-main>

    <!--  回到顶部  -->
    <v-fab
      @click="goTo('#goto-target-container',{duration:1000})"
      :active="showFab"
      color="primary"
      icon="mdi-arrow-up"
      variant="tonal"
      location="bottom end"
      app
      appear
    />

    <!--页脚开始 -->
    <v-footer
      class="public-transition"
      color="#121212cc"
      app
      absolute
    >
      <v-container
        class="pa-0 d-flex flex-column justify-center align-center footer-container-border"
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
    <!--页脚结束 -->
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
  background-color: #00adb5;
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
    border-inline-start-color: rgba(0, 173, 181, 30%);
  }
  to {
    border-inline-start-color: rgba(0, 173, 181, 100%);
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

