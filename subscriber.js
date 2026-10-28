require('dotenv').config();
const mqtt = require('mqtt');

// 读取.env里面的配置
const url = process.env.MQTT_URL;
const topic = process.env.MQTT_TOPIC;

// 创建mqtt客户端，断线自动重连
const client = mqtt.connect(url, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  reconnectPeriod: 1000
});

// 连接成功触发
client.on('connect', () => {
  console.log("[SUB] MQTT连接成功");
  // 订阅指定主题
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`[SUB] 成功订阅主题：${topic}`);
    } else {
      console.log("[SUB] 订阅主题失败！", err);
    }
  })
})

// 收到消息触发
client.on('message', (topic, payload) => {
  // payload是二进制，转字符串打印
  console.log(`[SUB] 收到数据：${payload.toString()}`);
})

// 捕获错误
client.on('error', (err) => {
  console.log("[SUB] 发生错误：", err);
})