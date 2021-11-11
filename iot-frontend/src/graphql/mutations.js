/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUserStatus = /* GraphQL */ `
  mutation UpdateUserStatus($clientId: String, $deviceId: String) {
    updateUserStatus(clientId: $clientId, deviceId: $deviceId) {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
export const createIncomingData = /* GraphQL */ `
  mutation CreateIncomingData(
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
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserDeviceMappingInput!
    $condition: ModelUserDeviceMappingConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserDeviceMappingInput!
    $condition: ModelUserDeviceMappingConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
export const createOutgoingData = /* GraphQL */ `
  mutation CreateOutgoingData(
    $input: CreateOutgoingDataInput!
    $condition: ModelOutgoingDataConditionInput
  ) {
    createOutgoingData(input: $input, condition: $condition) {
      deviceId
      timestamp
      deviceType
      clientId
      payload {
        setTemp
      }
    }
  }
`;
