## 项目描述

本项目前端部分基于vue2.0 vue-cli 构建，在此基础上，用gulp替换全局静态资源引入，生成打包目录public
vue-resource 实现异步请求
vue-router 实现路径导航
服务端部分基于express实现，
数据库基于MongoDB

# 项目目录

build webpack 配置文件目录（开发时使用）。  
config 构建环境配置文件目录。  
src 源文件目录。  
static 第三方插件。图片，JS等全局静态资源目录。  
server 构建服务端环境配置文件目录。

## 常用命令

建议以 package.json 文件的 scripts 节点作为命令行入口。  

npm start 启动本地服务端环境。 
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
    /dist

## 附带MAC下安装MongoDB方法
MongoDB 下载地址： https://www.mongodb.com/download-center?jmp=nav#community
1. 下载Mongodb后，将Mongodb-3.2.5.tar.gz 复制到 /usr/local 路径下解压得到mongodb这个文件夹
*默认情况下在Finder中是看不到 /usr 这个目录的（终端用得溜的请略过），可以打开Finder后按shift + command +G 输入 /usr/local后回车便能看到这个隐藏的目录了
2. 在/usr/local/mongodb/bin下就是mongodb的执行文件了
3. 然后在根目录下新建 data 文件夹，里面再建一个db文件夹，就是 usr文件夹上面的 那个data文件夹 ，里面是用来存放数据库的，
4. 终端切换到/usr/local/mongodb/bin目录下，
5. 执行 ./mongod 启动服务端
6. 显示等候客户端连接的界面就代表启动成功了，如果不成功就检查下你/data/db文件夹位置对不对，不行就重新删掉建一个，
7. 打开浏览器，输入localhost:27017,会出现“It looks like you are trying to access MongoDB over HTTP on the native driver port.” 这样一行文字，就成功了




