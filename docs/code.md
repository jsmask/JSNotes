# 代码篇

## express中路由简易使用

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

## mongoose简易使用&演示

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

____

## webpack 基础配置

```javascript
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { HotModuleReplacementPlugin } = webpack;

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  // mode:"production",
  // mode:"development",
  entry: {
    index: "./src/index.js",
    // another: "@babel/polyfill"
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "main.js",
    // publicPath: ''
  },
  devServer: {
    contentBase: "./build",
    open: true,
    hot: true,
    hotOnly: true,
    port: 8081,
    proxy: {
      "/api": {
        target: ""
      }
    }
  },
  // devtool:"cheap-module-eval-source-map",// 开发环境配置
  // devtool:"cheap-module-source-map",   // 线上生成配置
  // devtool: devMode ? "source-map" : "none",
  // devtool:"eval",
  devtool: devMode ? "cheap-module-eval-source-map" : "none",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  chrome: 53,
                  browsers: [
                    "last 2 versions",
                    "safari 7",
                    "android >= 4.0",
                    "not ie <= 8"
                  ]
                },
                useBuiltIns: "usage",
                corejs: 2
              }
            ]]
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "[name].[hash:8].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //    hmr: false,
            //    publicPath: '../../'
            // }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  "overrideBrowserslist": [
                    "> 1%",
                    "last 7 versions",
                    "not ie <= 8",
                    "ios >= 8",
                    "android >= 4.0"
                  ]
                }),
                require('postcss-pxtorem')({
                  rootValue: 100,
                  propWhiteList: ["*"],
                  selectorBlackList: [".vux-", ".weui-", ".mt-", ".mint-", ".dp-", ".ig-"]
                })
              ]
            }
          }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "DEMO",
      filename: "index.html",
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash:8].css"
    }),
    new HotModuleReplacementPlugin(),
  ],
  optimization: {
    //在package:json 需配置 "sideEffects": false
    usedExports: true
  }
}

```

____

## webpack 多页打包

+ 基本

```javascript
const filenames = fs.readdirSync('./src').filter(item => /\.html$/ig.test(item)).map(item => item.replace(/\.html$/ig, ''))
const obj = {}
filenames.map(item => {
    obj[item] = `./src/js/${item}.js`
})

// ...

module.exports = {
    /.../
    entry: {
        rem: './src/js/rem.js',
        common: './src/js/common.js',
        ...obj,
    },
    /.../
    plugins: [
        ...filenames.map(item => {
            return new HtmlWebpackPlugin({
                template: `./src/${item}.html`,
                filename: `${item}.html`,
                chunks: ['rem', 'common', item]
            })
        })
    ]
}
```

+ 完整

```javascript
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// 显示进程的完成进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// 设置进度字体颜色
const chalk = require('chalk');
// 清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');


const isProduction = process.env.npm_lifecycle_event !== 'dev'
const plugins = []
console.log(process.env.npm_lifecycle_event)
if (isProduction) {
    plugins.push(
        new CleanWebpackPlugin()
    )
}


const filenames = fs.readdirSync('./src').filter(item => /\.html$/ig.test(item)).map(item => item.replace(/\.html$/ig, ''))
console.log(filenames)
const obj = {}
filenames.map(item => {
    obj[item] = `./src/js/${item}.js`
})


module.exports = {
    mode: isProduction ? 'production' : 'development',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            name: (module, chunks, cacheGroupKey) => {
                // console.log('-----', module, chunks, cacheGroupKey,'-----')
                return 'v_commons'
            },
            // 分割代码块（多页应用才会用到）
            cacheGroups: {
                //缓存组
                common: {
                    // 公共的模块
                    chunks: "initial", // 从开始处抽离，有多种配置，像异步模块什么的
                    minSize: 0, // 最小大小
                    minChunks: 2 //  引用次数
                },
                vendor: {  // 此处为了抽离第三方的公共模块，比如jquery（前提是index和other都引入jquery了）
                    priority: 1,  //权重， 如果不给这个字段，那么就此例来说，会先走上边的“common”，会把jquery和a.js，b.js合并在一个文件中。
                    //如果还有别的入口只使用jquery了，但是a和b对于它来说就是无用的。加上权重之后，会将第三方模块单独抽离
                    test: /node_modules/,
                    minSize: 0,
                    chunks: "initial",
                    minChunks: 2,
                }
            }
        }
    },
    entry: {
        rem: './src/js/rem.js',
        common: './src/js/common.js',
        ...obj,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true,
        hotOnly: true,
        open: false,
        noInfo: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(less)$/,
                use: [
                    isProduction ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    } : 'style-loader',
                    'css-loader', 'postcss-loader', 'less-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1000,
                    name: 'images/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.npm_lifecycle_event)
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/public', to: './public' },
            ],
        }),
        new UglifyJsPlugin({
            test: /\.js$/,
            include: /\/js/,
            exclude: [/node_modules/]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            path: '../'
        }),
        ...filenames.map(item => {
            return new HtmlWebpackPlugin({
                template: `./src/${item}.html`,
                filename: `${item}.html`,
                chunks: ['rem', 'common', item]
            })
        }),
        // require('autoprefixer'),
        ...plugins,
        new ProgressBarPlugin({
            format: chalk.green('Progressing') + '[:bar]' + chalk.green(':percent') + '(:elapsed seconds)',
            clear: false
        }),
    ]
}
```



