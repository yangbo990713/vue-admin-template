<template>
  <div class="dashboard-container">
    <table />
    <div class="welcome-message">欢迎您登录本系统！</div>
    <div class="user-info">
      <span>当前操作人：{{ name }}</span>
      <span>当前时间：{{ currentTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      currentTime: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.currentTime = new Date().toLocaleString()
    setInterval(() => {
      this.currentTime = new Date().toLocaleString()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 100%;
    position: relative;
    .welcome-message{
      text-align: center;
      margin: 100px 60px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 30px;
      background-color: #f5f5f5;
    }
    .user-info{
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #fff;
      span+span{
        margin-left: 15px;
      }
    }
  }
}
</style>
