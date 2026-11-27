import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data);
};

const getByCountry = (country) => {
  return axios
    .get(`${countryUrl}/${country}`)
    .then((response) => response.data)
};

export default { getAll, getByCountry }