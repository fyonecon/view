#view配置教程

## 单页应用功能加载顺序

###### index.html——pages.js——index.js——检测ES6环境——获取url路由——渲染模块html——引入公共css和js——渲染foot等公共html模块——引入本页html模块css和js——执行页面入口函数start_this_page()

## 新建一个单页应用
##### 新建并访问模块：
###### 1）新建模块：pages/名字/名字.htm，pages/名字/名字.css，pages/名字/名字.js；
###### 2）注册模块：depend/pages.js，配置变量pages的参数即可，可以参照404页面的心法，注意路径和文件引入即可；
###### 3）foot部分渲染，需要将/public/common/foot/foot/foot.js作为公共js资源，通过foot.js将/public/common/foot/foot/foot.htm引入inject区；
###### 4）访问新建模块：“index.html#route=名字”，成功访问即可。

## 配置模块页面js
###### 1）在pages/名字/名字.js中的start_this_page()为页面起始函数，本模块的其他操作应由此函数开始执行。

## 你自定义函数的js不能写的文件：
###### 1）depend/pages.js文件、depend/index.js文件、模块htm文件；
###### 2）css也可参照上面。

## 配置页面公共html模块比如foot模块
###### 1）在文件夹public/common/中新建文件“名字/名字.html”和“名字/名字.js ”；
###### 2）在pages.js中将注册“名字/名字.js ”到页面公共资源变量page_public_file下即可；
###### 3）具体“名字/名字.js ”内容可参考foot的写法。

## 注意事项：
######1）本应用需要一个简单的服务器环境，直接从本地进入是不能运行的；
######2）本应用不需要重新编译，即改即用；
######3）浏览器需要支持ES6语法。