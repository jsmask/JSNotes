## 基本概念

### URL

> ##### 基本概念：
>
> 统一资源定位符
>
> 协议://主机:端口/路径?查询
>
> scheme://host:port/path?query#fragment

___

### Nginx

> ##### 版本解释：
>
> 1. Mainline version：主力在做的版本，就是开发版
> 2. Stable version：最新稳定版，生产环境上建议使用的版本
> 3. Legacy version：遗留的老版本的稳定版
>
> ##### Linux环境：
>
> ###### 1、介绍：
>
> 1. yum -> linux安装包管理工具
>
> ##### 2、安装&启动(Centos)：
>
> 1.  yum install nginx #安装nginx
> 2. systemctl start nginx.service # 开启nginx服务
> 3. systemctl enable nginx.service # 跟随系统启动
>
> ##### 拓展：
>
> 1. 什么是服务器：一台电脑(没有显示器)，24小时为用户提供服务。
>
> 2. 安装流程：主机 -> 操作系统 -> window(.net)/Linux -> tomcat/nginx(软件/反向代理)

___

### Promise

> ###### 基本概念：
>
> ES6异步编程的一种解决方案
>
> 主要解决回调地狱问题
>
> 链式编程
>
> ```javascript
> new Promise((resolve,reject)=>{
>     //resolve('success') -> 成功执行
>     //reject('error') -> 错误终止
> }).then().catch()
> ```
>
> ###### 三种状态：
>
> - pending：等待状态，如，正在进行网络请求，或者定时器没有到时间
> - fulfill：满足状态，主动回调resolve时，便处于该状态，并会回调.then()
> - reject：拒绝状态，主动回调reject时，便处于该状态，并会回调.catch()

___

### Vue CLI

1. 概念：Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

2. runtime-compiler 和 runtime-only的区别：

   + runtime-compiler流程为：template->抽象语法树(AST)->render->虚拟DOM->真实DOM
   + runtime-only流程为：render->虚拟DOM->真实DOM

    ```javascript
   render: h => h(App)  //createElement
    ```

3. 自定义配置文件：vue.config.js

___

### Vue Router

1. 概念：Vue Router 是 Vue.js 官方的路由管理器
2. 基本配置：
   + 安装vue-router
   + Vue.use ->创建Vue-router对象 -> 挂载到Vue实例
   + 创建组件，配置映射关系
3. 路由守卫：
   + 全局导航守卫
   + 路由独享守卫
   + 组件类守卫

> ##### 拓展使用：
>
> ##### keep-alive：
>
> + 作用：对组件进行缓存，从而节省性能
> + 属性：include：包含路由name。exclude：不包含路由name。
> + 被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行
>
> ###### Vue Router mode模式：
>
> - hash模式 ：
> - 原理：location.hash
> - history模式：
> - 原理：history.pushState | history.replaceState
>
> ###### Vue Router 动态传参方式：
>
> - query类型:
> - 1. 路由格式：/router
>   2. 传递方式：对象中使用query的key作物传递方式（{path:"/router",query:{id:'123'}}）
>   3. 传递后形成的路径：/router?id=123
> - params类型:
> - 1. 路由格式：/router/:id
>   2. 传递方式：在path后面跟上对应值
>   3. 传递后形成的路径：/router/123

____

### Vue 响应式

1. 流程：
   + 实例化Vue对象 
   + 解析el模板Compile -> 初始化View视图
   + Observer劫持所有data属性-> 每个属性各生成一个发布者 -> 添加订阅 -> 监听变化通知订阅者r -> 更新View视图
2. 修改数据时如果监听发生改变？
   + Object.defineProperty -> 劫持对象属性
3. 当数据改变如何通知界面刷新？
   + 发布订阅模式

4. 基本实现原理:

