# CSS宝鉴

## 重置页面样式

```css
* {
    font-size                 : 12px;
    padding                   : 0;
    margin                    : 0;
    -webkit-overflow-scrolling: auto;
    -webkit-tap-highlight-color: transparent; 
    -webkit-appearance: none;
}

ul,
li,
ol {
    list-style: none;
}

a,
a:link,
a:active,
a:visited,
a:focus {
    text-decoration: none;
    outline: none;
}
```

## 单行溢出省略

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

## 多行溢出省略

```css
display: -webkit-box;
-webkit-line-clamp: 3; 
-webkit-box-orient: vertical;
overflow : hidden;
text-overflow: ellipsis; 
```

## 弹性居中

```css
display: flex;
justify-content: center;
align-items: center;
```

## 蒙层

```css
.mask{
    position: absolute;
    position: fixed;
    z-index: 9999;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display:block;
}
```

## 计数器

```css
ul {
  counter-reset: count;
}
li::before {
  counter-increment: count;
  content: counter(count) ": ";
}
```

## 选择元素高亮

```css
/*Webkit,Opera9.5+,Ie9+*/
::selection {
	color: #fff;
    background: #14B9C8;
}
/*Mozilla Firefox*/
::-moz-selection {
	color: #fff;
    background: #14B9C8;
}
```

## 引入字体

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

.font{
    font-family:'Orbitron', sans-serif;
}
```

## 动画

```css
.box1{
    animation:flash 5s linear infinite;
}
.box2{
    animation:flash 5s .2s (1,-.55,.25,1.15) alternate backwards;
}
.box3{
    animation: .2s steps(5, start) random infinite;
}
@keyframes flash {
  0%{
    transform: scale(1);
  }
  10%{
    transform: scale(1.2);
  }
  50%,
  100% {
    transform: scale(1);
  }
}
@keyframes random {
  to {
    background-position: 100% 100%;
  }
}
```

## 判断屏幕尺寸

```css
@media screen and (min-width: 320px) and (max-width: 750px){
    
}
@media screen and (min-width: 1280px){
    
}
```

## 渐变字体

```css
background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
```

## 3D模式

```css
.wrapper{
    width: 100%;
    height: 100vh;
    transform-style: preserve-3d;
    transform: perspective(500px);
}
.wrapper>div{
    width: 100px;
    height: 100px;
    background: Red;
    transform: rotate3d(0,-1,0,60deg);
}
```

## 模糊差值

```css
.wrapper{
    filter: contrast(30);
}
.wrapper>div{
   filter: blur(20px);
}
```

