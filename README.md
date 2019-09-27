## 基本知识

### URL

> ##### 基本概念：
>
> 统一资源定位符
>
> 协议://主机:端口/路径?查询
>
> scheme://host:port/path?query#fragment

------

### 高阶函数

> ###### 基本概念：
>
> 1. 一类特别的函数:
>
>    a. 接收函数类型的参数
>
>    b. 返回值也是函数
>
> 2. 例如：
>
>    a. 定时器: setTimeout() / setInterval()
>
>    b. Promise: Promise(()=>{}) / then(()=>{},reason=>{})
>
>    c. 数组遍历相关的方法: forEach() / filter() / map() / reduce() /find() / findIndex()
>
>    d. 函数对象的bind()
>
>    e. antd Form: Form.create()() / Form.getFieldDecorator()()
>
> 3. 高阶函数更新动态，更加具有扩展性

------

### 高阶组件

> ###### 基本概念：
>
> 1. 本质是一个函数
>
> 2. 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特点属性
>
> 3. 作用：扩展组件的功能
>
> 4. 也是一种高阶函数：接收一个组件函数，返回一个新的组件函数
>
> 5. 例如：
>
>    a. antd Input: <Input prefix={<Icon type="user" />} />

------

### Nginx

> ##### 版本解释：
>
> 1. Mainline version：主力在做的版本，就是开发版
> 2. Stable version：最新稳定版，生产环境上建议使用的版本
> 3. Legacy version：遗留的老版本的稳定版
>
> ##### 命令行：
>
> 1. 格式：nginx -s reload
> 2. 帮助：-? -h
> 3. 使用指定的配置文件：-c
> 4. 指定配置指令：-g
> 5. 指定运行目录：-p
> 6. 发送信号：-s
> 7. 立刻停止服务： -s stop 
> 8. 优雅的停止服务：-s quit
> 9. 重载配置文件：-s reload
> 10. 重新开始记录日志文件：-s reopen
> 11. 测试配置文件是否有语法错误：-t -T
> 12. 打印nginx的版本信息、编译信息等：-v -V
>
> ##### Linux环境：
>
> ###### 1、介绍：
>
> 1. yum -> linux安装包管理工具
>
> ##### 2、安装&启动(Centos)：
>
> 1. yum install nginx #安装nginx
> 2. systemctl start nginx.service # 开启nginx服务
> 3. systemctl enable nginx.service # 跟随系统启动
>
> ##### 拓展：
>
> 1. 什么是服务器：一台电脑(没有显示器)，24小时为用户提供服务。
> 2. 安装流程：主机 -> 操作系统 -> window(.net)/Linux -> tomcat/nginx(软件/反向代理)

------

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
>  //resolve('success') -> 成功执行
>  //reject('error') -> 错误终止
> }).then().catch()
> ```
>
> ###### 三种状态：
>
> - pending：等待状态，如，正在进行网络请求，或者定时器没有到时间
> - fulfill：满足状态，主动回调resolve时，便处于该状态，并会回调.then()
> - reject：拒绝状态，主动回调reject时，便处于该状态，并会回调.catch()

------

### Fetch

1. 概念：一个 JavaScript 接口用于访问和操作HTTP管道的零件。

2. ```javascript
   //fetch基本使用：
   const url = "";
   fetch(url).then(res => {
     return res.json();
   }, err => console.log(err))
     .then(data => {
       console.log(data)
     }, err => console.log(err))
   
   //async&await使用：
   (async function () {
       try {
           let res = await fetch(url);
           let data = await res.json();
           console.log(data)
       } catch (err) { }
   })()
   ```

3. res能解析的格式：

   - .json()  -> JSON 和数组
   - .arraryBuffer() -> 二进制的数组
   - .blob() -> 二进制大对象（来源于数据库，不需要解析，多用于多媒体文件）
   - .text() -> 文本

------

### React Router

- 安装： npm install react-router-dom -S

- 常用库：

  - react-router -> 核心库，实现了所有路由的核心功能
  - react-router-dom -> 与浏览器DOM配合工作的版本
  - react-router-native -> 与React native配合工作的版本
  - react-router-config -> 用于静态配置

- Router：路由对象，包括所有的路由配置、链接、逻辑等。

  - BrowserRouter

    | 解释                                             |
    | ------------------------------------------------ |
    | 基于HTML5的History API，使用path呈现             |
    | 但不刷新时，服务器没有获得请求，需要服务器端配置 |
    | 刷新时，服务参与其中，服务器配合                 |

  - HashRouter

    | 解释                                 |
    | ------------------------------------ |
    | location.hash，页面不刷新            |
    | 刷新时，服务器也不参与，服务器不配合 |

  - MemoryRouter

    | 解释                             |
    | -------------------------------- |
    | 路由状态保存在内存中，刷新后消息 |
    | 用于非浏览器的环境               |

- Redirect：路由重定向

- Link：路由跳转

```react
//Link path属性：
// 写法1：直接传字符串
<Link to="/abc">TO Page</Link>
// 写法2：传入对象
<Link to={{pathname:"/1",state:{id:1,name:"js"}}}>TO Page</Link>
```

- Route：路由表，也称又有配置

```react
// Route 属性：
// 1. component
<Route exact  path="/" component={Page}></Route>
// 2. render
<Route exact path="/"
    render={props => (
       <Page {...props} data={id:1,name:"js"}></Page>
    )}>
