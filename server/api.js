const express = require('express')
const router = express.Router()
const db = require('./db')
const fn = () => { }

router.get('/api/getArticle', (req, res) => {
  const _id = req.query.id
  db.Article.findOne({ _id }, (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(doc)
    }
  })
})

router.get('/api/getArticles', (req, res) => {
  db.Article.find(null, 'title date content', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      res.send(JSON.stringify(doc))
    }
  })
})

router.post('/api/login', (req, res) => {
  const { name, pwd } = req.body
  db.User.findOne({ name }, 'pwd', (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({ state: 0, msg: '账号不存在' })
        break
      case doc.pwd === pwd:
        res.send({ state: 1, msg: '登陆成功' })
        break
      case doc.pwd !== pwd:
        res.send({ state: 2, msg: '密码错误' })
        break
      default:
        res.send({ state: 3, msg: '未知错误' })
    }
  })
})

router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }
  if (id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    new db.Article(article).save()
  }
  res.status(200).end()
})

router.post('/api/deleteArticle', (req, res) => {
  db.Article.findByIdAndRemove(req.body.id, fn)
  res.status(200).end()
})

router.post('/api/savePwd', (req, res) => {
  const { name, pwd } = req.body
  db.User.findOneAndUpdate({ name }, { pwd }, fn)
  res.status(200).end()
})

//白名单列表
router.all('/api/white/query', (req, res) => {
  const param = req.body.mobile ? { mobile: req.body.mobile } : null;
  db.White.find(param, '', (err, doc) => {
    if (err) {
      console.log(err)
    } else if (doc) {
      const data = {
        code: 0,
        data: {
          data: doc,
          count: doc.length
        }
      }
      res.send(data)
    }
  })
})
//白名单查询
router.post('/api/white/query/one', (req, res) => {
  const _id = req.body.id
  db.White.findOne({ _id: _id }, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111113, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: doc
      }
      res.send(data)
    }
  })
})
//保存名单
router.post('/api/white/update', (req, res) => {
  const _id = req.body.id
  const white = {
    creditmoney: req.body.creditmoney,
    level: req.body.level
  }
  db.White.findByIdAndUpdate(_id, white, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '成功'
      }
      res.send(data)
    }
  })
})
//新增名单
router.post('/api/white/add', (req, res) => {
  const white = {
    creditmoney: req.body.creditmoney,
    level: req.body.level,
    uname: req.body.uname,
    mobile: req.body.mobile,
    remark: req.body.remark,
  }
  new db.White(white).save((err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '成功'
      }
      res.send(data)
    }
  })
});
//删除名单
router.post('/api/white/delete', (req, res) => {
  db.White.findByIdAndRemove(req.body.id, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({ code: 111114, message: '参数错误' })
    } else if (doc) {
      const data = {
        code: 0,
        data: true,
        message: '删除成功'
      }
      res.send(data)
    }
  })
})

module.exports = router