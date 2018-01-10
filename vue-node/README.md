# node-cli

base on express + mongodb

dependencies:
express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件

other dependencies:
vue.js 前端框架
element-ui 饿了吗ui框架
gulp-less 实时转译less(webpack降级方案)

ps:
mongodb的使用需要自行安装
- Windows 用户向导：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- Linux 用户向导：https://docs.mongodb.com/manual/administration/install-on-linux/
- Mac 用户向导：https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

#### Robomongo

[Robomongo](https://robomongo.org/) 是一个基于 Shell 的跨平台开源 MongoDB 可视化管理工具，支持 Windows、Linux 和 Mac，嵌入了 JavaScript 引擎和 MongoDB mongo，只要你会使用 mongo shell，你就会使用 Robomongo，它还提了供语法高亮、自动补全、差别视图等。

[Robomongo 下载地址](https://robomongo.org/download)
> 国内下载比较缓慢，可以考虑别的载点

下载并安装成功后点击左上角的 `Create` 创建一个连接，给该连接起个名字如: `localhost`，使用默认地址（localhost）和端口（27017）即可，点击 `Save` 保存。

