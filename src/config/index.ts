export const config = {
    port: Number(process.env.PORT || 3000),
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttTopic: process.env.MQTT_TOPIC || 'message'
}