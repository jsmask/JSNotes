## 常用代码

### express中路由简易使用

```javascript
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
    res.json({
        name: "mask"
    })
});
```

------

### mongoose简易使用&演示

1. 连接数据库

```javascript
const mogoose = require("mongoose");
const db = ""; //[mongo URL]:string
mogoose.connect(db)
    .then(() => {
        console.log('->数据库->连接成功');
    })
    .catch(err => {
        console.log('->数据库->连接失败 err:' + err);
    })
```

2. 创建数据模型演示

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    sex: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});
module.exports = User = mongoose.model("users", userSchema);
```

3. 查询与插入演示

```javascript
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/User");

// @route POST api/users/register
// @desc 请求注册
// @assess public
router.post("/register", (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    //查询数据
    User.findOne({
        username
    }).then(user => {
        if (user) {
            return res.json({status:0,msg:"该昵称已被使用"});
        } else {
            const newUser = new User({
                username,
                password
            });
            //利用bcrypt执行加密操作
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    //插入数据
                    newUser.save()
                        .then(user => {
                            res.json({status:1,msg:"注册成功"});
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    })
});
```

------

### webpack基础配置

1. 创建webpack.config.js文件
2. babel安装 -> npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
3. 解析vue文件安装 ->  npm install vue-loader vue-template-compiler --save-dev

```javascript
const path=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
 //入口：可以是字符串/数组/对象
 entry:'./src/main.js',
 //入口：通常是一个对象，至少保证有path和filename两个属性
 output:{
   path:path.resolve(__dirname,'dist'), //绝对路径
   filename:'bundle.js',
   publicPath:'dist/'
 },
//模块
 module:{
   rules:[
     {
      test: /\.js$/,
//排除一些应用模块
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    },
    {
       test:/\.css$/,
//css-loader只负责将css文件加载
//style-loader负责将样式添加到DOM中
//使用多个loader时，是从后往前执行
       use:['style-loader','css-loader']
    },
    {
        test:/\.(png|jpg|gif|jpeg)$/
        use:[{
            loader:'url-loader',
            options:{
//当加载的图片小于limit时，会将图片编译成base64字符串形式
//当加载的图片大于limit时，需要使用file-loader模块进行加载
                 limit:8192,
                 name:'img/[name].[hash:8].[ext]'
             }
             }]
    },
   {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              extractCSS: true
            }
          }
   ]
 },
    resolve: {
        alias: {
//配置vue运行解析模式
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    plugins: [
        new VueLoaderPlugin()
    ],
}
```

------

### Redux基本使用

1. 创建store目录
2. 在store目录下创建reducer.js

```javascript
const defaultState={
    list:['妙蛙种子','小火龙','杰尼龟']
}
export default (state = defaultState,action)=>{
    const newState=JSON.parse(JSON.stringify(state));
    if(action.type === "addListName"){
        newState.list.push(action.value)
        return newState;
    }
    return state
}
```

3. 在store目录创建index.js

```javascript
import {createStore} from 'redux'
import reducer from './reducer'
// 创建数据存储仓库
const store=createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //谷歌浏览器redux插件激活
);

export default store;
```

4. React中App.js为例

```react
import React,{Component} from 'react'
import 'antd/dist/antd.css';
import { Input,Button,List} from "antd"
import store from './store'

class App extends Component {
  constructor(props) {
    super(props)
    //store.getState()获取数据
    this.state = {
        list:store.getState().list, 
        name:""
    }
     //订阅接收数据
     store.subscribe(()=>{
       this.setState({
         list:store.getState().list
       })
     })
  }
    
  render() { 
    return (
        <div>
            <Input value={this.state.name} onChange={this.onChangeInput} />
            <Button onClick={this.onSubmit}>确定</Button>
            <List bordered size="small"
                dataSource={this.state.list}
                renderItem={(item,index)=>(<List.Item>{item}</List.Item>)}
                />
        </div>
     )
  }
    
  onSubmit = () =>{
    //派发数据
    store.dispatch({
      type:"addListName",
      value:this.state.name
    });
  }
  
  onChangeInput = e => {
    this.setState({ name:e.target.value });
  }
}
export default App;
```

------

### Vuex基本使用

1. store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const types = {
    SET_USER: "SET_USER"
}

const state = {
    user: null
};
const getters = {
    user: state => state.user
};
const mutations = {
    [types.SET_USER](state, user) {
        if (user) state.user = user;
        else state.user = null;
    }
};
//若存在异步须使用actions，若只是同步mutations也可直接使用
const actions = {
    setUser: ({ commit }, user) => {
        return new Promise((resolve,reject)=>{
            commit(types.SET_USER, user);
            resolve()
        };
    },
    clearLogin: ({ commit }) => {
        return new Promise((resolve,reject)=>{
        	commit(types.SET_USER, null);
            resolve()
        }
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
```

2. 使用

```javascript
this.$store
    .dispatch('setUser',{usernmae:"mask"})
    .then(()=>console.log('设置完成'));
this.$store
    .dispatch("clearLogin")
    .then(()=>console.log('退出登录'));
```

------

### vue.config.js配置

```javascript
module.exports = {
    // 基本路径
    //baseUrl: '/', cli 3.3已弃用
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: config => {
        // 第三方插件配置
        pluginOptions: {}
    },
    configureWebpack:{
        // 路径配置
        resolve: {
            //配置别名
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                network: '@/network',
                views: '@/views'
            }
        }
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            //配置跨域代理
            '/api': {
                target: "http://localhost:5000/api/",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        before: app => {}
    }
}
```

------

### next.config.js配置

```javascript
//详见：https://nextjs.frontendx.cn/docs
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

------

### Vue事件总线

```javascript
//在main.js中挂在在原型挂在一个全新的vue实例
Vue.prototype.$bus = new Vue()
```

```javascript
//子组件中发出事件
this.$bus.$emit("myOnLoad");
```

```javascript
//上级中执行监听
this.$bus.$on("myOnLoad",this.myEvent);
//上级中取消监听
this.$bus.$off("myOnLoad"this.myEvent);
```

------

### Vue插件封装

1. 介绍

```javascript
export default {
    install(Vue, options) {
        Vue.myGlobalMethod = function () {  // 1. 添加全局方法或属性，如:  vue-custom-element
            // 逻辑...
        }

        Vue.directive('my-directive', {  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
            bind (el, binding, vnode, oldVnode) {
                // 逻辑...
            }
        })
        
        // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
        Vue.mixin({
            created: function () {  
                // 逻辑...
            }
        })    
        
        // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
        Vue.prototype.$myMethod = function (options) {  
            // 逻辑...
        }
    }
}
```

2. 演示

- common/toast/Toast.vue

```vue
<template>
    <div v-show="isShow" class="toast">
        {{message}}    
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data() {
            return {
                message: "",
                isShow: false
            }
        },
        methods: {
            show(msg = "",duration = 2000) {
                this.isShow = true;
                this.message = msg;
                setTimeout(()=>{
                   this.isShow = false;
                   this.message = ""; 
                },duration)
            }
        },
    }
</script>

<style scoped>
.toast{
    background: rgba(0,0,0,0.7);
    position: fixed;
    color:#fff;
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 20px;
}
</style>
```

- common/toast/index.js

```javascript
import Toast from "./Toast.vue";

const obj = {};

obj.install = Vue => {
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.实例化组件
    const toast = new toastContrustor();
    //3.将组件手动挂载到元素上
    toast.$mount(document.createElement("div"));
    //4.将组件的对应元素添加到body中
    document.body.appendChild(toast.$el);
    //5.在Vue原型中声明组件
    Vue.prototype.$toast = toast;
}

export default obj;
```

- main.js

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import toast from './common/toast'

Vue.config.productionTip = false;

//安装组件
Vue.use(toast);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

------

### 网络模块封装

#### 案例:uni-app

1. 创建config.js

```javascript
const serverUrl = ""; //配置请求服务器路径

export default {
	serverUrl
}
```

2. 封装request.js

```javascript
import {
	serverUrl
} from "./config.js";

function sendRrquest({
	url,
	method,
	data,
	header
}) {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中'
		});
		uni.request({
			url,
			data,
			method,
			header,
			success: resolve,
			fail: reject,
			complete: () => {
				uni.hideLoading();
			}
		})
	});
};

