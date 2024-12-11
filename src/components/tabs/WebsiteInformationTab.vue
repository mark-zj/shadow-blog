<script>
export default {
  name: 'WebsiteInformationTab'
}
</script>

<template>
  <v-card class="pa-2 pa-md-1" color="#121212cc">
    <v-card-title class="font-weight-bold">
      <v-icon color="#33CC99">mdi-bulletin-board</v-icon>
      网站信息
    </v-card-title>
    <v-card-subtitle>
      <v-divider/>
    </v-card-subtitle>
    <v-card-item class="text-md-subtitle-2" prepend-icon="mdi-run">
      <div class="d-flex justify-space-between">
        <div class="w-40">运行天数</div>
        <div class="w-60 text-right">
          312<span>天</span> 12时 20分
        </div>
      </div>
    </v-card-item>
    <v-card-item class="text-md-subtitle-2" prepend-icon="mdi-text-box-outline">
      <div class="d-flex justify-space-between">
        <div class="w-40">总文章数</div>
        <div class="w-60 text-right">
          1<span>篇</span>
        </div>
      </div>
    </v-card-item>
    <v-card-item class="text-md-subtitle-2" prepend-icon="mdi-harddisk">
      <div class="d-flex justify-space-between ">
        <div class="w-40">磁盘情况</div>
        <div class="w-60 text-right">
          1<span>GB</span> / 200GB
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

