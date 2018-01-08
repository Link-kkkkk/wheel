const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/:name', checkNotLogin, function (req, res, next) {
  // res.send('登录页')
  res.render('pages/signin', {
    // include组件的参数同样是在这里render的
    title: '登陆',
    name: req.params.name,
  })
})

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('登录')
})

module.exports = router