function MyHttp(defaultParams, allRequest) {
	let resource = {};
	let header = {
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8;Authorization'
	}
	for (let key in allRequest) {
		let request = allRequest[key];
		resource[key] = (data) => {
			return sendRrquest({
				url: serverUrl + request.url,
				method: request.method,
				data,
				header
			})
		}
	}
	return resource;
}

export default MyHttp;
```

3. 创建api.js,配置其相关请求接口

```javascript
import MyHttp from './request.js';

 //配置接口
const allRequest = {
	getBannerList: {
		method: 'GET',
		url: 'index/carousel/list'
	},
}

const API = new MyHttp({}, allRequest);

module.exports = API;
```

------

#### 案例:element-ui+axios

1. 创建request.js

```javascript
import axios from 'axios'
import { Message, Loading } from 'element-ui';

const loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "加载中..",
        background: "rgba(0,0,0,.7)"
    })
}

function endLoading() {
    loading.close();
}

// ES6 Promise的封装
const request = options => {
        // 创建axios的实例对象
        const instance = axios.create({
            baseURL: '', //配置请求服务器路径
            timeout: 5000 //超时
        })
        
        // 过滤器(拦截器)接收
        instance.interceptors.request.use(options => {
            startLoading();
            return options;
        })    
        
        // 过滤器(拦截器)响应
        instance.interceptors.response.use(res => {
            endLoading();
            return res.data;
        },err=>{
            endLoading();
            Message.error("系统错误");
        })

        // 发送真正的网络请求
        return instance(options)
}

