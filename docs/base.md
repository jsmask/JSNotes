# 基础篇

## URL

> 统一资源定位符
>
> 协议://主机:端口/路径?查询#锚点
>
> scheme://host:port/path?query#fragment

------

## DOCTYPE

> DTD(document type definition，文档类型定义)是一系列的语法规则，用来定义XML或(X)HTML的文件类型，浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式。
>
> DOCTYPE是用来声明文档类型和DTD规范的，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时片会出现一些差错。
>
> #### 常见的DOCTYPE：
>
> ```html
> <!--HTML5-->
> <!DOCTYPE html>
> 
> <!--HTML4.01 Transitional（过渡版）,包含扩展性和弃用的元素-->
> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
> http://www.w3.org/TR/html4/loose.dtd">
> 
> <!--HTML4.01 Strict(严格版),不包含扩展性和弃用的元素-->
> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN" "http://www.w3.org/TR/html4/strict.dtd">
> 
> ```

------

## POST与GET请求的区别

1. GET在浏览器回退时是无害的，而POST会再次提交请求
2. GET产生的URL地址可以被收藏，而POST不可以
3. GET请求会被浏览器主动缓存，而POST不会，除非手动设置
4. GET请求只能进行url编码，而POST支持多种编码方式
5. GET请求参数会完整保留在浏览器的历史记录里，而POST不会
6. GET请求在URL中传递的参数是有长度限制，而POST没有限制
7. 对参数类型，GET只会接收ASCII字符，而POST没有限制
8. GET比POST更不安全，因为参数直接暴露在URL上，所以不能直接传递敏感信息
9. GET参数通过URL传递，POST放在Request Body中

------

## HTTP状态码

+ 1xx:  指示信息，表示请求已接收，继续处理
+ 2xx:  成功，表示请求已被成功接收
+ 3xx: 重定向，要完成请求必须进行进行进一步操作
+ 4xx: 客户端错误，请求有语法错误或者请求无法实现
+ 5xx:  服务器错误，服务器未能实现合法的请求

___

## 提升页面的性能的方法

1. 资源压缩合并，减少HTTP请求

2. 非核心代码异步加载

3. 利用浏览器缓存

4. 使用CDN

5. 与解析DNS

   ```html
   <meta http-equiv="x-dns-prefetch-control" content="on">
   <link rel="dns-prefetch" href="//host_name_to_prefetch.com">
   ```

------

## 异步加载

1. 异步加载的方式:
   + 动态脚本加载
   + defer
   + async
2. 异步加载的区别：
   + defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行
   + async是在加载完之后立即执行，如果是多个执行顺序和加载顺序无关

____

## canvas捕获物体

1. 圆形捕获对比半径与两点间距
2. 矩形捕获判断坐标与长宽对应边界
3. 多边形与不规则图形采用分离轴定理(SAT)和最小平移向量(MTV)

___

## for...of 循环

1. 实质上是iterator迭代器+while遍历的实现
2. for..of循环适用于有序集合。如：Array,String,NodeList, Set,Map,arguments,TypedArray,Generator函数返回值
3. object不是有序集合，可以用Map代替
4. 有序集合标志是Symbol.iterator

```javascript
typeof Array.prototype[Symbol.iterator]; //function
typeof Set.prototype[Symbol.iterator]; //function
typeof Object.prototype[Symbol.iterator]; //undefined
```

______

## 页面加载过程

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

## performance

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

## 回流

> 概念：当我们对DOM的修改引发了DOM几何尺寸的变化（比如修改元素的宽高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后在将计算的结果绘制出来。这个过程就是回流（也叫重排）。

------

## 重绘

> 概念：当我们对DOM的修改导致了样式的变化，却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需要重新计算元素的几何属性，直接为该元素绘制出新的样式（跳过了回流环节）。这个过程就是重绘。

------

## WebAssembly

1. 概念：WebAssembly 是一种可以使用非 JavaScript 编程语言编写代码并且能在浏览器上运行的技术方案。

------

## jsonp

