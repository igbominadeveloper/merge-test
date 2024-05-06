import { APIResponse } from '@/types/general';
import LocationRoute from '../routes/location.route';
import apiHandler from '../api-handler';

const headers = {
  'x-created-by': 'system',
};

interface State {
  isoCode: string;
  countryCode: string;
  latitude: string;
  name: string;
  longitude: string;
}

interface Country {
  flag: string;
  timezones: [
    {
      gmtOffsetName: string;
      gmtOffset: string;
      zoneName: string;
      abbreviation: string;
      tzName: string;
    },
  ];
  isoCode: string;
  latitude: string;
  walletCountryCode: string;
  name: string;
  phonecode: string;
  currency: string;
  longitude: string;
}

interface City {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
}

export const fetchCountries = async () => {
  const response = await apiHandler.get<APIResponse<Country[]>>(LocationRoute.fetchCountries, {
    headers,
  });

  return response.data.data;
};

export const fetchCities = async (countryIsoCode: string, stateIsoCode: string) => {
  const response = await apiHandler.get<APIResponse<City[]>>(
    LocationRoute.fetchCities(countryIsoCode, stateIsoCode),
    {
      headers,
    },
  );
  return response.data.data;
};

export const fetchStates = async (countryIsoCode: string) => {
  const response = await apiHandler.get<APIResponse<State[]>>(
    LocationRoute.fetchStates(countryIsoCode),
    {
      headers,
    },
  );

  return response.data.data;
};
