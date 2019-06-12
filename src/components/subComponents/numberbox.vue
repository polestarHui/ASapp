<template>
  <div class="mui-numbox">
    <button
      class="mui-btn mui-btn-numbox-minus"
      type="button"
      @click="subtract"
      :disabled="subDis"
    >
      -
    </button>
    <input class="mui-input-numbox" type="number" :value="currentCount" />
    <button
      class="mui-btn mui-btn-numbox-plus"
      type="button"
      @click="plus"
      :disabled="plusDis"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  props: [
    "initCount", //初始值
    "min", //下限
    "max" //上限
  ],
  data() {
    return {
      currentCount: 1,
      subDis: true,
      plusDis: false
    };
  },
  created() {
    this.currentCount = this.initCount;
  },
  methods: {
    setDisable: function() {
      if (this.currentCount >= this.max) {
        this.plusDis = true;
        this.subDis = false;
      } else {
        if (this.currentCount <= this.min) {
          this.plusDis = false;
          this.subDis = true;
        } else {
          this.subDis = false;
          this.plusDis = false;
        }
      }
    },
    plus: function() {
      if (this.currentCount < this.max) {
        this.currentCount++;
      }
      // 设置 2 个按钮的disabled
      this.setDisable();
    },
    subtract: function() {
      if (this.currentCount > this.min) {
        this.currentCount--;
      }
      // 设置 2 个按钮的disabled
      this.setDisable();
    }
  },
    // 这里使用onchange来监听数量的变化是不妥的
    // 因为w3c规定的onchange事件有三个步骤，1、获得焦点 2、数据变化 3、失去焦点
    // 而这里，input标签压根就没有获得过焦点
    // 正确做法，使用watch来监听currentCount
    watch:{
        'currentCount':function(newValue,oldValue){
            // 1、数据发生变化，立即调用父组件传递过来的方法getCount，把currentCount传递给
            this.$emit("getCount",newValue);
        }
    }
};
</script>
<style lang="less">
</style>