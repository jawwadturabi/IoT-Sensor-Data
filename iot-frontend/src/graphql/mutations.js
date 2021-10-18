/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const updateIncomingData = /* GraphQL */ `
  mutation UpdateIncomingData(
    $input: UpdateIncomingDataInput!
    $condition: ModelIncomingDataConditionInput
  ) {
    updateIncomingData(input: $input, condition: $condition) {
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
export const deleteIncomingData = /* GraphQL */ `
  mutation DeleteIncomingData(
    $input: DeleteIncomingDataInput!
    $condition: ModelIncomingDataConditionInput
  ) {
    deleteIncomingData(input: $input, condition: $condition) {
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
export const createUserDeviceMapping = /* GraphQL */ `
  mutation CreateUserDeviceMapping(
    $input: CreateUserDeviceMappingInput!
    $condition: ModelUserDeviceMappingConditionInput
  ) {
    createUserDeviceMapping(input: $input, condition: $condition) {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
    }
  }
`;
export const updateUserDeviceMapping = /* GraphQL */ `
  mutation UpdateUserDeviceMapping(
    $input: UpdateUserDeviceMappingInput!
    $condition: ModelUserDeviceMappingConditionInput
  ) {
    updateUserDeviceMapping(input: $input, condition: $condition) {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserDeviceMapping = /* GraphQL */ `
  mutation DeleteUserDeviceMapping(
    $input: DeleteUserDeviceMappingInput!
    $condition: ModelUserDeviceMappingConditionInput
  ) {
    deleteUserDeviceMapping(input: $input, condition: $condition) {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
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
export const updateOutgoingData = /* GraphQL */ `
  mutation UpdateOutgoingData(
    $input: UpdateOutgoingDataInput!
    $condition: ModelOutgoingDataConditionInput
  ) {
    updateOutgoingData(input: $input, condition: $condition) {
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
export const deleteOutgoingData = /* GraphQL */ `
  mutation DeleteOutgoingData(
    $input: DeleteOutgoingDataInput!
    $condition: ModelOutgoingDataConditionInput
  ) {
    deleteOutgoingData(input: $input, condition: $condition) {
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
