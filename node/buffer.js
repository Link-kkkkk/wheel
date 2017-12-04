// 缓冲区
// 处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区

var buf = new Buffer(10);
var buf2 = new Buffer([10, 20, 30, 40, 50]);
var buf3 = new Buffer("www.runoob.com", "utf-8");

console.log(buf)
console.log(buf2)
console.log(buf3)

// 缓冲区格式化
console.log(buf3.toString())
console.log(buf3.toJSON())

// 缓冲区合并
var buffer1 = new Buffer('i join ');
var buffer2 = new Buffer('you come');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

// 比较方法
var buffer4 = new Buffer('ABC');
var buffer5 = new Buffer('ABCD');
var result = buffer4.compare(buffer5);

if(result < 0) {
   console.log(buffer4 + " 在 " + buffer5 + "之前");
}else if(result == 0){
   console.log(buffer4 + " 与 " + buffer5 + "相同");
}else {
   console.log(buffer4 + " 在 " + buffer5 + "之后");
}