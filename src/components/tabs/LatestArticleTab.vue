<script>
export default {
  name: 'LatestArticleTab',
  methods: {
    getAssetsFile(fileName){
      return new URL(`../../assets/article/${fileName}.jpg`,import.meta.url).href;
    }
  },
}
</script>

<template>
  <v-card class="pa-2" color="#121212cc">
    <v-card-item>
      <template #prepend>
        <v-icon icon="mdi-history"/>
      </template>
      <span class="v-card-title font-weight-bold ps-sm-2">最新文章</span>
    </v-card-item>
    <v-card-item class="pt-0">
      <v-divider/>
    </v-card-item>
    <v-card-item v-for="(index) in 4">
      <v-row
        class="article-row"
        justify="space-evenly"
      >
        <v-col class="article-col d-flex flex-row justify-center"
               cols="4" sm="4" md="3" lg="5" xl="5"
        >
          <div class="article-banner-parent overflow-hidden">
            <!--
                  @/assets/article/${index}.jpg
            -->
            <v-img
              class="article-banner"
              :src="getAssetsFile(`${index}`)"
              width="90"
              height="60"
              cover
            />
          </div>
        </v-col>
        <v-col class="pl-0 pl-sm-3 pl-md-3 pl-lg-0"
               cols="8" sm="8" md="9" lg="7" xl="7"
        >
          <v-card color="transparent"
                  elevation="0"
                  hover
          >
            <v-card-subtitle class="pa-0">
              # 如何使用消息队列如何使用消息队列如何使用消息队列如何使用消息队列
            </v-card-subtitle>
            <p class="text-overline">2001.01.01</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card-item>

  </v-card>
</template>

<style lang="css" scoped>


</style>
