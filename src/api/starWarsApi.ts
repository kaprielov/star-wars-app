import axios from 'axios';

const starWarsApi = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

export default starWarsApi;
