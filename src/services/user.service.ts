// 一个简单的内存用户表，仅用于示例，需要改为数据库
const users = new Map<string, { id: string; username: string; password: string }>([
    [
        'admin',
        {
            id: '1',
            username: 'admin',
            password: 'password123'
        }
    ]
])

export async function authenticateUser(username: string, password: string) {
    const record = users.get(username)

    if (!record || record.password !== password) {
        return null
    }

    // 真实场景可返回token、权限等，这里只返回最小信息
    return {
        id: record.id,
        username: record.username
    }
}