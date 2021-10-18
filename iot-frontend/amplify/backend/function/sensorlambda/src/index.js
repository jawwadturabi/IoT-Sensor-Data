const axios = require("axios");
exports.handler = async (event) => {
  console.log("event : " + JSON.stringify(event));
  const { deviceId, deviceType, payload } = event.test_data;
  const timestamp = Date.now();
  const body = {
    variables: {
      input: {
        deviceId,
        deviceType,
        payload,
        timestamp,
      },
    },
    query: `mutation CreateIncomingData(
      $input: CreateIncomingDataInput!
      $condition: ModelIncomingDataConditionInput
    ) {
      createIncomingData(input: $input, condition: $condition) {
        deviceId
        timestamp
        deviceType
        payload {
          currentTemp
          pressure
          uvIndex
          waterConsumption
          energyConsumption
        }
      }
    }`,
  };
  const config = {
    headers: {
      "X-API-Key": "da2-ycnse5hedbbztfros7valxnnum",
    },
  };
  return axios
    .post(
      "https://qhifiojihjeubcbyh3x2k2u6my.appsync-api.us-east-1.amazonaws.com/graphql",
      body,
      config
    )
    .then((response) => console.log("response", JSON.stringify(response.data)))
    .catch((err) => console.log("error", err.data));
};
