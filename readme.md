## 前端模块化MVVM框架-view

v2.2.1
##### 框架解析GET方法更换为Fetch，同时核心框架全部为原生js语法；增加了request_options的请求方式；将jQ和vue默认加载在核心框架里，即默认为数据处理组件。

v2.2.0
##### 1. 在使用过程中，发现view的所依赖的公共参数变量名称容易与pages里面的参数重名，虽然不影响项目运行，但是还是觉得很膈应。所以，这一次将config参数、pages.js参数利用Object将它们封装起来，减少函数或参数起名的难度；
##### 2. 使用过程中，强调了pages入口函数的重要性，即在框架安全检测完，框架解析完，才能做页面模块的数据初始化；
##### 3. 这一次巧妙融合了微信域名防封机制，利用后端语言PHP做最先的safe_check工具。剥离safe_check机制，已经将足够重复的js功能打包。同时，可以将view应用在微信公众号网页授权，而不依赖后端语言。总而言之，强调了前后端分离，强调了web的模块化应用。

v2.1.0
##### 1. 依赖于ES6+jQ（+Api），其中jQ主要负责处理ajax请求；
##### 2. 单页面，模块化，静态化；
##### 3. 思维来源于php的模板渲染，同时为了摆脱代码中夹杂php代码；
##### 4. 一些安全设置来自于语言自带的特性（比如：模块页面上添加的js不能运行，但是css可以。）；
##### 5. 众所周知，基于api的页面无法更好的支持SEO。

## 项目实际应用展示：代码完全托管与CND的应用的访问地址
整个web端项目完全托管于CDN容器里面，速度贼快。
https://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/

## view框架应用的一个例子

view框架的应用demo。BBC，VOA等在线广播收听——利用view的框架和设置实际应用一个web应用。
https://github.com/fyonecon/view-play

## view框架的php写法，利用php将view框架重写一遍
https://github.com/fyonecon/view-php

## 介绍：
##### 0. view的速度能力完全依靠文件的【CDN+api+客户端】能力，可以不依赖于node。渲染过程：依赖器将初步页面组装完成——页面进行api交互丰富页面内容。只需要两步即可完成页面所有内容的加载；
##### 1. view/depend/文件夹包含了框架解析与加载模块文件，需要单独配置view/data/pages.js文件来注册模块文件；view/public/文件夹包含了公用和模块公用js；view/pages/文件夹是放置模块源文件的地方；
##### 2. 页面没有太多的服务端环境和语言版本的要求，不需要分开发环境和生产环境，即改即用。甚至可以将整个项目直接放置在CDN里面，因为所有文件都是静态文件，数据依赖于ajax来渲染；
##### 3. 配置与操作文档在public/doc文件夹；
##### 4. 中型项目+多人协同 应该是没毛病的；
##### 5. 对域名要求比较高的情况比如在微信中传播请将入口index.html更换为index.php，以便处理服务器状态返回和防标记页面。 
##### 6. 页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行Wi-Fi广告劫持的验证与清除--pages.htm--pages.js--page_loaded.js）

## 自带常用函数功能列表（view.js）：
打印日志：view.log(txt)

写入htm文件：view.write_htm(file_path,  by_id, cal_func)

写入js文件：view.write_js(js_src_array,  call_func)

获取url中的参数：view.get_url_param(url,  key)

设置cookie：view.set_cookie(name,  value,  time)

获取cookie：view.get_cookie(name)

删除cookie：view.del_cookie(name)

获取localStorage：view.get_data(name,  value)

md5加密：view.md5(string)

base64加密：base64_encode(string)

base64解密：base64_decode(string)

设置页面数据缓存，即用即走：view.set_cache(key,  value)

读取页面数据缓存：view.get_cache(key)

POST请求：view.request_post(api, map_data, call_func)

GET请求：view.request_get(api, map_data, call_func)

string转json格式：string_to_json(string)

json转string格式：json_to_string(json)

设置、读取、删除、清除本地数据（关闭页面数据仍存在）：set_data(key, value)、get_data(key)、del_data(key)、clear_data()

## 编于：2019-1-22 11:08，更新于：2019-2-26，更新于：2019-9-4，更新于：2019-12-5
