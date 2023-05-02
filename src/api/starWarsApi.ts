import axios from 'axios';
import { baseURL } from '../common/constants/urls'

const starWarsApi = axios.create({
  baseURL,
});

export default starWarsApi;
