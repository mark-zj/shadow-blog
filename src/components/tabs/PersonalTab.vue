<script>
export default {
  name: 'PersonalTab',
  mounted() {
    this.getAvatar();
  },
  data:() =>({
    personalInfoLoading: false,
  }),
  methods: {
    getAvatar() {
      this.personalInfoLoading = true;
      setTimeout(() => {
        this.personalInfoLoading = false;
      }, 3000);
    }
  },
}
</script>

<template>
  <v-card color="transparent"
          elevation="0"
  >
    <v-card-item>
      <v-row class="py-3">
        <v-col class="text-center pa-0">
          <v-avatar
            size="70"
            border
          >
            <template v-slot:default>
              <!--
                @/assets/avatar.jpg
                `https://picsum.photos/seed/${Math.random()}/360/260?random=1`
              -->
              <v-img src="@/assets/avatar.jpg" referrerpolicy="origin">
                <template v-slot:placeholder>
                  <div class="w-100 h-100 d-inline-flex justify-center">
                    <v-progress-circular
                      class="align-self-center"
                      color="#00adb5"
                      indeterminate
                    />
                  </div>
                </template>
              </v-img>
            </template>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item class="pt-0">
      <v-row class="text-center">
        <v-col cols="12">
          <div class="v-card-title">Mark · ZJ</div>
          <div class="v-card-subtitle">Day Day Up!</div>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-row class="font-weight-bold text-subtitle-1">
            <v-col class="px-0">文 章</v-col>
            <v-col class="px-0">分 类</v-col>
            <v-col class="px-0">标 签</v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="pt-1">
          <v-row class="font-weight-bold text-subtitle-2">
            <v-col class="px-0">1111</v-col>
            <v-col class="px-0">20</v-col>
            <v-col class="px-0">100</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item>
      <v-divider
        class="border-opacity-75"
        :thickness="2"
        color="white"
      />
    </v-card-item>
    <v-card-item>
      <div class="d-flex justify-center align-center gc-14 flex-wrap-reverse">
        <v-icon icon="mdi-github" size="30"/>
        <v-icon icon="mdi-qqchat" size="30"/>
        <v-icon icon="mdi-wechat" size="30"/>
      </div>
    </v-card-item>
    <v-card-item>
      <v-btn text="关于我"
             color="#00adb5"
             variant="outlined"
             block
      />
    </v-card-item>
  </v-card>
</template>

