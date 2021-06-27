import React, { createContext, useState } from 'react';
import { GetCustomerResponse } from '../models/ApiModels';
import apiService from '../services/apiService';

type UserContextData = {
  customerId: string;
  fetchLatestCustomerData(): void;
  isFetchingLatestCustomerData: boolean;
  latestCustomerData?: GetCustomerResponse;
};

// Use mock data
const mockUserContextData: UserContextData = {
  customerId: '447364c7-36f9-4a45-b424-ffde62bfaee4',
  fetchLatestCustomerData: () => {},
  isFetchingLatestCustomerData: false,
};

export const UserContext = createContext<UserContextData>(mockUserContextData);

export const UserContextProvider: React.FC = ({ children }) => {
  const customerId = mockUserContextData.customerId;

  const [latestCustomerData, setLatestCustomerData] =
    useState<GetCustomerResponse>();
  const [isFetchingLatestCustomerData, setIsFetchingLatestCustomerData] =
    useState(false);

  const fetchLatestCustomerData = () => {
    setIsFetchingLatestCustomerData(true);
    apiService
      .getCustomerDetails(customerId)
      .then((customerData) => {
        console.log('Fetched latest customer data', customerData);

        setLatestCustomerData(customerData);
        setIsFetchingLatestCustomerData(false);
      })
      .catch((err) => {
        console.error('Error fetching latest customer data', err);

        setIsFetchingLatestCustomerData(false);
      });
  };

  const userContextData = {
    ...mockUserContextData,
    isFetchingLatestCustomerData,
    latestCustomerData,
    fetchLatestCustomerData,
  };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};