</Route>
```

------

### Vue CLI

1. 概念：Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

2. runtime-compiler 和 runtime-only的区别：

   - runtime-compiler流程为：template->抽象语法树(AST)->render->虚拟DOM->真实DOM
   - runtime-only流程为：render->虚拟DOM->真实DOM

   ```javascript
   render: h => h(App)  //createElement
   ```

3. 自定义配置文件：vue.config.js

------

### Vue Router

1. 概念：Vue Router 是 Vue.js 官方的路由管理器
2. 基本配置：
   - 安装vue-router
   - Vue.use ->创建Vue-router对象 -> 挂载到Vue实例
   - 创建组件，配置映射关系
3. 路由守卫：
   - 全局导航守卫
   - 路由独享守卫
   - 组件类守卫

> ##### 拓展使用：
>
> ##### keep-alive：
>
> - 作用：对组件进行缓存，从而节省性能
> - 属性：include：包含路由name。exclude：不包含路由name。
> - 被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行
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

------

### Vue 响应式

1. 流程：
   - 实例化Vue对象 
   - 解析el模板Compile -> 初始化View视图
   - Observer劫持所有data属性-> 每个属性各生成一个发布者 -> 添加订阅 -> 监听变化通知订阅者r -> 更新View视图
2. 修改数据时如果监听发生改变？
   - Object.defineProperty -> 劫持对象属性
3. 当数据改变如何通知界面刷新？
   - 发布订阅模式
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

------

### Flux 概念

1. 概念：Flux是由Facebook官方提出的一套前端应用的框架模式
2. 核心思想：单向数据流
3. 剑指MVC模式
4. 2013年与React同时发布，Facebook认为React与Flux可以相辅相成，构建大型JavaScript应用
5. 而后，Redux继承了Flux的模式思想，青出于蓝而胜于蓝
6. 流程：
   - Dispatcher：分发Action,维持与Store的逻辑关系
   - Store：存储数据，处理数据，JS对象
   - Action：Dispatcher分发的JS对象
   - View：视图
   - 与Controller相比，Dispatcher暴露的接口是不变的
   - Store改变后，View更新
   - View希望更新Store无法直接操作，因为Store只要get方法，没有set方法。View需要向Dispatcher抛出Action来间接改变Store

------

### MVC 框架

1. Module: 用于存放数据 ；View: 用于更新DOM；Controller: 调用Module给View渲染使用
2. M与C是双向数据流，V和C是单向数据流
3. HTML+CSS+JavaScript的分离，本质上不是“分而治之“的，在JavaScript中业务逻辑和界面逻辑混在一起非常难受，所以势必无法用于构造大型的前端应用
4. Facebook开始使用MVC模式，但很快发现：

- MVC模式让代码变得非常复杂，主要体现为不同模块之间的依赖和耦合增加
  - 当一位开发者修改一段代码后，会迅速影响到依赖这个模块的其他模块，代码变得脆弱，不可预测
  - MVC框架中，开发者为了图省事，经常选择不去扩展Controller，而是直接再Model和View之间通信

------

### Rudex

1. 流程：

   - Action -> Dispatcher -> Reducer -> Store -> View 
   - View -> Action -> Dispatcher

2. 演示：

   ```javascript
   //1. 引入redux
   import { createStore } from 'redux'
   
   //2. 创建一个reducer函数，用于状态更新
   // reducer(state, action) 返回一个新对象
   const defaultData = { id: 1, name: "小火龙" };
   function reducer(state = defaultData, action) {
       let newState=JSON.parse(JSON.stringify(state))
       if (action.type === "merge") {
           Object.keys(action.data).forEach(key=>{
               newState[key]=action.data[key];
           });
           return newState;
       }
       return state;
   }
   
   //3. 创建store
   let store = createStore(reducer);
   
   //4. 当有人读取store中的state时，通过getState来调用
   let state = store.getState();
   console.log(state);
   
   //5. 订阅
   store.subscribe(()=>{
       console.log(store.getState());
   })
   
   //6. 用dispatcher来修改store中的state
   store.dispatch({
       data: {
           level: 5,
           skill: ["撞击"]
       },
       type: "merge"
   });
   console.log(store.getState());
   ```

   

------

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
9. typora -> 无障碍编写md文档的工具 -> https://www.typora.io/
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
33. myjson -> 一个json仓库可以模拟请求 -> http://myjson.com/
34. gulp ->  自动化构建工具 -> https://www.gulpjs.com.cn/
35. easymock -> 可视化模拟数据的平台 -> https://www.easy-mock.com/
36. Zdog ->  一个javascript的3D设计和动画制作库 -> https://zzz.dog/
37. Writeathon -> 一款基于极简理念的在线写作工具 -> https://www.writeathon.cn/
38. qtool -> 站长资源平台,拥有很多实用的在线功能 -> https://www.qtool.net/
39. yarn -> yarn命令介绍 ->https://yarnpkg.com/zh-Hans/docs/cli/
40. next -> 一个轻量级的 React 服务端渲染应用框架的中文官网 -> https://nextjs.frontendx.cn/
41. electron -> js+html+css构建跨平台的桌面应用 -> https://electronjs.org/
42. docschina -> 为前端开发人员提供优质文档的平台 -> https://www.docschina.org/
43. mocky -> 模拟丰富数据的平台 -> https://www.mocky.io/
44. udacity -> 来自硅谷的前沿技术平台 -> https://cn.udacity.com/
45. chart.xkcd -> XKCD漫画风格的网页图表库 -> https://github.com/timqian/chart.xkcd
46. rough -> 生成手绘风格图片的 JS 库 -> https://github.com/pshihn/rough/
47. pagemap -> 在网页插入页面缩略导航图的 JS 库 -> https://larsjung.de/pagemap/
48. showmebug -> 在线实时编程环境的平台 -> https://www.showmebug.com/
49. geekdocs -> 面向前端开发者的网址导航站 -> http://geekdocs.cn/
50. fastmock -> 可视化模拟数据的平台 -> https://www.fastmock.site

------

### 文章&电子书

1. 彻底理解服务端渲染原理 -> https://juejin.im/post/5d1fe6be51882579db031a6d
2. React打造精美WebApp -> https://sanyuan0704.github.io/react-cloud-music/

------

### 优秀Github作者

1. 神三元 ->《React打造精美WebApp》作者【中国】 -> https://github.com/sanyuan0704
2. 阮一峰 ->《ECMAScript 6入门》作者【中国】 -> https://github.com/ruanyf
3. yui540 ->《臆病な魔女》作者【日本】 -> https://github.com/yui540

------

### npm常用包(后端)

1. bcrypt -> 加密解密
2. gravatar -> 通过https://cn.gravatar.com/邮箱获取头像
3. jsonwebtoken -> 获取token
4. passport -> Express的兼容认证中间件，实现验证请求
5. passport-jwt -> 验证token（passport策略）
6. body-parser -> 解析传入数据
7. concurrently -> 多个终端连载
8. nodemon -> 发生变化自动保存重新开启服务
9. mongoose -> 处理mongodb对象的建模工具
10. multer -> 处理文件上传
11. blueimp-md5 -> 实现md5加密

------

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
10. live-server -> 具有实时重新加载功能的服务器
11. nuxt -> vue的通用框架,用来做服务器端渲染
12. react-transition-group -> react动画库
13. redux -> 状态管理
14. redux-thunk -> redux中间件
15. echarts-for-react -> 针对react的图表库
16. react-draft-wysiwyg -> 针对react的富文本编辑器
17. store -> 处理浏览器本地存储

------

### JS重要对象或函数

1. URL.createObjectURL()
2. FormData()
3. FileReader()
4. XMLHttpRequest()

------

### webpack常用插件

1. HtmlWebpackPlugin(需下载安装html-webpack-plugin) -> 绑定html
2. VueLoaderPlugin(安装vue后，存在于vue-loader/lib/plugin) -> 解析vue文件
3. BannerPlugin(自带) -> 头部声明注释
4. UglifyjsPlugin(需下载安装uglifyjs-webpack-plugin) -> 丑化js代码
5. WebpackDevServer(需下载安装webpack-dev-server 依赖express) -> 本地服务器自动更新
6. WebpackMerge(需下载安装webpack-merge) -> 合并文件

------

### gulp常用插件

1. gulp-sass -> sass编译成css
2. gulp-less -> less编译成css
3. gulp-stylus -> stylus编译成css
4. gulp-typescript -> TypeScript编译成JavaScript
5. webpack-stream -> 将webpack集成在Gulp中使用
6. gulp-babel -> ES6编译成ES5
7. gulp-concat -> 合并文件
8. gulp-clean-css -> 压缩 CSS
9. gulp-csso -> 压缩 CSS
10. gulp-uglify -> 压缩 JavaScript
11. gulp-imagemin -> 压缩图片
12. gulp-htmlmin  -> 压缩 HTML
13. gulp-svgmin -> 压缩 SVG
14. gulp-uncss -> 移除未使用的CSS选择器
15. gulp-css-base64 -> 将CSS文件中所有的图片资源转成base64
16. gulp-responsive -> 生成不同尺寸的图片
17. gulp-useref -> 解析HTML文件中特殊标签里面的script或style标签，合并成一个script或css文件，并替换
18. gulp-inject ->g 将指定的css或js文件以标签的形式插入到HTML中的指定标志内。
19. wiredep -> 将Bower依赖自动注入HTML文件中
20. gulp-replace -> Gulp的一个字符串替换插件
21. gulp-rename -> 轻松重命名文件
22. gulp-rev -> 在静态文件名的后面添加哈希值

------

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

   

------

### 构建项目常用指令

1. 安装淘宝镜像 -> npm install -g cnpm --registry=https://registry.npm.taobao.orgnpm install -g cnpm --registry=[https://registry.npm.taobao.org](https://registry.npm.taobao.org)
2. 创建vue cli2脚手架于xxx文件夹 -> vue init webpack xxx
3. 创建vue cli3脚手架于xxx文件夹 -> vue create xxx
4. 创建vue nuxt脚手架于xxx文件夹 -> npx create-nuxt-app xxx
5. 创建react脚手架于xxx文件夹 -> create-react-app xxx
6. 全局安装react-native脚手架夹 ->  npm i -g yarn react-native-cli
7. 创建react-native脚手架于xxx文件夹 -> react-native init xxx
8. 安装vue cli3 下的cube-ui模板 -> vue add cube-ui
9. 安装npx操作命令 -> npm install -g npx
10. 创建next脚手架于xxx文件夹 ->create-next-app xxx

------

### UI常用框架

1. element-ui -> 饿了么UI框架(Vue PC) -> http://element-cn.eleme.io/#/zh-CN
2. mint-ui -> 饿了么UI框架(Vue Mobile) -> http://mint-ui.github.io/#!/zh-cn
3. cube-ui -> 滴滴UI框架(Vue Mobile) ->https://didi.github.io/cube-ui/#/zh-CN
4. iview -> TalkingData维护(Vue PC) -> https://iviewui.com/
5. at-ui -> 凹凸实验室维护(Vue PC) ->https://at-ui.github.io/at-ui/#/zh
6. vant -> 有赞解决方案(Vue Mobile) -> https://youzan.github.io/vant/#/zh-CN
7. antd-mobile -> 支付宝UI框架(React Mobile / Native) -> https://mobile.ant.design/index-cn 
8. antd -> 支付宝UI框架(React PC) ->https://ant.design/index-cn

------

### 游戏开发常用工具

| 名称             | 介绍             |
| ---------------- | ---------------- |
| ShoeBox          | 拆分合并图片资源 |
| BMFont           | 字体资源制作     |
| TexturePackerGUI | 拆分合并图片资源 |
| Cinema 4D        | 视觉特效制作     |
| Particle2dx      | 粒子特效制作     |

------

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

------

### git常用命令

```
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
```

```javascript
1. 创建远程仓库
2. 创建本地仓库
    a. 配置.gitignore
    b. git init
    c. git add .
    d. git commit -m "init"
