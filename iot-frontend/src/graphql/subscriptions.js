/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onUpdateIncomingData = /* GraphQL */ `
  subscription OnUpdateIncomingData {
    onUpdateIncomingData {
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
export const onDeleteIncomingData = /* GraphQL */ `
  subscription OnDeleteIncomingData {
    onDeleteIncomingData {
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
export const onCreateUserDeviceMapping = /* GraphQL */ `
  subscription OnCreateUserDeviceMapping {
    onCreateUserDeviceMapping {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserDeviceMapping = /* GraphQL */ `
  subscription OnUpdateUserDeviceMapping {
    onUpdateUserDeviceMapping {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserDeviceMapping = /* GraphQL */ `
  subscription OnDeleteUserDeviceMapping {
    onDeleteUserDeviceMapping {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOutgoingData = /* GraphQL */ `
  subscription OnCreateOutgoingData {
    onCreateOutgoingData {
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
export const onUpdateOutgoingData = /* GraphQL */ `
  subscription OnUpdateOutgoingData {
    onUpdateOutgoingData {
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
export const onDeleteOutgoingData = /* GraphQL */ `
  subscription OnDeleteOutgoingData {
    onDeleteOutgoingData {
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
