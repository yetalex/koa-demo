import mqtt from 'mqtt'
import { config } from '@config/index.js'

const client = mqtt.connect(config.mqttUrl)

// 消息处理器映射： topic -> handler
const messageHandlers = new Map<string, (topic: string, message: Buffer) => void>()

client.on('connect', () => {
    console.log('MQTT 连接成功')
    // 订阅所有配置的topic
    Object.values(config.mqttTopics).forEach(topic => {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error(`订阅${topic}失败：`, err)
            } else {
                console.log(`已订阅：${topic}`)
            }
        })
    })
})

client.on('reconnect', () => console.log('MQTT 正在重连'))
client.on('error', (err) => console.log('MQTT 错误', err))

client.on('message', (topic, msg) => {
    console.log('收到消息： ', topic, msg.toString())
    // 调用注册的处理器
    const handler = messageHandlers.get(topic)
    if (handler) {
        handler(topic, msg)
    }
})

// 导出publish函数
export function publish(topic: string, payload: string | Buffer) {
    if (!client.connect) {
        console.warn('MQTT 未连接，消息将丢失')
        return
    }
    client.publish(topic, payload, (err) => {
        if (err) {
            console.error(`发布到${topic}失败：`, err)
        }
    })
}

// d导出subscribe函数（注册消息处理器）
export function subscribe(topic: string, handler: (topic: string, message: Buffer) => void) {
    messageHandlers.set(topic, handler)
    // 如果已连接，立即订阅
    if (client.connected) {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error(`订阅${topic}失败：`, err)
            }
        })
    }
}

// 导出客户端状态检查
export function isConnected(): boolean {
    return client.connected
}