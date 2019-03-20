## 前端模块化MVVM框架-view
v2.1.0
##### 1. 依赖于ES6+jQ（+Api），其中jQ主要负责处理ajax请求；
##### 2. 单页面，模块化，静态化；
##### 3. 思维来源于php的模板渲染，同时为了摆脱代码中夹杂php代码；
##### 4. 一些安全设置来自于语言自带的特性（比如：模块页面上添加的js不能运行，但是css可以。）；
##### 5. 众所周知，基于api的页面无法更好的支持SEO。

## 项目实际应用展示：代码完全托管与CND的应用的访问地址
整个web端项目完全托管于CDN容器里面，速度贼快。
http://cdn.meishid.cn/view-play/index.html

## view框架应用的一个例子

view框架的应用demo。BBC，VOA等在线广播收听——利用view的框架和设置实际应用一个web应用。
https://github.com/fyonecon/view-play

## view框架的php写法，利用php将框架重写一遍
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

md5加密：view.md5(string)

base64加密：base64_encode(string)

base64解密：base64_decode(string)

设置页面数据缓存，即用即走：view.set_cache(key,  value)

读取页面数据缓存：view.get_cache(key)

POST请求：view.post(api,  json_data,  call_func,  call_data)

GET请求：view.get(api,  call_func,  call_data)

string转json格式：string_to_json(string)

json转string格式：json_to_string(json)

## 编于：2019-1-22 11:08，更新于：2019-2-26
