var express = require('express');
var getRouter = express.Router();
var postRouter = express.Router();

/* 渲染登录页面 */
getRouter.get('/login', function(req, res, next) {
    console.log(1)
    res.render('login', {flag: 0});
});

/* 处理登录请求 */
postRouter.post('/login', function(req, res) {
    console.log(2)
    if(req.body.username == 'hello' && req.body.password == 'world') {
        res.cookie('authorized', req.body.username);
        res.redirect('/admin');
    }
    else{
        res.render('login', {flag: 1});
    }
})

exports.get = getRouter;
exports.post = postRouter;