export default request;
```

2. 创建api.js,配置其相关请求接口

```javascript
import request from "./request";

export function getMultiData() {
  return request({
    url: '/home/banner',
    method: 'get'
  })
}

export function getProductData(type, page) {
  return request({
    url: '/home/list',
    method: 'post',
    params: {
      type,
      page
    }
  })
}
```

------

### FastClick的使用

- javascript

```javascript
if ('addEventListener' in document) {    
    document.addEventListener('DOMContentLoaded', function() {      
        FastClick.attach(document.body);    
    }, false);  
}
```

- jquery

```javascript
$(function() {
  FastClick.attach(document.body);
});
```

- Vue

```javascript
 import FastClick from 'fastclick'
 FastClick.attach(document.body);
```

------

### rem转换

```javascript
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 200 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

------

### 防抖&节流

1. 防抖

```javascript
function debounce(handler, delay) {
    var handler = handler || null;
    var delay = ~~delay || 1000;
    var timer = null;
    return function() {
        clearTimeout(timer)
        timer = setTimeout(function() {
            handler.apply(this, arguments);
        }.bind(this), delay)
    }
}
```

2. 节流

```javascript
function trottle(handler, delay) {
    var handler = handler || null;
    var delay = ~~delay || 1000;
    var last = 0;
    return function(e) {
        var now = +new Date();
        if(now - last > delay) {
            handler.apply(this, arguments);
            last = now;
        }
    }
}
```

------

### 浅拷贝

```javascript
Object.assign = Object.assign || function(){
    if(arguments.length == 0) throw new TypeError('Cannot convert undefined or null to object');

    var target = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        key
    args.forEach(function(item){
        for(key in item){
            item.hasOwnProperty(key) && ( target[key] = item[key] )
        }
    })
    return target
}
```

------

### 深度拷贝

```javascript
function deepClone(obj1, obj2) {
    var obj2 = obj2 || {};
    var toStr=Object.prototype.toString;
    var arrStr=toStr.call([]);
    for(var prop in obj1) {
        if(obj1.hasOwnProperty(prop)) {	
            if(obj1[prop]!==null&&typeof(obj1[prop])=="object"){
                obj2[prop]=toStr.call(obj1[prop])==arrStr?[]:{};
                deepClone(obj1[prop],obj2[prop]);
            }
            else{
                obj2[prop] = obj1[prop];
            }					
        }
    }
    return obj2;
}
```

