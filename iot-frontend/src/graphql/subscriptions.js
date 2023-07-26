/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdatedUser = /* GraphQL */ `
  subscription OnUpdatedUser {
    onUpdatedUser {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
export const onCreateIncomingData = /* GraphQL */ `
  subscription OnCreateIncomingData {
    onCreateIncomingData {
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
export const onDeletedUser = /* GraphQL */ `
  subscription OnDeletedUser {
    onDeletedUser {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