> 1. jsonp只能解决GET类型的ajax请求跨域问题
> 2. jsonp请求不是ajax请求，而是一般的get请求
> 3. 基本原理：
>    - 浏览器端：
>      + 动态生成来请求后台接口（src就是接口的url）
>      + 定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台
>    - 服务器端：
>      + 接收到请求处理产生的数据后，返回一个个函数调用的js代码，并将结果数据作为实参传入函数调用
>    - 浏览器端：
>      + 接收到响应自动执行函数调用的js代码，也就是执行了提前定义好的回调函数，并得到了需要的结果函数
>

------

## 高阶函数

> #### 基本概念：
>
> 1. 一类特别的函数
>   1. 接收函数类型的参数
>       2. 返回值也是函数
>
>    2. 例如：
>   1. 定时器: setTimeout() / setInterval()
>    2. Promise: Promise(()=>{}) / then(()=>{},reason=>{})
>   3.  数组遍历相关的方法: forEach() / filter() / map() / reduce() /find() / findIndex()
>       4. 函数对象的bind()
>   5.  antd Form: Form.create()() / Form.getFieldDecorator()()
>    
>3. 高阶函数更新动态，更加具有扩展性

------

## 高阶组件

> #### 基本概念：
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
>

------

## Nginx

> #### 版本解释：
>
> 1. Mainline version：主力在做的版本，就是开发版
> 2. Stable version：最新稳定版，生产环境上建议使用的版本
> 3. Legacy version：遗留的老版本的稳定版
>
> #### 命令行：
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
> #### Linux环境：
>
> #### 1、介绍：
>
> 1. yum -> linux安装包管理工具
>
> #### 2、安装&启动(Centos)：
>
> 1. yum install nginx #安装nginx
> 2. systemctl start nginx.service # 开启nginx服务
> 3. systemctl enable nginx.service # 跟随系统启动
>
> #### 拓展：
>
> 1. 什么是服务器：一台电脑(没有显示器)，24小时为用户提供服务。
> 2. 安装流程：主机 -> 操作系统 -> window(.net)/Linux -> tomcat/nginx(软件/反向代理)

------

## Promise

> #### 基本概念：
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
> #### 三种状态：
>
> - pending：等待状态，如，正在进行网络请求，或者定时器没有到时间
> - fulfill：满足状态，主动回调resolve时，便处于该状态，并会回调.then()
> - reject：拒绝状态，主动回调reject时，便处于该状态，并会回调.catch()

------

## Fetch

1. 概念：一个 JavaScript 接口用于访问和操作HTTP管道的零件。

