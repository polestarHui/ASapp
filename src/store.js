 // 使用vuex的步骤
 // 1、安装cnpm i vuex -S
 // 2、导入 import Vuex from 'vuex'
 // 3、注册到vue身上，Vue.use(Vuex)
 // 4、创建仓储对象 const store = new Vuex.Store({})
 // 5、把仓储对象挂载到 VM 对象身上

 import Vue from 'vue'
 import Vuex from 'vuex'
 Vue.use(Vuex);
 const store = new Vuex.Store({
     state: { //this.$store.state.xxx
         cart: [],
     },
     mutations: { //调用方法：this.$store.commit('方法名')
         //  mutations里定义的方法，至少有一个参数叫state，他就是store中的state成员，而且这个参数必须放在参数列表的第一位
         // 如果该方法需要有自己的参数，那么这个参数只能放在第二位
         // mutations里定义的方法，最多只能放两个参数
         addToCart(state, goods) {
             // 点击添加入购物车的代码逻辑
             // 1、如果购物车中没有该商品，就直接push进去
             // 2、如果购物车中已经有了该商品，那么只需要修改这个商品的数量
             var flag = false;
             state.cart.some(item => {
                 if (goods.id == item.id) {
                     item.count += parseInt(goods.count);
                     flag = true; //表示找到相同项
                     return true;
                 }
             })
             if (!flag) {
                 state.cart.push(goods);
             }
         },
     },
     getters: { //访问方式：this.$store.getters.getTotalCount
         //  获取仓储中cart的所有商品数量的总和
         getTotalCount(state) {
             var total = 0;
             state.cart.forEach(item => {
                 total += item.count;
             });
             return total;
         }
     }
 })
 export default store