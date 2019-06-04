<template>
  <div class="imagelistContainer">
    <ul
      class="imagelist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="100"
      style="max-height:100vh;overflow-y:auto;">
      <li v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h4 class="info_title">{{ item.title }}</h4>
          <p class="info_abstract">{{ item.abstract }}</p>
        </div>
      </li>
      <!-- 加载动画部分 -->
      <li class="more_loading">
        <mt-spinner type="fading-circle" v-show="is_loading_more"></mt-spinner>
        <span v-show="finished">已经加载全部信息</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      isLoading: false,
      is_loading_more: false, //控制是否显示加载动画图标
      finished: false, //控制是否显示已经加载所有数据
      pageindex: 1,
      pagesize: 3,
      list: []
    };
  },
  created() {},
  methods: {
    loadMore: function() {
      this.isLoading = true;
      // this.is_loading_more=true;
      // this.finished=false;
      this.$ajax({
        method: "get",
        url: "/images/imagelist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data);
            this.pageindex++;
            this.isLoading = false;
          } else {
            // 数据加载完了
            this.isLoading = true;
            this.is_loading_more = true;
          }
        } else {
          Toast("请求数据失败，服务端抽风了");
        }
      });
    }
  }
};
</script>
<style lang="less">
.imagelistContainer {
  .imagelist {
    list-style: none;
    padding: 10px;
    margin: 0;
    li {
      margin-bottom: 8px;
      position: relative;
      img {
        width: 100%;
        height: 260px;
        box-shadow: 0 2px 4px #999;
      }
      image[lazy="loading"] {
        width: 40px;
        height: 26px;
        margin: auto;
      }
      div.info {
        position: absolute;
        bottom: 0;
        padding: 5px;
        color: #eee;
        background-color: rgba(0, 0, 0, 0.4);
        .info_title {
          font-size: 14px;
        }
        .info_abstract {
          font-size: 12px;
          color: #eee;
        }
      }
    }
    li.more_loading {
      font-size: 12px;
      color: #aaa;
      text-align: center;
      border: none;
      .mint-spinner-fading-circle {
        position: relative;
        left: 45%;
      }
    }
  }
}
</style>