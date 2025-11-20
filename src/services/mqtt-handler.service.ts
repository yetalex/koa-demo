import { subscribe } from "@libs/mqtt.js"
import { config } from '@config/index.js'

// 处理接收到的命令
function handleCommand(topic: string, message: Buffer) {
    try {
        const command = JSON.parse(message.toString())
        console.log('收到命令：', command)

        // 根据命令类型执行不同操作
        switch(command.type) {
            case 'restart':
                console.log('执行重启命令')
                break;
            case 'update':
                console.log('执行更新命令：', command.params)
                break;
            default:
                console.log('未知命令类型：', command.type)
        }
    } catch (error) {
        console.error('解析命令失败：', error)
    }
}

// 处理状态信息
function handleStatus(topic: string, message: Buffer) {
    console.log('设备状态更新：', message.toString())
}

// 初始化所有订阅处理器
export function initMqttHandlers() {
    subscribe(config.mqttTopics.command, handleCommand)
    subscribe(config.mqttTopics.status, handleStatus)
    console.log('MQTT消息处理器已初始化')
}
