## 基础概念

### URL

> ##### 基本概念：
>
> 统一资源定位符
>
> 协议://主机:端口/路径?查询
>
> scheme://host:port/path?query#fragment

------

### 页面加载过程

1. 用户输入网址
2. 浏览器通过NDS，把网址解析成IP
3. 和IP地址建立TCP链接，发送HTTP请求
4. 服务器接收到请求，查库，读文件等，拼接好返回的HTTP响应
5. 浏览器收到首屏html，开始渲染
6. 解析html为dom
7. 解析css为css tree
8. dom+css 生成render-tree 绘图
9. 加载script的js文件
10. 执行js

___

### performance

1. performance.getEntriesByType('navigation') -> 获取加载信息
2. 查询加载耗时：
   1. 重定向耗时：redirectEnd - redirectStart
   2. DNS查询耗时：domainLookupEnd - domainLookupStart
   3. TCP链接耗时：connectEnd - connectStart
   4. HTTP请求耗时：responseEnd - responseStart
   5. 解析dom树耗时：domComplete - domInteractive
   6. 白屏时间： responseStart - navigationStart
   7. DOM ready时间：domContentLoadedEventEnd - navigationStart
   8. onload时间：loadEventEnd - loadEventStart

____

### 回流

概念：当我们对DOM的修改引发了DOM几何尺寸的变化（比如修改元素的宽高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后在将计算的结果绘制出来。这个过程就是回流（也叫重排）。

------

### 重绘

概念：当我们对DOM的修改导致了样式的变化，却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需要重新计算元素的几何属性，直接为该元素绘制出新的样式（跳过了回流环节）。这个过程就是重绘。

___

### jsonp

> 1. jsonp只能解决GET类型的ajax请求跨域问题
> 2. jsonp请求不是ajax请求，而是一般的get请求
> 3. 基本原理：
>    - 浏览器端：
>
>   动态生成<script>来请求后台接口（src就是接口的url）
>
>   定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台
>
> - 服务器端：
>
>   接收到请求处理产生的数据后，返回一个个函数调用的js代码，并将结果数据作为实参传入函数调用
>
> - 浏览器端：
>
>   接收到响应自动执行函数调用的js代码，也就是执行了提前定义好的回调函数，并得到了需要的结果函数

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
> 2. 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特点属性
> 3. 作用：扩展组件的功能
> 4. 也是一种高阶函数：接收一个组件函数，返回一个新的组件函数
> 5. 例如：
>
> a. antd Input: <Input prefix={<Icon type="user" />} />

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

   