const Koa = require('koa2');
const Mock = require('mockjs');
const router = require('koa-router')(); //注意：引入的方式
const http = require('http');
const cors = require('koa2-cors');

const app = new Koa();
app.use(cors());
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());

router.post('/login', async (ctx) => {
    let result = Mock.mock({
        code: 'S',
        msg: '登录成功',
    });

    ctx.body = {
        result: result,
    };
});

http.createServer(app.callback())
    .listen(3000)
    .on('listening', function() {
        console.log(`服务已开启，端口：3000`);
    });
