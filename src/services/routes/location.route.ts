import { publicBaseUrl } from '.';

const baseUrl = `${publicBaseUrl}/locations/countries`;

const LocationRoute = {
  fetchCountries: `${baseUrl}`,
  fetchStates: (countryIsoCode: string) => `${baseUrl}/${countryIsoCode}/states`,
  fetchCities: (countryIsoCode: string, stateIsoCode: string) =>
    `${baseUrl}/${countryIsoCode}/states/${stateIsoCode}/cities`,
};

export default LocationRoute;
