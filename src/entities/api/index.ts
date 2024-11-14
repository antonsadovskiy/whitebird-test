import axios from 'axios';

export class Api {
  public static readonly axios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
  });
}
