const path = require('path')
const express = require('express')
const app = express()

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

// app.get('/', indexRouter)

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

app.use('/', indexRouter)
app.use('/users', userRouter)

// // middleware
// app.use(function (req, res, next) {
//   console.log('1')
//   // 可以在next()里面传递一个错误停止传递
//   next(new Error('error'))
// })

// // 成功处理
// app.use(function (req, res, next) {
//   console.log('2')
//   res.status(200).end()
// })

// //错误处理
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

app.listen(3000)