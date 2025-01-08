<script>
import {useGoTo} from "vuetify";
import {useRoute} from "vue-router";

import {useAppStore} from "@/stores/app";

import WelcomeBanner from "@/components/WelcomeBanner.vue";
import ArticleTopBanner from "@/components/article/ArticleTopBanner.vue";
import PersonalTab from "@/components/tabs/PersonalTab.vue";
import NoticeTab from "@/components/tabs/NoticeTab.vue";
import LatestArticleTab from "@/components/tabs/LatestArticleTab.vue";
import TagTab from "@/components/tabs/TagTab.vue";
import ArchiveTab from "@/components/tabs/ArchiveTab.vue";
import WebsiteInformation from "@/components/tabs/WebsiteInformationTab.vue";

export default {
  components: {
    WebsiteInformation,
    ArchiveTab,
    TagTab,
    LatestArticleTab,
    NoticeTab,
    PersonalTab,
    ArticleTopBanner,
    WelcomeBanner,
  },
  setup() {
    const goTo = useGoTo();
    const appStore = useAppStore();
    const route = useRoute()
    return {goTo, appStore, route}
  },
  data: () => {
    return {}
  },
  methods: {
    currentPageNot(name) {
      //alert(this.route.path !== `/${name}`)
      return this.route.path !== `/${name}`;
    }
  }
}
</script>

<template>
  <v-container
    id="default-top-container"
    class="pa-0 ma-0 public-transition"
    fluid>
    <!--     上半段    first-half
          主页欢迎图
          文章banner
     -->
    <welcome-banner v-if="!currentPageNot('')" key="k1"/>
    <article-top-banner v-else-if="!currentPageNot('article')" key="k2"/>
    <v-container v-else-if="!currentPageNot('notfound')">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component id="goto-target-container" :is="Component"/>
        </keep-alive>
      </router-view>
    </v-container>

    <!--      下半段   second-half
       文章列表
       选项卡
    -->
    <keep-alive>
      <v-container
        v-if="currentPageNot('notfound')"
        class="pt-10"
        id="goto-target-container">
        <v-row justify="space-evenly">
          <!--  文章 标签 分类    -->
          <v-col class="d-flex flex-column"
                 cols="12" sm="12" md="12" lg="9" xl="8" xxl="7">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </router-view>
          </v-col>
          <!--     选项卡   tabs    -->
          <v-col cols="12" sm="12" md="12" lg="3" xl="3" xxl="2">
            <v-row justify="space-between">
              <!--      个人   personal    -->
              <v-col cols="12">
                <personal-tab/>
              </v-col>
              <!--       公告   notice    -->
              <v-col cols="12">
                <notice-tab/>
              </v-col>
              <!--        最新文章     Latest articles   -->
              <v-col cols="12">
                <latest-article-tab/>
              </v-col>
              <!--       标签    显示前十个 tag  -->
              <v-scale-transition>
                <v-col cols="12" v-if="currentPageNot('article')">
                  <tag-tab/>
                </v-col>
              </v-scale-transition>
              <v-scale-transition>
                <!--        归档   展示对应的时间线 archive  -->
                <v-col cols="12" v-if="currentPageNot('article')">
                  <archive-tab/>
                </v-col>
              </v-scale-transition>
              <v-scale-transition>
                <!--       网站资讯      website information -->
                <v-col cols="12" v-if="currentPageNot('article')">
                  <website-information/>
                </v-col>
              </v-scale-transition>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </keep-alive>
  </v-container>
</template>

<style lang="css">

.article-banner {
  transition: transform .5s ease-in-out;
}

.article-banner-parent {
  border-radius: 4px;
}

.article-row:hover > .article-col > .article-banner-parent > .article-banner {
  transform: scale(1.1);
}

.article-row:hover > .article-col > .article-banner-parent > .article-skeleton > .article-banner {
  transform: scale(1.1);
}


</style>

