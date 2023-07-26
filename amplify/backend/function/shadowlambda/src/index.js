const AWS = require("aws-sdk");
const iotClient = new AWS.Iot();

let iotDataClient;
exports.handler = async (event) => {
  // TODO implement
  console.log("event", event);
  const params = event.queryStringParameters;
  console.log("params", params);
  let body;
  let statusCode = 200;
  let headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
  if (!iotDataClient) {
    const result = await iotClient.describeEndpoint().promise();
    iotDataClient = new AWS.IotData({ endpoint: result.endpointAddress });
  }
  try {
    const shadowDetails = await iotDataClient
      .updateThingShadow({
        thingName: params.thingName,
        payload: JSON.stringify({
          state: {
            desired: {
              SetTemp: params.setTemp,
            },
            reported: {
              CurrentTemp: params.currentTemp,
              SetTemp: params.setTemp,
            },
          },
        }),
      })
      .promise();
    body = JSON.stringify(shadowDetails);
  } catch (e) {
    statusCode = "400";
    body = e.message;
  }
  //TODO: shadowDetails.payload can return an error. We must check. For  now it is like a fire and foreget.
  const response = {
    statusCode,
    headers,
    body,
  };
  return response;
};
