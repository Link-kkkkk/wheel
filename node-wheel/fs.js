// 读文件的玩意

var fs = require("fs");

// 这是阻塞代码
// var data = fs.readFileSync('test.txt');
// console.log(data.toString());

// 非阻塞代码
fs.readFile('test.txt', function (err, data) {
  if (err) {
    console.error(err);
    return
  }
  console.log(data.toString());
});
