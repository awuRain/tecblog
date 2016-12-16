### koa.js

#### yield next
yield next;会挂起当前函数执行，继续执行下一个符合路由的函数，当没有yield next;关键字之后会逆序执行挂起函数剩余代码

#### app.listen()
<pre>
var koa = require('koa');
var app = koa();
app.listen(3000);
</pre>
==
<pre>
var http = require('http');
var koa = require('koa');
var app = koa();
http.createServer(app.callback()).listen(3000);
http.createServer(app.callback()).listen(3001); // 可以监听多个端口
</pre>

#### app.callback()
返回一个可以挂载为http.createServer()回调函数参数，用来处理请求

#### Context(上下文)
context 在每个 request 请求中被创建，在中间件中作为接收器(receiver)来引用，或者通过 this 标识符来引用
<pre>
app.use(function *() {
    this; // is the Context
    this.requset; // is a koa Request
    this.response; // is a koa Response
})
</pre>
##### ctx.req : Node request
##### ctx.res : Node response 
##### ctx.requset : Koa requset
##### ctx.response : Koa response
##### ctx.app : 对应用实例的引用
##### ctx.cookies.get(name, [options]) : 获取cookie中名为name的值
##### ctx.cookies.set(name, value, [options]) : 设置cookie中名为name的值  
+ signed: 是否要做签名  
+ expires: cookie 有效期时间
+ path: cookie 的路径，默认为 /'
+ domain: cookie 的域
+ secure: false 表示 cookie 通过 HTTP 协议发送，true 表示 cookie 通过 HTTPS 发送。
+ httpOnly: true 表示 cookie 只能通过 HTTP 协议发送

##### ctx.throw(msg, [status])
<pre>
    ctx.throw('name required', 400);
</pre>
==
<pre>
    var err = new Error('name required');
    err.status = 400;
    throw err;
</pre>

#### Request
##### req.header : 请求头Object
##### req.method : 请求方法
##### req.length : 以数字的形式返回 request 的内容长度(Content-Length)，或者返回 undefined
##### req.url : 获得请求url地址
##### req.originalUrl : 获取请求原始地址
##### req.path : 获取请求路径名
##### req.querystring : 获取查询参数字符串(url中?后面的部分)，不包含?
##### req.search : 获取查询参数字符串，包含


