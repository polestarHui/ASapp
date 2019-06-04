<template>
    <div class="homeContainer">
        <!-- 这是轮播图区域 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.img_url" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link to="/home/newslist">
		                   <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">安师新闻</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link to="/home/imageslist">
		                    <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">光影安师</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">安师商城</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">记录安师</div>
                        </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
		                    <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">一卡通</div>
                        </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">校园社团</div>
                        </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
		                    <img src="../../images/menu7.png" alt="">
		                    <div class="mui-media-body">户外出行</div>
                        </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
		                    <img src="../../images/menu8.png" alt="">
		                    <div class="mui-media-body">休闲娱乐</div>
                        </a></li>
		           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                       <a href="#">
		                    <img src="../../images/menu9.png" alt="">
		                    <div class="mui-media-body">考研交流</div>
                        </a></li>
		        </ul> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            swipeList:[]
        }
    },
    created(){
        this.getSwipeData()
    },
    methods:{
        getSwipeData(){
            // 使用axios发出AJAX请求
            // 1、npm i axios -S
            // 2、import 导入axios
            // 3、把axios对象，挂载到vue.prototype身上，因为它不支持vue.use()使用
            // this.$ajax({}).then(function(){})
            // this.$ajax.get(url).then()
            // this.$ajax.post(url).then()
            this.$ajax({
                method:'get',
                url:'/sliderlist'
            })
            .then(response=>{
                // console.log(response)
                var data = response.data;
                if(data.Status==0){//正确响应，，并发回了数据
                    this.swipeList=data.Data;
                }else{
                    Totast('无法加载轮播图数据')
                }
            })
        }
    }
}
</script>
<style lang="less">
    .homeContainer{
        .mint-swipe{
            height: 240px;
            background-color: #222;
        }
        .mint-swipe-item{
            img{
                 width: 100%;
                 height: 100%;
            }
        }
        .mui-table-view-cell img{
            width:3rem;
        }
    }
</style>


