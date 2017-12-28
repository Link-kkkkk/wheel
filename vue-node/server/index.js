const express = require('express')
const app = express()

const indexRouter = require('./route/index')
const userRouter = require('./route/users')

// app.get('/', indexRouter)

console.log(1)

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)