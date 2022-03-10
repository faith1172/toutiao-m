<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 底部标签导航栏 -->
    <van-tabbar class="layout-tabbar"
                v-model="active"
                route>
      <van-tabbar-item to="/">
        <i slot="icon"
           class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon"
           class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon"
           class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon"
           class="iconfont icon-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
      color: #666;
    }
  }
}
</style>
