## 前端模块化框架-view
##### 1. 依赖于ES6+jQ（+Api），其中jQ主要负责处理ajax请求；
##### 2. 单页面，模块化；
##### 3. 思维来源于php的模板渲染，同时为了摆脱代码中夹杂php代码；
##### 4. 一些安全设置来自于语言自带的特性（比如：模块页面上添加的js不能运行，但是css可以。）；
##### 5. 众所周知，基于api的页面无法更好的支持SEO。

## 介绍：
##### 1. view/depend/文件夹包含了框架解析与加载模块文件，需要单独配置pages.js文件来配置模块文件；view/file/文件夹包含了公用和模块公用js；view/pages/文件夹是放置模块源文件的地方；
##### 2. 页面没有太多的服务端环境和语言版本的要求，不需要分开发环境和生产环境，即改即用；
##### 3. 配置与操作文档在file/doc文件夹；
##### 4. 中型项目+多人协同 应该是没毛病的。

## 编于：2019-1-22 11:08