const Axios = require("axios");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  // TODO implement
  console.log("event", JSON.stringify(event));

  let { eventName, dynamodb } = event.Records ? event.Records[0] : {};
  //   console.log("deletedUserData", JSON.stringify(event.Records));
  let { clientId, deviceId } = new AWS.DynamoDB.Converter.unmarshall(
    dynamodb.Keys
  );
  if (eventName === "REMOVE" || eventName === "INSERT") {
    console.log("dynamodb.Keys.clientId.S", clientId);
    console.log("devic", deviceId);
    const body = {
      variables: {
        clientId: clientId,
        deviceId: deviceId,
      },
      query: `mutation UpdateUserStatus($clientId: String, $deviceId: String) {
        updateUserStatus(clientId: $clientId, deviceId: $deviceId) {
          clientId
          deviceId
        }
      }`,
    };
    const config = {
      headers: {
        "X-API-Key": "da2-kmgplxiadnbfhplmybmkck2exu",
      },
    };
    return await Axios.post(
      "https://bj42hmzyc5gezffh4zqnw3xzri.appsync-api.us-east-1.amazonaws.com/graphql",
      JSON.stringify(body),
      config
    )
      .then((response) => {
        console.log("respnse", JSON.stringify(response.data), body);
        return response.data.data.updateUserStatus;
      })
      .catch((err) => console.log("error", JSON.stringify(err), body));
  }

  //   const response = {
  //     statusCode: 200,
  //     //  Uncomment below to enable CORS requests
  //     //  headers: {
  //     //      "Access-Control-Allow-Origin": "*",
  //     //      "Access-Control-Allow-Headers": "*"
  //     //  },
  //     body: JSON.stringify("Hello from Lambda!"),
  //   };

  //   return response;
};
