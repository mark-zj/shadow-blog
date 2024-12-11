<script>
export default {
  name: 'ArchiveTab'
}
</script>

<template>
  <v-card class="pa-2" color="#121212cc">
    <v-card-title class="font-weight-bold">
      <v-icon icon="mdi-zip-box"/>
      归档
    </v-card-title>
    <v-card-subtitle>
      <v-divider/>
    </v-card-subtitle>
    <v-card-item>
      <v-list class="pa-0"
              bg-color="transparent"
              nav
      >
        <v-list-item v-for="(index) in 5" :key="index"
                     :title="'2024年1月' + index + '日'"
                     :subtitle="index + '篇文章'"
                     class="zip-nav-hover"
                     color="transparent"
                     variant="tonal"
                     slim
                     link
                     lines
        >
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
  color: #00adb5;
}
</style>
