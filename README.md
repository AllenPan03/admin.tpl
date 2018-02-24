# 项目目录

本项目前端部分基于vue2.0 vue-cli 构建，在此基础上，用gulp替换全局静态资源引入，生成打包目录public
服务端部分基于express4.14.0 实现
数据库基于MongoDB

build webpack 配置文件目录（开发时使用）。  
config 构建环境配置文件目录。  
src 源文件目录。  
static 第三方插件。图片，JS等全局静态资源目录。  

## 常用命令

建议以 package.json 文件的 scripts 节点作为命令行入口。  

npm start 启动本地数据库。 
npm run dev 启动本地开发调试服务。  
npm run build 构建项目，生成发布目录。  


## 开发阶段

服务器：  
使用 webpack-dev-server 监听本机所有 IP 及 8010 端口。  
  

 源代码目录：
-src
  --components     //vue组件目录： （每个组件自身js,css，图片等放在自已的组件目录下）
    --basic  //vue基础组件
    --业务组件
  --action    //接口目录
  --js   // 公共js
  --css   //公共css
  --images   //公共图片
  --main.js  //入口文件
  --main.vue //入口组件
  
  
## 部署阶段

入口页面使用覆盖式发布，只允许存在一个版本。资源文件使用非覆盖式发布，允许多版本共存。  
  
前端源码部署：
    https://github.com/AllenPan03/admin.tpl.git

修改action/interface.js的sessionId的值为空, 修改rootpath值为相应环境接口地址

构建目录
    /publish

服务器部署目录：
    /page/publish

## 项目描述

项目基于 vue + bootstrap 构建 
vue-resource 实现异步请求
vue-router 实现路径导航
/static/js/validate/customize-validate.js 实现自定义表单较验
/src/js/dict.js 数据字典转化对象

