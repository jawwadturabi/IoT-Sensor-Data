/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIncomingData = /* GraphQL */ `
  query GetIncomingData($deviceId: ID!, $timestamp: AWSTimestamp!) {
    getIncomingData(deviceId: $deviceId, timestamp: $timestamp) {
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
export const listIncomingDatas = /* GraphQL */ `
  query ListIncomingDatas(
    $deviceId: ID
    $timestamp: ModelIntKeyConditionInput
    $filter: ModelIncomingDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIncomingDatas(
      deviceId: $deviceId
      timestamp: $timestamp
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
export const getUserDeviceMapping = /* GraphQL */ `
  query GetUserDeviceMapping($clientId: ID!, $deviceId: ID!) {
    getUserDeviceMapping(clientId: $clientId, deviceId: $deviceId) {
      clientId
      deviceId
      timestamp
      deviceType
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOutgoingData = /* GraphQL */ `
  query GetOutgoingData($deviceId: ID!, $timestamp: AWSTimestamp!) {
    getOutgoingData(deviceId: $deviceId, timestamp: $timestamp) {
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
export const listOutgoingDatas = /* GraphQL */ `
  query ListOutgoingDatas(
    $deviceId: ID
    $timestamp: ModelIntKeyConditionInput
    $filter: ModelOutgoingDataFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOutgoingDatas(
      deviceId: $deviceId
      timestamp: $timestamp
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        deviceId
        timestamp
        deviceType
        clientId
        payload {
          setTemp
        }
      }
      nextToken
    }
  }
`;