___

## webpack vue配置

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
   //publicPath:'dist/'
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
          //babel<7用es2015，babel>=7使用@babel/preset-env
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
        test:/\.(png|gif|jpe?g)$/,
        use:{
            loader:'url-loader',
            options:{
//当加载的图片小于limit时，会将图片编译成base64字符串形式
//当加载的图片大于limit时，需要使用file-loader模块进行加载
                 limit:8192,
                 name:'img/[name].[hash:8].[ext]'
             }
         }
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

## React懒加载组件

```javascript
import React, { lazy } from 'react';
const getLazyComponent = (path)=> ( lazy(()=> import(`../${path}`) ) );
const App = getLazyComponent('App');
```

___

## React包装图标

```javascript
import React from 'react';
import * as icons from '@ant-design/icons';
/**
 * props
 * iconName <String>   ant-design 中图标的名字
 * */
function AntIcons(props) {
    if(!props.iconName) return <></>;
    
    const icon = icons[props.iconName];
    return React.createElement( icon );
}

export default AntIcons;
```

___

## Redux基本使用

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

## Vuex基本使用

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
// 若存在异步须使用actions($store.dispatch)，
// 若只是同步mutations也可($store.commit)
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

## vue.config.js配置

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

## next.config.js配置

```javascript
//详见：https://nextjs.frontendx.cn/docs
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

------

## Vue事件总线

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
this.$bus.$off("myOnLoad",this.myEvent);
```

------

## Vue插件封装

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

## 网络模块封装

### 案例:uni-app

1. 创建config.js

```javascript
const serverUrl = ""; //配置请求服务器路径

module.exports = {
    serverUrl
}
```

2. 封装request.js

```javascript
import {
	serverUrl
} from "./config.js";

function sendRequest({
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
			success: res => resolve(res.data),
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
            data = Object.assign({},defaultParams,data);
			return sendRequest({
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

### 案例:element-ui+axios

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

## FastClick的使用

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

## rem转换

+ 方案1

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

+ 方案2

```javascript
(function () {
    var html = document.documentElement;
    function onWindowResize() {
        var head, viewport
        /(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent) && (
            head = document.getElementsByTagName('head'), viewport = document.createElement('meta'), viewport.name = 'viewport', viewport.content = 'target-densitydpi=device-dpi, width=480px, user-scalable=no', head.length > 0 && head[head.length - 1].appendChild(viewport)
        );
        if (html.getBoundingClientRect().width >= 1024) {
            html.style.fontSize = 16 + 'px';
            return
        }
        html.style.fontSize = html.getBoundingClientRect().width / 3.75 + 'px';
        // console.log(html.getBoundingClientRect().width)
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();
```

___

## 防抖&节流

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

## 浅拷贝

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

## 深度拷贝

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

## 对象是否为空

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

## 获取浏览器信息

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

## 禁止键盘某些事件

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

## 禁止右键、选择、复制

```javascript
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
        return event.returnValue = false
    })
});
```

------

## 性能分析

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

## 是否为PC浏览器

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

## 时间格式化

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

## 获取URL参数

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

## 随机数获取

```javascript
function random(lower, upper){
	lower = +lower || 0
	upper = +upper || 0
	return Math.random() * (upper - lower) + lower;
}
```

------

## 上传图片

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

## 判断小数是否相等

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

_____

## 精确小数 

```javascript
// es6
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;

