import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from '@routes/index.js'
import errorMiddleware from '@middlewares/error.middleware.js'

const app = new Koa()

app.use(bodyParser())  // 注册 JSON / urlencoded 解析
app.use(errorMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

export default app