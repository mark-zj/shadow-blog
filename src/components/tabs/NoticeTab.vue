<script>
export default {
  name: 'NoticeTab',
  data: () => ({
    noticeInfoLoading: false,
    noticeInfo: {
      content: null,
    },
  }),
  computed: {
    getNoticeInfoContent() {
      return this.noticeInfo.content == null ? '暂无' : this.noticeInfo.content;
    }
  },
  mounted() {
    this.getNoticeInfo();
  },
  methods: {
    getNoticeInfo() {
      this.noticeInfoLoading = true;
      setTimeout(() => {
        this.noticeInfoLoading = false;
        this.noticeInfo = {
          content: '欢迎来到 Shadow Blog ~',
        };
      }, 3000);
    }
  },
}
</script>

<template>
  <!-- public-transition 在主题切换时导致有速度有变化 -->
  <v-card
    class="pa-2"
    color="rgba(var(--v-theme-surface) , .8)"
    :loading="noticeInfoLoading">
    <template v-slot:loader="{isActive}">
      <v-progress-linear
        :active="isActive"
        color="primary"
        height="3"
        indeterminate
      />
    </template>
    <v-card-item>
      <template #prepend>
        <v-icon color="#FF0033" icon="mdi-bullhorn"/>
      </template>
      <span class="v-card-title font-weight-bold ps-sm-2">公告</span>
    </v-card-item>
    <v-card-item class="py-0">
      <v-divider class="border-opacity-50"/>
    </v-card-item>
    <v-card-subtitle class="py-3">
      {{ getNoticeInfoContent }}
    </v-card-subtitle>
  </v-card>
</template>

