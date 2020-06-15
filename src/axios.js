import axios from 'axios';

export const baseURL = 'https://justjoinv2.herokuapp.com';

export default axios.create({
  baseURL,
});
