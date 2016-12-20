### node

#### 协程
协程(coroutine)，意思是多个线程互相协作，完成异步任务。
第一步，协程A开始执行。
第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
第三步，一段时间后协程B交还执行权。
第四步，协程A恢复执行。

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
<pre>
function* gen(x){
  var y = yield x + 2;
  return y;
}
</pre>
Generator 函数。它不同于普通函数，是可以暂停执行的，所以函数名之前要加星号，以示区别。
<pre>
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
</pre>
上面代码中，调用 Generator 函数，会返回一个内部指针（即遍历器 ）g 。这是 Generator 函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针 g 的 next 方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的 yield 语句，上例是执行到 x + 2 为止。
换言之，next 方法的作用是分阶段执行 Generator 函数。每次调用 next 方法，会返回一个对象，表示当前阶段的信息（ value 属性和 done 属性）。value 属性是 yield 语句后面表达式的值，表示当前阶段的值；done 属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

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


