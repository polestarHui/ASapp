<template>
  <div class="imageinfoContainer">
    <!-- 顶部 基础信息 -->
    <section class="top">
      <h3 class="tiitle">{{ this.imgInfo.title }}</h3>
      <p class="subinfo">
        <span class="author">发布者：{{ imgInfo.author }}</span>
        <span class="add_time">{{ imgInfo.add_time | dateFormat }}</span>
        <span class="click_count">阅读量：{{ imgInfo.click_count }}</span>
      </p>
    </section>
    <!-- 简介 -->
    <section class="abstract">
      <p></p>
    </section>
    <!-- 缩略图 -->
    <section class="thumbs">
      <!-- 安装vue-preview，使用方法 -->
      <!-- 1、cnpm i vue-preview -S -->
      <!-- 2、在main.js 中导入 import VuePreview from 'vue-preview' -->
      <!-- 3、挂载到vue身上 Vue.use(VuePreview) -->
      <!-- 4、在组件在的template模板中，使用它，标签名是vue-preview
                  其中：slides属性，是用于绑定具体的预览图片的数据，这个属性必须有 -->
      <!-- 5、在业务逻辑中，通过ajax请求，获取：slides需要的数据 -->
      <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
    </section>
    <!-- 评论区 -->
    <section class="cmt">
      <comment :id="this.imgId"></comment>
    </section>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subComponents/comment.vue";
export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imgInfo: {},
      thumbsList: []
    };
  },
  created() {
    this.getImgInfo();
    this.getthumbsInfo();
  },
  methods: {
    // 获取该组图片的基础信息
    getImgInfo() {
      this.$ajax({
        method: "get",
        url: "/images/imagesinfo",
        params: {
          imgid: this.imgId
        }
      }).then(response => {
        var data = response.data;
        // console.log(data)
        if (data.Status == 0) {
          this.imgInfo = data.Data[0];
        } else {
          Toast("请求数据失败");
        }
      });
    },
    // 获取图片的缩略图
    getthumbsInfo() {
      this.$ajax({
        method: "get",
        url: "/thumbs/" + this.imgId
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          data.Data.forEach(item => {
            (item.w = 600),
              (item.h = 400),
              (item.src = item.img_url),
              (item.msrc = item.img_url);
          });
          this.thumbsList = data.Data;
        } else {
          Toast("请求数据失败");
        }
      });
    }
  },
  components:{
      comment
  }
};
</script>
<style lang="less">
.imageinfoContainer {
  padding: 10px;
  .top {
    border-bottom: 1px solid #bbb;
    .title {
      font-size: 16px;
      font-family: "微软雅黑";
      color: #333;
      text-align: center;
    }
    .subinfo {
      padding: 0px 0;
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
  }
  .abstract {
    font-size: 14px;
    padding: 10px;
    color: #444;
    text-indent: 2em;
    line-height: 22px;
  }
  .thumbs {
    .imgPrev {
      .my-gallery {
        figure {
          display: inline-block;
          margin: 9px;
          img {
            width: 80px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>
