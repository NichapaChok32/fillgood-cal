<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      title: 'Double Calculator',
    }
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar {
  padding: 0 30px;
  background-color: #fff !important;
}
.v-main {
  background-color: #f7f7f7;
}
.container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}
.v-toolbar__title {
  color: #707070;
  font-size: 24px;
  line-height: 30px;
}
</style>
