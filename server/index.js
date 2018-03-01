const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const crypto = require("crypto")//导入加密模块
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)//获取当前文件所在的绝对路径
const api = require('./api')
const app = express()
const cors = require('cors'); //允许跨域
app.use(cors());

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
//app.use(favicon(resolve('../dist/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))//设置静态文件目录
app.use(api)

//注册
app.post('/api/setup', function (req, res) {
  let md5 = crypto.createHash("md5");
  req.body.pwd = md5.update(req.body.pwd).digest("hex");
  console.log(req.body.pwd)
  new db.User(req.body)
    .save()
    .then(() => {
      res.status(200).end()
      db.initialized = true
    })
    .catch(() => res.status(500).end())
})

app.get('/api/initialized', function (req, res) {
  console.log(db.initialized)
  if (db.initialized) {
    res.send({code: 0,msg: '已初始化',})
  } else {
    res.send({code: -1,msg: '未初始化',})
  }
})
//处理跨域问题
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})

