import axios from 'axios';

axios.defaults.headers['']

export const api = axios.create({
   baseURL: 'http://localhost:8080/',
   headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': true
   }
});