import mqtt from 'mqtt'

// 连接选项
const options = {
    clean: true,  // true: 清除会话，false: 保留会话
    connectTimeout: 4000,  // 超时时间
    // 认证信息
    clientId: 'emqx_test',
    username: 'emqx_test',
    password: 'emqx_test'
}

const connectUrl = 'mqtt://localhost:1883/mqtt'
const client = mqtt.connect(connectUrl, options)

client.on('connect', () => {
    console.log('连接成功')
    client.subscribe('message', (err) => {
        if (!err) {
            client.publish('message', 'Hello mqtt')
        }
    })
})

client.on('reconnect', () => {
    console.log('正在重连')
})

client.on('error', (error) => {
    console.log('连接失败：', error)
})

client.on('message', (topic, message) => {
    console.log('收到消息：', topic, message.toString())
    client.end()
})