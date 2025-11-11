import type { Context, Next } from 'koa'

export default async function errorMiddleware(ctx: Context, next: Next) {
    try {
        await next()
    } catch (err: any) {
        ctx.status = err.status || 500
        ctx.body = { message: err.message || 'Internal Server Error' }
    }
}