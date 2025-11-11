import mqtt from 'mqtt'
import { config } from '@config/index.js'

const client = mqtt.connect(config.mqttUrl)

client.on('connect', () => {
    console.log('MQTT 连接成功')
    client.subscribe(config.mqttTopic)
})
client.on('reconnect', () => console.log('MQTT 正在重连'))
client.on('error', (err) => console.log('MQTT 错误', err))
client.on('message', (topic, msg) => {
    console.log('收到消息： ', topic, msg.toString())
})

export function publish(topic: string, payload: string | Buffer) {
    client.publish(topic, payload)
}