3. 将本地仓库推送到远程仓库
    git remote add origin url
    git push origin master
4. 在本地创建dev分支, 并推送到远程
    git checkout -b dev
    git push origin dev
5. 如果本地有修改
    git add .
    git commit -m "xxx"
    git push origin dev
6. 新的同事: 克隆仓库
    git clone url
    git checkout -b dev origin/dev
    git pull origin dev
7. 如果远程修改
    git pull origin dev
```

------

### 优秀网页分享

1. 404猴子 -> https://codepen.io/thejohnyagiz/pen/npDyq
2. 臆病な魔女 -> https://github.com/yui540/Cowardly-Witch
3. 中国古典颜色表 -> https://colors.ichuantong.cn/

------

### 展示型页面插件

| 名称         | 介绍                                 |
| ------------ | ------------------------------------ |
| imagesloaded | 图片加载插件,能够监测图片的加载状态  |
| TweenMax     | 超高性能专业级动画插件               |
| charming     | 改变单个字体                         |
| swiper       | 移动端网页触摸内容滑动插件           |
| fullpage     | 全屏滑动插件                         |
| wow          | 实现滚动页面时触发CSS 动画效果的插件 |
| animejs      | 轻量级JavaScript动画库               |

------

### react安装脚手架

| 指令                                | 解释                                      |
| ----------------------------------- | ----------------------------------------- |
| npm i -g create-react-app           | 全局安装                                  |
| create-react-app react-basic        | 创建react-basic基础模板                   |
| cd react-basic                      | 进入react-basic项目文件                   |
| npm start                           | react-basic项目构建预览                   |
| npm i redux react-redux redux-thunk | 安装redux，react-redux和中间件redux-thunk |

------

### npm&yarn命令对比

| npm指令                      | yarn指令             |
| :--------------------------- | :------------------- |
| npm install                  | yarn                 |
| npm install react --save     | yarn add react       |
| npm uninstall react --save   | yarn remove react    |
| npm install react --save-dev | yarn add react --dev |
| npm update --save            | yarn upgrade         |

------

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

------

### ESLint配置

1. 安装ESLint: npm install eslint eslint-loader -D
2. 安装plugin: npm install eslint-plugin-react -D
3. 配置ESLint: node node_modules/eslint/bin/eslint --init
4. 配置webpack：

```javascript
//webpack.conifg.js
module: {
        rules:[{
            test:/\.jsx?/i,
            exclude: /(node_modules|bower_components)/,
            use:[{
                loader:"babel-loader",
                options:{
                    presets:['@babel/preset-react']
                }
            },{
                loader:"eslint-loader"
            }]
        }
}
```

5. 安装babel-eslint: npm install babel-eslint -D
6. 在.eslintrc中添加:  

```json
"parser": "babel-eslint"
```

7. ESLint规则:

```javascript
//禁用ESLint
/* eslint-disable */
const swich = true;
console.log(swich);  
/* eslint-enable */

//禁用一条规则
/*eslint-disable no-console */
const a = 1;
console.log(a);
/*eslint-enable no-console */

/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
```

------

### Jest配置

1. 安装Webpack: npm install webpack webpack-cli -D 
2. 安装Jest: npm install jest@23.6.0 jest-webpack -D
3. 配置package.json:

```javascript
"scripts":{
   "test":"jast-webpack"
},
"jest":{
    "roots":[
        "./tests/"
    ]
}
```

4. npm run test
5. 添加测试用例

------

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
    .then(()=>console.log('设置完成'+res));
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

