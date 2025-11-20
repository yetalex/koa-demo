import app from './app.js'
import { config } from '@config/index.js'
import { startDataGenerator } from '@services/data-generator.service.js'
import { initMqttHandlers } from '@services/mqtt-handler.service.js'

// 初始化MQTT消息处理器
initMqttHandlers()

// 启动数据生成器（每5秒发送一次）
const stopDataGenerator = startDataGenerator(5000)

const server = app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`)
})

const shutdown = () => {
    console.log('正在关闭服务器...')
    stopDataGenerator()  // 停止数据生成器
    server.close(() => {
        console.log('服务器已关闭')
        process.exit(0)
    })

}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
