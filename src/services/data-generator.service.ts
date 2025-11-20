import { publish } from '@libs/mqtt.js'
import { config } from '@config/index.js'

// 生成数据的函数
function generateData() {
    return {
        timestamp: Date.now(),
        temperature: Math.random() * 30 + 20,  // 20 - 50 度
        humidity: Math.random() * 100,
        deviceId: 'device-001'
    }
}

// 定期发送数据
export function startDataGenerator(intervalMs: number = 5000) {
    const intervalId = setInterval(() => {
        const data = generateData()
        const payload = JSON.stringify(data)

        publish(config.mqttTopics.data, payload)
        console.log('已发送数据：', data)
    }, intervalMs)

    console.log(`数据生成器已启动，间隔：${intervalMs}ms`)

    // 返回停止函数
    return () => {
        clearInterval(intervalId)
        console.log('数据生成器已停止')
    }
}