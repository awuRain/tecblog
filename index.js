var koa = require('koa');
var app = koa();

app.use(function *(next) {
	console.log(1);
	yield next;
	console.log(2);
});

app.use(function *(next) {
	console.log(3);
	yield next;
	console.log(4);
});

app.use(function *() {
	this.body = 'Hello World';
})

app.on('error', function (err, ctx) {
	log.error('server error', err, ctx);
})

app.listen(3000);