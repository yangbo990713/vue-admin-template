<template>
  <section class="app-main">
    <!--<video id="v1" autoplay loop muted>
      <source src="../../../src/assets/sao_hr01.mp4" type="video/mp4">
    </video>-->
    <transition mode="out-in" name="fade-transform">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /*background-image: url(../../../src/assets/image/preview.jpg);*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
  /*background-position-y: 30%;*/
}
#v1{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  min-height: 100%;
  min-width: 100%;
}
source{
  height: 100%;
  width: 100%;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