```javascript
class Vue {
    constructor(options) {
        //保存数据
        this.$options = options;
        this.$el = options.el;
        this.$data = options.data;

        //将数据添加到响应式系统中
        new Observer(this.$data);

        //代理数据
        Object.keys(this.$data).map(key => {
            this._proxy(key)
        })

        //处理DOM
        new Compiler(this.$el, this);
    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                return this.$data[key]
            },
            set(newValue) {
                this.$data[key] = newValue;
            }
        })
    }
}

class Observer {
    constructor(data) {
        this.data = data;
        Object.keys(this.data).map(key => {
            this.defineReactive(this.data, key, this.data[key])
        })
    }

    defineReactive(data, key, val) {
        const dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.traget) {
                    dep.addSub(Dep.traget);
                    Dep.traget = null;
                }
                return val;
            },
            set(newValue) {
                if (newValue === val) return;
                val = newValue;
                dep.notify();
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.map(sub => {
            sub.updated();
        })
    }
}

class Watcher {
    constructor(node, name, vm) {
        this.node = node;
        this.name = name;
        this.vm = vm;
        Dep.traget = this;
        this.updated();        
    }

    updated() {
        this.node.nodeValue = this.vm[this.name];
        this.node.value = this.vm[this.name];
        this.node.innerHTML = this.vm[this.name];
    }
}

const reg = /\{\{(.*)\}\}/;
class Compiler {
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm;
        this.flag = this._createFragment();
        this.el.appendChild(this.flag);
    }

    _createFragment() {
        const flag = document.createDocumentFragment();
        let child;
        while (child = this.el.firstChild) {
            this._compile(child);
            flag.appendChild(child);
        }
        return flag;
    }

    _compile(node) {
        if (node.nodeType == 3) {
            if (reg.test(node.nodeValue)) {
                const name = RegExp.$1.trim();
                new Watcher(node, name, this.vm);
            }
        }
        if (node.nodeType == 1) {
            const attrs = node.attributes;
            let name;
            if (attrs.hasOwnProperty("v-model")) {
                name = attrs["v-model"].nodeValue;
                node.addEventListener("input", e => {
                    this.vm[name] = e.target.value;
                });
            } else {
                if (reg.test(node.outerHTML)) {
                    name = RegExp.$1.trim();
                }
            }
            new Watcher(node, name, this.vm);
        }
    }
}
```

___

## 常用分享

### 文档&工具&资源

1. Postman -> 接口测试工具 -> https://www.getpostman.com/
2. mlab -> 线上免费mongodb -> https://mlab.com/
3. npmjs -> npm查阅插件的网站 -> https://www.npmjs.com/
4. es6 -> es6在线手册 -> http://es6.ruanyifeng.com/
5. redux -> 关于redux的分析 -> http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
6. css-doodle -> web图形 -> https://css-doodle.com
7. Swagger UI -> 生成接口文档 ->https://swagger.io/
8. webpack -> 前端模块化打包工具 -> https://www.webpackjs.com
9.  typora -> 无障碍编写md文档的工具 -> https://www.typora.io/
10. vue-router -> vue中的路由组件官方文档 -> https://router.vuejs.org/
11. AsciiMath -> 将 ASCII 字符的公式转为数学字体的网页工具 -> http://asciimath.org/
12. algorithm-visualizer -> 收集了50多种算法的动画和示例 -> https://algorithm-visualizer.org/
13. httpbin -> 网络请求模拟 -> http://httpbin.org/
14. tinypng -> 智能压缩图片 -> https://tinypng.com/
15. Reset CSS -> 重置css -> https://meyerweb.com/eric/tools/css/reset/
16. iconfont -> 阿里icon库 -> https://www.iconfont.cn/
17. editorconfig -> 多人开发风格统一 -> https://editorconfig.org/
18. Mixkit -> 提供免费高质量插图的网站 -> https://mixkit.co/art/
19. osgameclones -> 收集各种游戏开源的克隆版的网站 -> https://osgameclones.com/
20. jspang -> 免费学习前端技术的博客 -> http://jspang.com/
21. caniuse -> css兼容性检测 -> https://www.caniuse.com/
22. phpStudy ->  PHP调试环境的程序集成包 -> http://phpstudy.php.cn/
23. FlashFXP -> 功能强大的FXP/FTP软件 -> https://www.flashfxp.com/
24. PxCook -> 切图设计工具软件 -> https://www.fancynode.com.cn/pxcook
25. sprite-css -> 在线制作css雪碧图 -> https://www.toptal.com/developers/css/sprite-generator/
26. ngrok -> 将本机映射为外网Web服务器 -> https://ngrok.com/
27. GitLab -> 使用Git作为代码管理工具 -> https://about.gitlab.com/
28. Jenkins -> 自动化服务器 -> https://jenkins.io/zh/
29. nginx -> 服务器反向代理 -> http://nginx.org/
30. toolfk -> 提供利于开发的一些在线工具 -> https://www.toolfk.com/
31. WinSCP ->  Windows 环境可使用 SSH 的图形化SFTP客户端 -> https://winscp.net/eng/docs/lang:chs
32. SecureCRT -> 支持SSH的终端仿真程序  -> https://www.vandyke.com/products/securecrt/windows.html