------

### 对象是否为空

```javascript
function isEmpty(value) {
    return (
        value === undefined ||
        value === null ||
        (typeof value == "object" && Object.keys(value).length == 0) ||
        (typeof value == "string" && value.trim().length == 0)
    )
}
```

------

### 获取浏览器信息

```javascript
function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([d]+)/)[1])
    } : !!t.match(/trident/.+?rv:(([d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge/([d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox/([d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome/([d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version/([d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}
```

------

### 禁止键盘某些事件

```javascript
document.addEventListener('keydown', function(event){
    return !(
        112 == event.keyCode || //F1
        123 == event.keyCode || //F12
        event.ctrlKey && 82 == event.keyCode || //ctrl + R
        event.ctrlKey && 78 == event.keyCode || //ctrl + N
        event.shiftKey && 121 == event.keyCode || //shift + F10
        event.altKey && 115 == event.keyCode || //alt + F4
        "A" == event.srcElement.tagName && event.shiftKey //shift + 点击a标签
    ) || (event.returnValue = false)
});
```

------

### 禁止右键、选择、复制

```javascript
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
        return event.returnValue = false
    })
});
```

------

### 性能分析

```javascript
window.onload = function(){
    setTimeout(function(){
        let t = performance.timing
        console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
        console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
        console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
        console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
        console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
        console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
        console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

        if(t = performance.memory){
            console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
        }
    })
}
```

------

### 是否为PC浏览器

```javascript
function isPCBroswer() {
	let e = navigator.userAgent.toLowerCase()
		, t = "ipad" == e.match(/ipad/i)
		, i = "iphone" == e.match(/iphone/i)
		, r = "midp" == e.match(/midp/i)
		, n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
		, a = "ucweb" == e.match(/ucweb/i)
		, o = "android" == e.match(/android/i)
		, s = "windows ce" == e.match(/windows ce/i)
		, l = "windows mobile" == e.match(/windows mobile/i);
	return !(t || i || r || n || a || o || s || l)
}
```

------

### 时间格式化

```javascript
function dateFormater(formater, t){
	let date = t ? new Date(t) : new Date(),
		Y = date.getFullYear() + '',
		M = date.getMonth() + 1,
		D = date.getDate(),
		H = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
	return formater.replace(/YYYY|yyyy/g,Y)
		.replace(/YY|yy/g,Y.substr(2,2))
		.replace(/MM/g,(M<10?'0':'') + M)
		.replace(/DD/g,(D<10?'0':'') + D)
		.replace(/HH|hh/g,(H<10?'0':'') + H)
		.replace(/mm/g,(m<10?'0':'') + m)
		.replace(/ss/g,(s<10?'0':'') + s)
}
// dateFormater('YYYY-MM-DD HH:mm', t)
// 2019-08-05 09:45
```

------

### 获取URL参数

```javascript
function GetUrlParam(){
	let url = document.location.toString();
	let arrObj = url.split("?");
	let params = Object.create(null)
	if (arrObj.length > 1){
		arrObj = arrObj[1].split("&");
		arrObj.forEach(item=>{
			item = item.split("=");
			params[item[0]] = item[1]
		})
	}
	return params;
}
```

------

### 随机数获取

```javascript
function random(lower, upper){
	lower = +lower || 0
	upper = +upper || 0
	return Math.random() * (upper - lower) + lower;
}
```

------

### 上传图片

```javascript
document.querySelector("input[type=file]").onchange=e=>{
	let files = e.currentTarget.files;
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = e => {
        console.log(e.target.result);
    }
}
```

------

### 判断小数是否相等

```javascript
function epsEqu1(x,y) {  
  return Math.abs(x - y) < Math.pow(2, -52);
}
function epsEqu2(x,y) {  
  return Math.abs(x - y) < Number.EPSILON;
}
// 举例
0.1 + 0.2 === 0.3 // false
epsEqu1(0.1 + 0.2, 0.3) // true
epsEqu2(0.1 + 0.2, 0.3) // true
```

------

