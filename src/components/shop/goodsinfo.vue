<template>
    <div class="goodsinfoContainer">
        <!-- 轮播图区域 -->
        <!-- 1、导入轮播图组件 import -->
        <!-- 2、挂载到父组件的components身上 -->
        <!-- 3、以标签的形式，插入到模板结构内 -->
        <swipe :speed="3000" :swipeList="swipeList"></swipe>
        <!-- 商品信息区域 -->
        <div class="goodsInfo">
            <p class="price">
                <span class="sellPrice">
                    <span>￥</span>
                {{this.goodsInfo.sell_price}}
                </span>
                <span class="marketPrice">
                    <label class="lb">商场价：</label>
                    {{this.goodsInfo.market_price}}
                    </span>
            </p>
            <p class="title">{{goodsInfo.title}}</p>
            <p class="abstract">{{goodsInfo.abstract}}</p>
            <p class="add_time">
                <label class="lb">发布时间：</label>
                {{goodsInfo.add_time|dateFormat}}</p>
            <p class="stock">
                <span>
                    <label class="lb">库存：</label>
                    {{goodsInfo.stock}}
                </span>
                <span>
                    <label class="lb">关注度：</label>
                    {{goodsInfo.click_count}}
                </span>
            </p>
           <p class="count">
               <label class="lb">购买数量：</label>
               <!-- 1、导入numberbox组件 -->
               <!-- 2、 -->
               <numberbox :max="goodsInfo.stock" :min="1" :initCount="1" @getCount="getGoodsCount"></numberbox>
           </p>
           <p>
               <button type="button" class="mui-btn mui-btn-warning" @click="addToCart">
					加入购物车
				</button>
				<button type="button" class="mui-btn mui-btn-danger">
					立即购买
				</button>
           </p>
        </div>
        <!-- 卖家信息区域 -->
        <div class="sellerInfo">
            <h3>卖家信息</h3>
            <p class="seller">
                <label class="lb">卖家:</label>{{goodsInfo.seller}}
            </p>
            <p class="seller_phone">
                <label class="lb">电话:</label>{{goodsInfo.seller_phone}}
            </p>
        </div>
        <!-- 商品详情图片区域 -->
        <div class="imgInfo">
            <ul>
                <li v-for="item in swipeList" :key="item.id">
                    <img :src="item.img_url" >
                </li>
            </ul>
        </div>
        <!-- 评论区域 -->
        <comment :id="goodsId"></comment>
    </div>
</template>
<script>
import numberbox from '../../components/subComponents/numberbox.vue'
import comment from '../../components/subComponents/comment.vue'
import {Toast} from 'mint-ui'
import swipe from '../../components/subComponents/swipe.vue'
export default {
    data(){
        return{
            swipeList:[],//商品轮播图数据
            goodsId:this.$route.params.id,
            goodsInfo:{},
            goodsCount:1,
        }
    },
    created() {
        this.getSwipeData();
        this.getGoodsInfo();
        // this.getGoodsCount();
    },
    methods:{
        // 获取了轮播图数据
        getSwipeData(){
            this.$ajax({
                method:'get',
                url:'/thumbs/'+this.goodsId,
            })
            .then(response=>{
                var data=response.data;
                if(data.Status==0){
                    this.swipeList=data.Data;
                }else{
                    Toast('服务器没有访问到数据')
                }
            })
        },
        getGoodsInfo(){
            this.$ajax({
                method:'get',
                url:'/goods/goodsinfo',
                params:{
                    goodsid:this.goodsId,
                }
            }).then(response=>{
                var data=response.data;
                if(data.Status==0){
                    this.goodsInfo=data.Data[0];
                }else{
                    Toast('无法获取商品数据')
                }
            })
        },
        addToCart(){
            // 子组件向父组件传值
            // 1、父组件通过事件机制，给予组件一个带参数的方法
            // 2、在子组件内部，找合适的时机，调用该方法，把想传给父组件的数据传递过来
            var goods = {
                id:this.goodsId,
                img_url:this.goodsInfo.img_url,
                title:this.goodsInfo.title,
                price:this.goodsInfo.sell_price,
                count:this.goodsCount
            }
            // this.$store.state.cart
            // 应该调用仓储对象mutations里提供的方法,来间接处理state中的数据成员
            this.$store.commit('addToCart',goods);
        },
        getGoodsCount(count){
            this.goodsCount=count;
        }
    },
    components:{
        swipe,
        numberbox,
        comment,
    }
}
</script>

<style lang="less">
    .goodsinfoContainer{
        padding: 8px;
        .goodsInfo{
            padding: 5px;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 10px;
            p{
                font-size: 14px;
                line-height: 16px;
                color: #333;
                margin: 20px;
                label.lb{
                    color: #999;
                    margin-right: 20px;
                }
            }
            .price{
                
                .sellPrice{
                    color: #ce0000;
                font-size: 28px;
                font-weight: bold;
                span{
                    font-size: 12px;
                }
                }
                .marketPrice{
                    // font-size: 14px;
                    text-decoration: line-through;
                    .lb{
                        margin: 0;
                    }
                }
            }
            .title{
                font-size: 16px;
                font-weight: bold;
            }
            .abstract{
                font-size: 15px;
                line-height: 20px;
            }
            .stock{
                span{
                    margin-right: 20px;
                }
            }
        }
        .sellerInfo{
            background-color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            margin-bottom: 10px;
            h3{
                font-size: 16px;
                color: #999;
                margin-bottom: 20px;
            }
            p{
                color: #333;
                label.lb{
                    color: #999;
                    margin-right: 20px;
                }
            }
        }
        .imgInfo{
            background-color: #fff;
            border-radius: 5px;
            ul{
                list-style: none;
                padding: 0;
                margin: 0;
                li{
                    width: 100%;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>