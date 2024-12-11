<script>
export default {
  name: 'LatestArticleTab'
}
</script>

<template>
  <v-card class="pa-2" color="#121212cc">
    <v-card-title class="font-weight-bold">
      <v-icon color="#eeeeee" icon="mdi-history"/>
      最新文章
    </v-card-title>
    <v-card-subtitle class="pb-5">
      <v-divider/>
    </v-card-subtitle>

    <v-row
      class="article-row"
      justify="space-evenly"
      v-for="(index) in 4"
    >
      <v-col class="article-col d-flex flex-row justify-center"
             cols="4" sm="4" md="12" lg="5" xl="5"
      >
        <div class="article-banner-parent overflow-hidden">
          <v-img
            class="article-banner"
            :src="'./src/assets/article/' + index + '.jpg'"
            width="90"
            height="60"
            cover
          />
        </div>
      </v-col>
      <v-col class="pl-0 pl-sm-3 pl-md-3 pl-lg-0"
             cols="8" sm="8" md="12" lg="7" xl="7"
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
  </v-card>
</template>

<style lang="css" scoped>



</style>
