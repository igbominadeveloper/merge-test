import { useQuery } from '@tanstack/react-query';
import { fetchCities, fetchCountries, fetchStates } from '../clients/location';

export const useFetchCountries = () => {
  const queryKey = ['countries'];

  return useQuery({ queryKey, queryFn: fetchCountries });
};

export const useFetchStates = (countryIsoCode: string) => {
  const queryKey = ['states', countryIsoCode];

  return useQuery({
    queryKey,
    queryFn: () => fetchStates(countryIsoCode),
  });
};

export const useFetchCities = (countryIsoCode: string, stateIsoCode: string) => {
  const queryKey = ['cities', countryIsoCode, stateIsoCode];

  return useQuery({
    queryKey,
    queryFn: () => fetchCities(countryIsoCode, stateIsoCode),
    enabled: !!stateIsoCode,
  });
};
