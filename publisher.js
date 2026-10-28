require('dotenv').config();
const mqtt = require('mqtt');

const url = process.env.MQTT_URL;
const topic = process.env.MQTT_TOPIC;

const client = mqtt.connect(url, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 1000
});

// 连接成功后，定时发送模拟温度
client.on('connect', () => {
  console.log("[PUB] MQTT连接成功");
  // 每2000毫秒（2秒）发送一次数据
  setInterval(() => {
    // 模拟传感器JSON数据：设备ID + 随机温度20~30℃
    const sensorData = {
      deviceId: "sensor-001",
      temperature: 20 + Math.random() * 10
    }
    // JS对象转JSON字符串
    const payload = JSON.stringify(sensorData);
    // 发布消息到主题
    client.publish(topic, payload, (err) => {
      if (err) {
        console.log("[PUB] 消息发送失败", err);
      } else {
        console.log(`[PUB] 已发送数据: ${payload}`);
      }
    })
  }, 2000)
})

client.on('error', (err) => {
  console.log("[PUB] 发生错误：", err);
})