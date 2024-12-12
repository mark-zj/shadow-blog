<script>
export default {
  name: 'TagTab',
  data: () => {
    return {
      tags: ['高精度', '算法', '操作系统', 'Heo', 'CSharp', 'sunclient', '依赖', 'OS', '合集', '安全', 'C++', '贡献', '个人项目', '云服务器', 'Windows', 'collection']
    }
  },
}
</script>

<template>
  <v-card class="pa-2" color="#121212cc">
    <v-card-item>
      <template #prepend>
        <v-icon icon="mdi-tag-multiple"/>
      </template>
      <span class="v-card-title font-weight-bold ps-sm-2">标签</span>
    </v-card-item>
    <v-card-item class="pt-0">
      <v-divider/>
    </v-card-item>
    <v-card-item class="pt-0">
      <v-chip-group column>
        <v-chip v-for="(item,index) in tags" :key="index"
                :text="item"
                class="mr-1 chip-tag"
                density="comfortable"
                label
        />
      </v-chip-group>
    </v-card-item>
  </v-card>
</template>

<style lang="css" scoped>

.chip-tag {
  transition: color .3s ease;
}

.chip-tag:hover {
  color: #00adb5;
}
</style>
