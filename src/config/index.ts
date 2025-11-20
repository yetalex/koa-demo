export const config = {
    port: Number(process.env.PORT || 3000),
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttTopics: {
        data: process.env.MQTT_TOPIC_DATA || 'device/data',
        command: process.env.MQTT_TOPIC_COMMAND || 'device/command',
        status: process.env.MQTT_TOPIC_STATUS || 'device/status'
    }
}