------

###  npm常用包(后端)

1. bcrypt -> 加密解密
2. gravatar -> 通过https://cn.gravatar.com/邮箱获取头像
3. jsonwebtoken -> 获取token
4. passport -> Express的兼容认证中间件，实现验证请求
5. passport-jwt -> 验证token（passport策略）
6. body-parser -> 解析传入数据
7. concurrently -> 多个终端连载
8. nodemon -> 发生变化自动保存重新开启服务
9. mongoose -> 处理mongodb对象的建模工具
10. express -> node开发框架

___

### npm常用包(前端)

1. axios -> 异步请求
2. jwt-decode -> 解析token
3. moment -> 时间转换
4. qs -> 参数处理
5. lodash -> 实用工具库
6. better-scroll -> 移动端滚动条
7. normalize.css -> 重置css
8. vue-lazyload -> vue项目中使用懒加载
9. fastclick -> 消灭移动端300ms延时

___

### webpack常用插件

1. HtmlWebpackPlugin(需下载安装html-webpack-plugin) -> 绑定html
2. VueLoaderPlugin(安装vue后，存在于vue-loader/lib/plugin) -> 解析vue文件
3. BannerPlugin(自带) -> 头部声明注释
4. UglifyjsPlugin(需下载安装uglifyjs-webpack-plugin) -> 丑化js代码
5. WebpackDevServer(需下载安装webpack-dev-server 依赖express) -> 本地服务器自动更新
6. WebpackMerge(需下载安装webpack-merge) -> 合并文件

___

### 脚手架常用插件

1. postcss-pxtorem ->  px转换rem

   常用配置：

   ```javascript
   "postcss-pxtorem": {
        "rootValue": 100,
        "propList": ["*"],
        "selectorBlackList": [".vux-",".weui-",".mt-",".mint-",".dp-",".ig-"]
   }
   ```

   

___

### 构建项目常用指令

1. 安装淘宝镜像 -> npm install -g cnpm --registry=https://registry.npm.taobao.orgnpm install -g cnpm --registry=[https://registry.npm.taobao.org](https://registry.npm.taobao.org)
3. 创建vue cli2脚手架于xxx文件 -> vue init webpack xxx
3. 创建vue cli3脚手架于xxx文件 -> vue create xxx

___

###  UI常用框架(Vue)

1. element-ui -> 饿了么UI框架(PC) -> http://element-cn.eleme.io/#/zh-CN
2. mint-ui -> 饿了么UI框架(M) -> http://mint-ui.github.io/#!/zh-cn
3. cube-ui -> 滴滴UI框架(M) ->https://didi.github.io/cube-ui/#/zh-CN
4. iview -> TalkingData维护(PC) -> https://iviewui.com/
5. at-ui -> 凹凸实验室维护(PC) ->https://at-ui.github.io/at-ui/#/zh

___

### 游戏开发常用工具

| 名称             | 介绍             |
| ---------------- | ---------------- |
| ShoeBox          | 拆分合并图片资源 |
| BMFont           | 字体资源制作     |
| TexturePackerGUI | 拆分合并图片资源 |
| Cinema 4D        | 视觉特效制作     |
| Particle2dx      | 粒子特效制作     |

___

### cmd常用命令

1. dir -> 查看文件夹下的文件
2. ls -> 查看文件夹下的文件
3. cd xxx -> 打开xxx
4. cd .. -> 返回上一级
5. cd / -> 返回主目录
6. cls -> 清空控制台
7. clear -> 清空控制台
8. code . -> 启动vsCode
9. cd.>xxx.js ->创建xxx.js
10. md xxx -> 新建xxx文件夹

