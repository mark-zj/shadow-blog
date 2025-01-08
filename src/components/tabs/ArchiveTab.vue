<script>
export default {
  name: 'ArchiveTab'
}
</script>

<template>
  <v-card class="pa-2" color="rgba(var(--v-theme-surface) , .8)">
    <v-card-item>
      <template #prepend>
        <v-icon icon="mdi-zip-box"/>
      </template>
      <span class="v-card-title font-weight-bold ps-sm-2">归档</span>
    </v-card-item>
    <v-card-subtitle>
      <v-divider/>
    </v-card-subtitle>
    <v-card-item>
      <v-list
        class="pa-0"
        bg-color="transparent"
        variant="tonal"
        nav
        slim
        lines>
        <v-list-item
          v-for="(index) in 5"
          :key="`archive-${index}`"
          :title="'2024年1月' + index + '日'"
          :subtitle="index + '篇文章'"
          class="zip-nav-hover"
          color="transparent"
          link>
          <template v-slot:append>
            <v-icon icon="mdi-arrow-right" size="20"/>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>


<style lang="css" scoped>
.zip-nav-hover > .v-list-item__append > .v-icon {
  transition: color .3s ease-in-out;
}

.zip-nav-hover:hover > .v-list-item__append > .v-icon {
  color: rgb(var(--v-theme-primary));
}
</style>
