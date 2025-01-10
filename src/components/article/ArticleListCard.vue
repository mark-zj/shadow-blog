<script>
export default {
  name: 'ArticleListCard',
  props: {
    article: {
      type: Object,
      default: null
    },
    articleLoading: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    openArticleCardLoading: false,
  }),
  methods: {
    openArticleCard() {
      this.openArticleCardLoading = true;
      setTimeout(() => {
        this.openArticleCardLoading = false;
        this.$router.push({path: '/article'});
      }, 1000);
    }
  },
}
</script>
<template>
  <v-card
    :loading="openArticleCardLoading"
    :disabled="openArticleCardLoading"
    @click="openArticleCard"
    color="rgba(var(--v-theme-surface) , .2)"
    elevation="0"
    hover>

    <!--   card overlay 开始 -->
    <!--  card overlay 在page改变时触发  -->
    <v-overlay
      @click.stop
      :model-value="articleLoading"
      scrim="surface"
      class="align-center justify-center"
      content-class="text-primary"
      persistent
      contained>
      <v-progress-circular color="primary" :indeterminate="articleLoading"/>
      <span class="px-5 text-mono">正在加载...</span>
    </v-overlay>
    <!--   card overlay 结束 -->

    <!--  文章加载条开始  -->
    <template #loader="{isActive}">
      <v-progress-linear
        :active="isActive"
        color="primary"
        height="3"
        indeterminate
        reverse
      />
    </template>
    <!--  文章加载条结束  -->

    <!--  文章card banner开始  -->
    <v-img
      class="align-end"
      height="260"
      :src="article.bannerUrl"
      cover>
      <!--  文章加标题开始  -->
      <v-card-title class="article-banner-content">
        <div class="d-flex align-center font-weight-bold">
          <v-icon
            v-if="article.topMounted"
            class="pushpin"
            color="primary"
            size="small"
            icon="mdi-pin"
          />
          <span v-else class="px-1 text-primary">#</span>
          <span>{{ article.title }}</span>
        </div>
      </v-card-title>
      <!--  文章加标题结束  -->
      <template v-slot:placeholder>
        <v-row align="center" class="fill-height gc-2" justify="center">
          <v-progress-circular color="primary" indeterminate/> <span>图片加载中...</span>
        </v-row>
      </template>
      <template v-slot:error>
        <v-row align="center" class="fill-height" justify="center">
          图片加载出错 !
        </v-row>
      </template>
    </v-img>
    <!--  文章card banner结束  -->

    <!--  文章加分类开始  -->
    <v-card-subtitle>
      <v-chip
        prepend-icon="mdi-shape"
        variant="text"
        :text="article.category.name"
        v-tooltip="{text: `${article.category.description}`}"
        @click.stop
      />
    </v-card-subtitle>
    <!--  文章加分类结束  -->

    <!--  文章加标签开始  -->
    <v-card-subtitle>
      <v-chip-group column>
        <v-chip
          v-for="(tag, index) in article.tags"
          :text="tag.name"
          :key="`${tag.name}-${index}`"
          v-tooltip="{text: `${tag.description}`,location:'bottom'}"
          @click.stop
          rounded="sm"
          tile>
          <template #prepend>
            <v-icon :color="tag.color" icon="mdi-tag"/>
          </template>
        </v-chip>
      </v-chip-group>
    </v-card-subtitle>
    <!--  文章加标签结束  -->

    <!--  文章发表和编辑时间开始  -->
    <v-card-subtitle>
      <div class="cursor-default d-flex flex-wrap gc-1 gr-1">
        <span>
          <v-icon icon="mdi-clipboard-text-clock"/>
          发表于{{ article.createTime }}
        </span>
        <span>
          <v-icon icon="mdi-calendar-clock"/>
          更新于{{ article.updateTime }}
        </span>
      </div>
    </v-card-subtitle>
    <!--  文章发表和编辑时间结束  -->

    <!--  文章片段开始  -->
    <v-card-item>
      <v-divider color="primary" thickness="2"/>
    </v-card-item>
    <v-card-text class="text-start text-xl-body-1 text-truncate">
      {{ article.fragment }}
    </v-card-text>
    <!--  文章片段结束  -->
  </v-card>
</template>
<style lang="scss" scoped>
@import '@/styles/main';

//.article-arrow-expand {
//  transition: color .3s ease-in-out;
//}
//
//.article-arrow-expand:hover {
//  cursor: pointer;
//  color: rgb(var(--v-theme-primary));
//}
.article-banner-content{
  background-color: rgba($article-banner-content-bgColor,.3);
}
.pushpin {
  transform: rotate(-15deg);
}

//.article-row:hover > .article-col > .article-banner-parent > .article-banner {
//  transform: scale(1.1);
//}
//
//.article-row:hover > .article-col > .article-banner-parent > .article-skeleton > .article-banner {
//  transform: scale(1.1);
//}
</style>
