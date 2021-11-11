const awsIot = require("aws-iot-device-sdk");
const { v4: uuidv4 } = require("uuid");
const device = awsIot.device({
  keyPath:
    "./cert/7fd8579b7ab08f6a9fa0031393a1f7c8d5df6c904aa302353edfdafc1b086917-private.pem.key",
  certPath:
    "./cert/7fd8579b7ab08f6a9fa0031393a1f7c8d5df6c904aa302353edfdafc1b086917-certificate.pem.crt",
  caPath: "./cert/AmazonRootCA1.pem",
  clientId: "test_mqtt",
  region: "us-east-1",
  host: "aejg02mfy45d2-ats.iot.us-east-1.amazonaws.com",
});

device.on("connect", () => {
  console.log("Connect");
  setInterval(async () => {
    const deviceId = "test_mqtt";
    const deviceType = "Water Heater";
    const payload = {
      currentTemp: Math.floor(Math.random() * 65),
      pressure: (Math.random() * 1.5).toFixed(2),
      uvIndex: (Math.random() * 100).toFixed(2),
      waterConsumption: (Math.random() * 200).toFixed(2),
      energyConsumption: (Math.random() * 200).toFixed(2),
    };
    await device.publish(
      "iot/topic",
      JSON.stringify({
        test_data: {
          deviceId,
          deviceType,
          payload,
        },
      })
    );
    console.log("Message sent : ", payload);
  }, 10000);
});

device.on("message", (topic, payload) => {
  console.log("Message", topic, payload.toString());
});
