<template>
  <div class="swipeContainer">
    <mt-swipe :auto="speed">
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["swipeList","speed"]
};
</script>
<style lang="less">
.swipeContainer {
  .mint-swipe {
    height: 240px;
    background-color: #222;
  }
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
