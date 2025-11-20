import Router from '@koa/router'
import healthRouter from './health.route.js'
import userRouter from './user.route.js'

const router = new Router({ prefix: '/api' })
router.use(healthRouter.routes())
    .use(userRouter.routes())

export default router