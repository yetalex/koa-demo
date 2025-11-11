import Router from '@koa/router'
import healthRouter from './health.route.js'

const router = new Router({ prefix: '/api' })
router.use(healthRouter.routes())

export default router