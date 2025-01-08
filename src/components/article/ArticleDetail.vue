<script>
export default {
  name: 'ArticleDetail'
}
</script>

<template>
  <v-card color="#121212cc">
    <div v-for="(index) in 50" :key="index">
      {{ index }}
    </div>
  </v-card>
</template>

