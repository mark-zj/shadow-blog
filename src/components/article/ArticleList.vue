<script>
import {useArticleListStore} from "@/stores/article_list";
import ArticleListCard from "@/components/article/ArticleListCard.vue";

export default {
  name: 'ArticleList',
  components: {ArticleListCard},
  props: {
    showPagination: {
      type: Boolean,
      default: true
    },
  },
  setup() {
    const useArticleList = useArticleListStore();
    return {
      useArticleList,
    }
  },
  mounted() {
    this.getArticleListByPage_(1);
  },
  data() {
    return {
      articleLoading: false,
    }
  },
  methods: {
    getArticleListByPage_(page) {
      this.articleLoading = true;
      // api 加载模拟
      setTimeout(()=> {
        this.useArticleList.getArticleListByPage(page);
        this.articleLoading = false;
      },2000);
    },
  },
}
</script>

<template>
  <v-container fluid class="pa-5">
    <!--        文章start          -->
    <template v-for="(article, index) in useArticleList.getArticleList">
      <v-row :class="index % 2 === 0 ? 'flex-row-reverse article-row':'article-row'">
        <v-col class="pa-0 d-flex align-center article-col" cols="12" sm="5" md="5" xl="5">
          <div class="article-banner-parent overflow-hidden w-100">
            <!--
              :src="`https://picsum.photos/seed/${Math.random()}/360/260?random=1`"
              :src="`./src/assets/article/${index + 1}.jpg`"
            -->
            <v-img
              class="article-banner"
              min-width="360"
              min-height="260"
              :src="`https://picsum.photos/seed/${Math.random() * 100}/360/260?random=1`"
              referrerpolicy="origin"
              aspect-ratio="16/9"
              cover
            >
              <template v-slot:placeholder>
                <v-row
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                >
                  <v-progress-circular color="#00adb5" indeterminate/>
                </v-row>
              </template>
              <template v-slot:error>
                <v-img
                  class="article-banner"
                  min-width="360"
                  min-height="260"
                  alt="error"
                  cover
                />
              </template>
            </v-img>
          </div>
        </v-col>
        <v-col class="pa-0" cols="12" sm="7" md="7" xl="7">
          <v-skeleton-loader
            :loading="articleLoading"
            color="transparent"
            type="heading ,subtitle,text, text@2, text@3"
          >
            <article-list-card :article="article"/>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-divider/>
        </v-col>
      </v-row>
    </template>
    <!--        文章end          -->
  </v-container>
  <!--     底部分页条     -->
  <v-row justify="center" align-content="center">
    <v-col cols="12" md="6">
      <v-pagination
        v-if="showPagination"
        v-model="useArticleList.page"
        @update:modelValue="getArticleListByPage_"
        :length="useArticleList.getTotalPages"
        variant="flat"
        active-color="#00adb5"
        density="comfortable"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        />
    </v-col>
  </v-row>
</template>