2. fetch基本使用：

   ```javascript
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

## React Router

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

## Vue CLI

1. 概念：Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

2. runtime-compiler 和 runtime-only的区别：

   - runtime-compiler流程为：template->抽象语法树(AST)->render->虚拟DOM->真实DOM
   - runtime-only流程为：render->虚拟DOM->真实DOM

   ```javascript
   render: h => h(App)  //createElement
   ```

3. 自定义配置文件：vue.config.js

------

## Vue Router

1. 概念：Vue Router 是 Vue.js 官方的路由管理器
2. 基本配置：
   - 安装vue-router
   - Vue.use ->创建Vue-router对象 -> 挂载到Vue实例
   - 创建组件，配置映射关系
3. 路由守卫：
   - 全局导航守卫
   - 路由独享守卫
   - 组件类守卫

> #### 拓展使用：
>
> #### keep-alive：
>
> - 作用：对组件进行缓存，从而节省性能
> - 属性：include：包含路由name。exclude：不包含路由name。
> - 被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行
>
> #### Vue Router mode模式：
>
> - hash模式 ：
> - 原理：location.hash
> - history模式：
> - 原理：history.pushState | history.replaceState
>
> #### Vue Router 动态传参方式：
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

## Vue 响应式

1. 流程：
   - 实例化Vue对象 
   - 解析el模板Compile -> 初始化View视图
   - Observer劫持所有data属性-> 每个属性各生成一个发布者 -> 添加订阅 -> 监听变化通知订阅者 -> 更新View视图
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

## Flux 概念

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

## MVC 框架

1. Module: 用于存放数据 ；View: 用于更新DOM；Controller: 调用Module给View渲染使用

2. M与C是双向数据流，V和C是单向数据流

3. HTML+CSS+JavaScript的分离，本质上不是“分而治之“的，在JavaScript中业务逻辑和界面逻辑混在一起非常难受，所以势必无法用于构造大型的前端应用

4. Facebook开始使用MVC模式，但很快发现：

   + MVC模式让代码变得非常复杂，主要体现为不同模块之间的依赖和耦合增加

   + 当一位开发者修改一段代码后，会迅速影响到依赖这个模块的其他模块，代码变得脆弱，不可预测
   + MVC框架中，开发者为了图省事，经常选择不去扩展Controller，而是直接再Model和View之间通信

------

## Rudex

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

____

## Web攻击

### XSS

1. XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本攻击是指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或JavaScript进行的⼀种攻击。

2. 跨站脚本攻击有可能造成以下影响:
   + 利用虚假输入表单骗取用户个人信息。
   + 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
   + 显示伪造的文章或图片。
3. 防范手段：
   + HEAD 设置 X-XSS-Protection
   + 设置HttpOnly Cookie 防止被客户端窃取cookie
   + CSP（内容安全策略）
   + 转义字符
   + 白名单
   + 黑名单

### CSRF

1. CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。
2. 有可能造成以下影响:
   + 利用用户登录态，完成某些业务请求
   + 盗取用户资金
   + 冒充用户发帖背锅
   + 损害网站声誉
3. 防范手段：
   + 禁止第三方网站带Cookie - 有兼容性问题
   + Referer Check - Https不发送referer
   + 验证码

### 点击劫持

1. 点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

2. 有可能造成以下影响:

   + 用户不知情的情况下完成某些业务操作

3. 防范手段：

   + 设置 X-FRAME-OPTIONS

     + DENY：表示页面不允许通过 iframe 的方式展示
     + SAMEORIGIN：表示页面可以在相同域名下通过 iframe 的方式展示
     + ALLOW-FROM：表示页面可以在指定来源的 iframe 中展示

   + js判断是否是iframe被嵌入在iframe中，如果嵌入，就直接跳转回原链接

     ```html
     <html>
         <head>
             <style id="click-jack">
                 html {
                 display: none !important;
                 }
             </style>
         </head>
         <body>
             <script>
                 if (self == top) {
                 var style = document.getElementById('click-jack')
                 	document.body.removeChild(style)
                 } else {
                 	top.location = self.location
                 }
             </script>
         </body>
     </html>    
     ```

### SQL注入

1. 通过注入有sql含义的字符（比如 `1'or'1'='1`）提交，来通过 sql查询密码等信息时，因为后端直接拼sql接字符串等原因，完成了用户信息的验证。
2. 有可能造成以下影响:
   + 登录任何用户账号，行使该用户权限下的所有业务
   + 盗取用户资金
   + 冒充用户发帖背锅
   + 损害网站声誉
   + 危害整个平台的管理运行
3. 防范手段：
   + 所有的查询语句建议使用数据库提供的参数化查询接口，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，即不要直接拼接 SQL 语句句。
   + 严格限制Web应用的数据库的操作权限，给此用户提供仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害后端代码检查输入的数据是否符合预期，严格限制变量的类型，例如使用正则表达式进行一些匹配处理。
   + 对进入数据库的特殊字符（'，"，\，<，>，&，*，; 等）进行转义处理，或编码转换。

### OS注入

1. OS命令注入攻击指通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在被攻击的风险。倘若调用Shell时存在疏漏，就可以执行插入的非法命令。其实，OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。
2. 有可能造成以下影响:
   + 影响计算机某些操作
   + 危害整个项目的开发运行
3. 防范手段：
   + 选择不调用OS命令的实现方法
   + 不将外界输入的字符串传递给命令行参数
   + 使用安全的函数对传递给OS命令参数进行转义

### 请求劫持

1. DNS服务器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不是预期的ip。
2. 有可能造成以下影响:
   + 套取用户信息
3. 防范手段：
   + HTTP劫持 运营商劫持，此时只能升级HTTPS了

### DDOS

1. DDOS 不是一种攻击，而是一大类攻击的总称。它有几十种类型，新的攻击方法还在不断发明出来。网站运行的各个环节，都可以是攻击目标。只要把一个环节攻破，使得整个流程跑不起来，就达到了痪服务的目的。
2. 有可能造成以下影响:
   + 服务器宕机，整个或部分业务瘫痪
3. 防范手段：
   + 备份网站
     备份网站不一定是全功能的，如果能做到全静态浏览，就能满足需求。最低限度应该可以显示公告，告诉用户，网站出了了问题，正在全力抢修。
   + HTTP 请求的拦截
     硬件 服务器 防火墙
   + 带宽扩容 + CDN
     提高犯罪成本
4. 详见阮一峰的[DDOS 攻击的防范教程](http://www.ruanyifeng.com/blog/2018/06/ddos.html)  

____

## 设计模式

1. 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
2. 适配器模式：为了解决两个软件实体间的接口不兼容的问题。
3. 外观模式：与适配器比较相似，但最显著的特点它是定义了一个新的接口。
4. 装饰者模式：能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。
5. 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。
6. 迭代器模式：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
7. 组合模式：对象组合成树形结构，以表示“部分-整体”的层次结构。
8. 享元模式：一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
9. 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替。
10. 发布订阅模式：又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
11. 命令模式：命令指的是一个执行某些特定事情的指令。
12. 模板方法模式：一种只需使用继承就可以实现的非常简单的模式，一种严重依赖抽象类的设计模式。一般由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
13. 职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
14. 中介者模式：为了解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。使网状的多对多关系变成了相对简单的一对多关系。
15. 状态模式：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

____

## 设计原则

1. 单一职责原则：就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因。如果一个对象承担了多项职责，就意味着这个对象将变得巨大，引起它变化的原因可能会有多个。面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多，等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计。当变化发生时，设计可能会遭到意外的破坏。
2. 开放封闭原则：核心的思想是软件实体是可扩展，而不可修改的。也就是说，对扩展是开放的，而对修改是封闭的。主要体现在扩展开放，意味着有新的需求或变化时，可对现有代码扩展，以适应新的情况；对修改封闭，意味着类一旦设计完成，就可独立完成工作。
3. 好莱坞原则：允许底层组件将自己挂钩到高层组件中，而高层组件会决定什么时候、以何种方式去使用这些底层组件，高层组件对待底层组件的方式，跟演艺公司对待新人演员一样，都是“别调用我们，我们会调用你。即高层组件调用底层组件。
4. 迪米特原则：也叫最少知识原则，是指一个对象应该尽可能少地了解另外的对象，即一个软件实体应当尽可能少地与其他实体发生相互作用。
5. 里氏替换原则：子类能覆盖基类，且任何基类可以出现的地方，子类一定可以出现。
6. 接口隔离原则：客户端不应该依赖它不需要的接口。一个类对另一个类的依赖应该建立在最小的接口上。
7. 依赖倒置原则：抽象编程，依赖于抽象而不依赖于具体。使用方只关注接口而不关注具体类的实现。简单的说就是要求对抽象进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。

____

## 算法思想

1. 分治法:
   1. 分解问题
   2. 解决问题
   3. 合并问题
2. 动态规划
3. 贪心
4. 回溯
5. 分支界定

____

## 类的概念

+ 类(Class): 定义了一件事物的抽象的特点，包含它的属性和方法
+ 对象(Object): 类的实例，通过new生成
+ 面向对象(OOP)的三大特征: 封装、继承、多态
+ 封装: 将数据的操作细节隐藏起来，只暴露对外的接口，外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
+ 继承: 子类继承父类，子类除了拥有父类的所有特征外，还有一些更具体的特性
+ 多态: 由继承而产生了相关的不同的类，对同一个方法可以有不同的相应，比如Cat和Dog都是继承自Animal，但是分别实现了自己的eat方法。此时针对某一个实例，我们无需了解它是Cat还是Dog，就可以直接调用eat方法，程序会自动判断出来应该如何执行eat
+ 存储器(getter & setter): 用来改变属性的读取和赋值行为
+ 修饰符: 一些用于限定成员或类型性质的关键字。比如public表示公共属性或方法
+ 抽象类: 供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
+ 接口(interface): 不同类之间公共的属性或方法，可以抽象成一个接口。接口可以被类实现。一个类只能继承自另一个类，但是可以实现多个接口