import type { Context } from 'koa'
import { authenticateUser } from '@services/user.service.js'

export async function login(ctx: Context) {
    const { username, password } = (ctx.request.body ?? {}) as {
        username?: string
        password?: string
    }

    if (!username || !password) {
        ctx.status = 400
        ctx.body = { message: '用户名和密码必填' }
        return
    }

    const user = await authenticateUser(username, password)

    if (!user) {
        ctx.status = 401
        ctx.body = { message: '用户名或密码错误' }
        return
    }

    ctx.status = 200
    ctx.body = {
        message: '登录成功',
        user
    }
}