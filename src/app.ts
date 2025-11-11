import Koa from 'koa'
import router from '@routes/index.js'
import errorMiddleware from '@middlewares/error.middleware.js'

const app = new Koa()

app.use(errorMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

export default app