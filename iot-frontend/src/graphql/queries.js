/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserDeviceMapping = /* GraphQL */ `
  query GetUserDeviceMapping($clientId: ID!, $deviceId: ID!) {
    getUserDeviceMapping(clientId: $clientId, deviceId: $deviceId) {
      clientId
      deviceId
      timestamp
      deviceType
    }
  }
`;
export const listUserDeviceMappings = /* GraphQL */ `
  query ListUserDeviceMappings(
    $clientId: ID
    $deviceId: ModelIDKeyConditionInput
    $filter: ModelUserDeviceMappingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserDeviceMappings(
      clientId: $clientId
      deviceId: $deviceId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        clientId
        deviceId
        timestamp
        deviceType
      }
      nextToken
    }
  }
`;
export const dataByTimestamp = /* GraphQL */ `
  query DataByTimestamp(
    $deviceId: ID
    $timestamp: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIncomingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dataByTimestamp(
      deviceId: $deviceId
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
