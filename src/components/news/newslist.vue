<template>
    <div class="newslistContainer">
        <!-- 使用mint-ui提供的 infinite scroll 实现上滑加载第二页数据 -->
        <!-- v-infinite-scroll="loadMore" 此属性用来设置ajax请求数据的方法 -->
        <!--  infinite-scroll-disabled="loading" 此属性用来设置该组件是否继续相应上滑请求的动作，该属性是一个bool类型值，TRUE表示已经加载所有数据  -->
        <!--  infinite-scroll-distance 此属性用来设置当组件距离底部为多远的时候，就发出loadmore事件 -->
        <ul class="newslist"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isLoading"
            infinite-scroll-distance="100"
            style="max-height:100vh;overflow-y:auto;">
            <li v-for="item in list" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <p class="news_title">{{item.title}}</p>
                <p class="news_des">
                    <span class="author">{{item.author}}</span>
                    <span class="add_time">{{item.add_time| dateFormat}}</span>
                    <span class="click_time">阅读：{{item.click_count}}</span>
                </p>
                </router-link>
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

export default {
    name:"newslist",
    data(){
        return{
            list:[],//新闻列表
            isLoading:false,//默认是要响应上滑动作的
            pageindex:1,
            pagesize:10,
            is_loading_more:false,//控制是否显示加载动画图标
            finished:false,//控制是否显示已经加载所有数据
        }
    },
    created() {
        // this.loadMore()
    },
    methods:{
        loadMore:function(){
            this.isLoading=true;
            this.is_loading_more=true;
            this.finished=false;
            this.$ajax({
                method:'get',
                url:'/news/newslist',
                params:{
                    pageindex:this.pageindex,
                    pagesize:this.pagesize
                }
            })
            .then(response=>{
               var data=response.data;
                if(data.Status==0){
                    data.Data.forEach(item=>{
                        item.add_time=new Date();
                    });

                    this.list=this.list.concat(data.Data);//拼接2个数组，不能直接赋值
                    this.pageindex++;
                    this.isLoading=false;//允许在响应上滑的动作
                    this.is_loading_more=false;
                    if(data.Data.length<this.pagesize){//此次请求的数据已经是最后一页
                        this.isLoading=true;
                        this.finished=true;
                    } 
                }else{
                    this.finished=true;
                }
            })
        }
    }
}
</script>
<style lang="less">
    .newslistContainer{
        .newslist{
            list-style: none;
            padding: 0 16px;
            li{
                border-bottom: 1px  solid #ddd;
                padding: 10px 0;
                p{
                     margin: 0;
                }
                p.news_title{
                    font-size: 6px;
                    color: #333;
                }
                p.news_des{
                    font-size: 12px;
                    color:#aaa;
                    padding-top: 5px;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .more_loading{
                font-size: 12px;
                color: #aaa;
                text-align: center;
                border:none;
                .mint-spinner-fading-circle{
                    position: relative;
                    left: 45%;
                }
            }
        }
    }
</style>
