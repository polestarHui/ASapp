import Vue from 'vue'; //导入vue

import app from './app.vue' //导入app.vue

// 导入mui的样式包
import './lib/mui/css/mui.css'
// 导入mui的扩展图标的样式文件
import './lib/mui/css/icons-extra.css'
// 导入路由vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 导入路由模块
import router from './router.js'

// 导入mint-ui
import MintUi from 'mint-ui'
// 导入mint-ui的样式
import 'mint-ui/lib/style.min.css'
// 把mint-ui挂载到vue身上
Vue.use(MintUi)

// 导入axios
import axios from 'axios'
// 配置请求的域名
axios.defaults.baseURL = 'http://www.barteam.cn:8086'
Vue.prototype.$ajax = axios

// 导入moment组件
import Moment from 'moment'
// 这是日期格式化的过滤器
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY--MM--DD HH:MM") {
    return Moment(dateStr).format(pattern)
})

// 导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})