___

### git常用命令

1. git init -> 初始化
2. git status -> 查看文件状态
3. git add . ->提交所有文件
4. git commit -m 'commit message' -> 提交声明
5. git config --list -> 查看git配置列表
6. git --config user.name "xxx" -> 配置git 用户名
7. git --config user.email "xxx" -> 配置git 邮箱
8. git remote add origin https://github.com/xxx/xxx.git -> 添加源
9. git remote rm origin  -> 删除源
10. git push -u origin master -> 上传
11. git rm -r --cache . ->移除所有文件

___

### 优秀网页分享

1. 404猴子 -> https://codepen.io/thejohnyagiz/pen/npDyq
2. 臆病な魔女 -> https://github.com/yui540/Cowardly-Witch

___

### 展示型页面插件
| 名称         | 介绍                                 |
| ------------ | ------------------------------------ |
| imagesloaded | 图片加载插件,能够监测图片的加载状态  |
| TweenMax     | 超高性能专业级动画插件               |
| charming     | 改变单个字体                         |
| swiper       | 移动端网页触摸内容滑动插件           |
| fullpage     | 全屏滑动插件                         |
| wow          | 实现滚动页面时触发CSS 动画效果的插件 |

___

### react安装

| 指令                                | 解释                    |
| ----------------------------------- | ----------------------- |
| npm i -g create-react-app           | 全局安装                |
| create-react-app react-basic        | 创建react-basic基础模板 |
| cd react-basic                      | 进入react-basic项目文件 |
| npm start                           | react-basic项目构建预览 |
| npm i redux react-redux redux-thunk | 安装redux               |

___

### npm&yarn命令对比

| npm指令                      | yarn指令             |
| :--------------------------- | :------------------- |
| npm install                  | yarn                 |
| npm install react --save     | yarn add react       |
| npm uninstall react --save   | yarn remove react    |
| npm install react --save-dev | yarn add react --dev |
| npm update --save            | yarn upgrade         |

___

### typescript(vscode)配置

| 指令或操作                        | 解释                                 |
| --------------------------------- | ------------------------------------ |
| npm install -g typescript         | 全局安装                             |
| npm update -g typescript          | 全局更新                             |
| tsc -v                            | 查看版本号                           |
| npm install --save -g @types/node | 安装库的d.ts文件,如安装node.d.ts文件 |
| npm init                          | 初始化项目                           |
| tsc --init                        | typescript项目                       |
| typings install dt~node --global  | 安装node的.d.ts库                    |
| ctrl+shift+b                      | 任务栏出现构建和监听两个选项         |

___

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

___

### webpack基础配置

1. 创建webpack.config.js文件
2. babel安装 -> npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
3. 解析vue文件安装 ->  npm install vue-loader vue-template-compiler --save-dev

```javascript
const path=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
 //入口：可以是字符串/数组/对象
 entry:'./src/main.js'，
 //入口：通常是一个对象，至少保证有path和filename两个属性
 output:{
   path:path.resolve(__dirname,'dist'), //绝对路径
   filename:'bundle.js',
   publicPath:'dist/'
 }，
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

___

###  Vuex基本使用

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
    .then(()=>console.log('设置完成'+res));
this.$store
    .dispatch("clearLogin")
    .then(()=>console.log('退出登录'));
```

___

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
    },
     resolve: {
         //配置别名
         alias: {
             //如果是src等属性引用路径，需要加~，
             //如：src="~assets/img/bg.png"
             "assets": "@/assets"
         }
    }
}
```

___

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

___

### Vue插件封装

+ common/toast/Toast.vue

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

+ common/toast/index.js

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

+ main.js

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

___

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

___

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

___

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

___

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

___

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

___

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

___

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

___

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

___

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

___

### 禁止右键、选择、复制

```javascript
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
        return event.returnValue = false
    })
});
```

___

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

___

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

___

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

___

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

___

### 随机数获取

```javascript
function random(lower, upper){
	lower = +lower || 0
	upper = +upper || 0
	return Math.random() * (upper - lower) + lower;
}
```

___

