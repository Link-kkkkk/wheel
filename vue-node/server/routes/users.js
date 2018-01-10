const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
  // render的路径是index里面设置的路径

  res.render('users', {
    // include组件的参数同样是在这里render的
    title: 'hi ' + req.params.name,
    name: req.params.name,
    supplies: ['mop', 'broom', 'duster'],
    commonJson:{
      activeNav: '3'
    }
  })
})

module.exports = router