// es5
function RoundNum(num, decimal){
    return Math.round(num * Math.pow(10,decimal)) / Math.pow(10,decimal);
}

```

------

## requestAnimFrame 兼容

```javascript
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback,element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
```

___

## 动态创建script标签

```javascript
function loadScript(url, func) {
    var head = document.head || document.getElementByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            func();
            script.onload = script.onreadystatechange = null;
        }
    };
    head.appendChild(script);
}
```

____

## debugger反调试

```javascript
// 法1：
(function anonymous() {debugger})
// 法2：
(function() {
    var a = new Date(); 
    debugger;
    return new Date() - a > 100;
}())
```

___

## Base64转Blob

```javascript
function dataUrlToBlob(dataUrl) {
	var arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
```

___

## 复制文本

```javascript
function copyText(str) {
    var input = document.createElement("input");
    var body = document.querySelector("body");
    body.append(input);
    input.value = str
    input.select();
    document.execCommand("copy");
    input.remove();
}
```

___

## 数组打乱顺序

```javascript
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
```

___

## 匹配简写

```javascript
export const simplifiedChinesePatt = /^[\u4E00-\u9FA5]+$/;
```

___

## 千位分隔

```javascript
function separationThousandFilters (value) {
    // 首先确定不是脏数据
    if (value === null || value === undefined || value === '') return ''
    // 之后将数据转为字符串
    value = value.toString()
    const hasPercent = value.indexOf('%') !== -1 // 是否有百分号
    const transNum =  num => num.replace(/\B(?=(\d{3})+\b)/g, ',');
    // 判断是否是否可以转成数字也就是判断是否是脏数据
    if (isNaN(value) && !hasPercent) return value
    const hasPoint = value.indexOf('.') !== -1  // 是否有小数点
    // 既不带小数点 也不带百分号
    if (!hasPoint && !hasPercent) {
        return transNum(value) + '.00'
        // 不带小数点 带百分号
    } else if (!hasPoint && hasPercent) {
        return transNum(value.split('%')[0]) + '%'
        // 带小数点 不带百分号
    } else if (hasPoint && !hasPercent) {
        return transNum(value.split('.')[0]) + '.' + value.split('.')[1]
    } else {
        // 既带小数点 也带百分号
        return value.replace(/(\d+)\.(\d+)%/, function (a, b, c, d) {
            if (c.length === 1) {
                return transNum(b) + '.' + c + '0' + '%'
            } else {
                return transNum(b) + '.' + c + '%'
            }
        })
    }
}
// 12345678 -> "12,345,678.00"
```

___

## 全屏模式

```javascript
/**
 * screenChange <Function> 为窗口变化的 的回调函数  参数为当前是否为全屏状态
 */
const init = (screenChange)=>{

    // 取值17是为了处理页面内容出现滚动条的情况
    let isFull = window.screen.height - window.document.documentElement.clientHeight <= 17;
    
    // 阻止F11键默认事件，用HTML5全屏API代替
    window.addEventListener('keydown', function (e) {
        e = e || window.event;
        if (e.keyCode===122 && !isFull) {
            e.preventDefault();
            enterFullScreen();
        }
    });
    //监听窗口变化
    window.onresize = function () {
        isFull = window.screen.height - window.document.documentElement.clientHeight <= 17;
        screenChange(isFull);
    }
};

//进入全屏
const enterFullScreen  = ()=>{
    let el = document.documentElement;
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
    if (rfs) { // typeof rfs != "undefined" && rfs
        rfs.call(el)
    } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        let wscript = new ActiveXObject('WScript.Shell');  //eslint-disable-line
        if (wscript != null) {
            wscript.SendKeys('{F11}')
        }
    }
};


// 退出全屏
const exitFullScreen = ()=>{
    let el = document;
    let cfs = el.cancelFullScreen || el.mozCancelFullScreen || el.msExitFullscreen || el.webkitExitFullscreen || el.exitFullscreen;
    if (cfs) { // typeof cfs != "undefined" && cfs
        cfs.call(el);
    } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        let wscript = new ActiveXObject('WScript.Shell'); //eslint-disable-line
        if (wscript != null) {
            wscript.SendKeys('{F11}')
        }
    }
};

export default {
    init,
    enterFullScreen,
    exitFullScreen
}
```

___

