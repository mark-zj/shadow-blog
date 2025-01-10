<script>
import {mapState} from "pinia";
import {useArticleStore} from "@/stores/article";
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
    return {}
  },
  mounted() {
    this.getArticleListByPage_(1);
  },
  data: () => ({
    articleLoading: false,
  }),
  computed: {
    ...mapState(useArticleStore, ['getArticleList', 'getArticleListByPage', 'getTotalPages', 'getPage']),
  },
  methods: {
    getArticleListByPage_(page) {
      this.articleLoading = true;
      // api 加载模拟
      setTimeout(() => {
        this.getArticleListByPage(page);
        this.articleLoading = false;
      }, 2000);
    },
  },
}
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row>
      <!--    只显示5个card  -->
      <v-col cols="12" class="px-0" v-for="(item,index) in getArticleList" :key="`${item.id}-${index}`">
        <article-list-card :article-loading="articleLoading" :article="item"/>
      </v-col>
    </v-row>
    <!--        文章end          -->
    <!--     底部分页条     -->
    <v-row justify="center" align-content="center">
      <v-col cols="12">
        <v-pagination
          v-if="showPagination"
          v-model="getPage"
          :length="getTotalPages"
          @update:modelValue="getArticleListByPage_"
          variant="flat"
          active-color="primary"
          density="comfortable"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="css" scoped>

</style>
