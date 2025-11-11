import request from 'supertest'
// import { describe, it, expect } from 'vitest'  // 如果没有在tsconfig.json启用全局types，需要显示导入
import app from '../app.js'

describe('GET /api/health', () => {
    it('should return ok: true', async () => {
        const res = await request(app.callback()).get('/api/health')
        expect(res.status).toBe(200)
    })
})

