const express = require('express')
const router = express.Router()

const User = require('../lib/mongo').User

router.get('/:name', function (req, res) {
  // render的路径是index里面设置的路径
  res.render('users', {
    // include组件的参数同样是在这里render的
    title: 'hi ' + req.params.name,
    name: req.params.name,
  })
})

module.exports = router
// module.exports = {
//   // 注册一个用户
//   create: function create (user) {
//     return User.create(user).exec()
//   }
// }