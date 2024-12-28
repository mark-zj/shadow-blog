<script>
export default {
  name: 'WebsiteInformationTab'
}
</script>

<template>
  <v-card class="pa-2" color="rgba(var(--v-theme-surface) , .8)">
    <v-card-item>
      <template #prepend>
        <v-icon color="#33CC99" icon="mdi-bulletin-board"/>
      </template>
      <span class="v-card-title font-weight-bold ps-sm-2">网站信息</span>
    </v-card-item>
    <v-card-item class="pt-0">
      <v-divider/>
    </v-card-item>
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

