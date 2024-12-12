<script>
export default {
  name: 'ArticleListCard',
  props: {
    article: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      openArticleCardDisabled: false,
      openArticleCardLoading: false
    }
  },
  methods: {
    openArticleCard() {
      this.openArticleCardDisabled = true;
      this.openArticleCardLoading = true;
      setTimeout(() => {
        this.openArticleCardDisabled = false;
        this.openArticleCardLoading = false;
        this.$router.push({path: '/article'});
      }, 1000);
    }
  },
}
</script>
<template>
  <v-card
    class="d-flex flex-column gr-sm-1 gr-md-2 gr-lg-3 gr-xl-8 gr-xxl-11"
    color="transparent"
    elevation="0"
    :loading="openArticleCardLoading"
  >
    <template v-slot:loader="{isActive}">
      <v-progress-linear
        :active="isActive"
        color="#00adb5"
        height="3"
        indeterminate
        reverse
      />
    </template>
    <template v-slot:title>
      <div class="d-flex flex-row align-center justify-space-between">
        <h3>
          <v-icon v-if="article.topMounted"
                  class="pushpin"
                  color="#00adb5"
                  size="small"
                  icon="mdi-pin"
          />
          <span v-else class="px-1">#</span>
          <span>{{ article.title }}</span>
        </h3>
        <v-icon class="article-arrow-expand"
                icon="mdi-arrow-expand-all"
                size="25"
                @click="openArticleCard"
                :disabled="openArticleCardDisabled"
                v-tooltip="{text: '查看文章'}"
        />
      </div>
    </template>
    <v-card-subtitle>
      <span class="cursor-pointer" v-tooltip="{text: `${article.category.description}`}">
        <v-icon icon="mdi-shape"/>
        {{ article.category.name }}
      </span>
    </v-card-subtitle>
    <v-card-subtitle>
      <v-chip-group column>
        <v-chip v-for="(tag, index) in article.tags"
                :text="tag.name"
                :key="tag.name + index"
                v-tooltip="{text: `${tag.description}`,location:'bottom'}"
                tile
        >
          <template v-slot:prepend>
            <v-icon :color="tag.color" icon="mdi-tag"/>
          </template>
        </v-chip>
      </v-chip-group>
    </v-card-subtitle>
    <v-card-subtitle>
      <span class="cursor-pointer" v-tooltip="{text: `${article.createTime}`,openOnClick: true,}">
        <v-icon icon="mdi-clipboard-text-clock"/>
        发表于{{ article.createTime }}
      </span>
      <span class="px-1 px-md-5">|</span>
      <span class="cursor-pointer" v-tooltip="{text: `${article.updateTime}`,openOnClick: true,}">
        <v-icon icon="mdi-calendar-clock"/>
        更新于{{ article.updateTime }}
      </span>
    </v-card-subtitle>
    <v-card-text class="text-start text-xl-body-1">
      {{ article.fragment }}
    </v-card-text>
  </v-card>
</template>
<style lang="css" scoped>

.article-arrow-expand {
  transition: color .3s ease-in-out;
}

.article-arrow-expand:hover {
  cursor: pointer;
  color: #00adb5;
}

.pushpin{
  transform: rotate(-15deg);
}

</style>
