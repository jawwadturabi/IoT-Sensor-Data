const reslover = {
  Mutation: {
    updateUserStatus: (ctx) => {
      console.log("args", ctx.arguments);
      return ctx.arguments;
    },
  },
};

exports.handler = async (event) => {
  // TODO implement
  console.log("event", JSON.stringify(event));

  const typeHandler = reslover[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    } else {
      throw new Error("Resolver not found.");
    }
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
