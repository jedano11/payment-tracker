import axios from 'axios';
import { endpointUrl } from '../config/env';

let token;

export const setToken = (tok: string) => {
  token = tok;
};

export const resolveUrl = (url: string, path: string) =>
  `${url.replace(/^\/+|\/+$/g, '')}/${path.replace(/^\/+|\/+$/g, '')}`;

export const request = (method: string, route: string, params: any = {}) => {
  const url = resolveUrl(endpointUrl, route);

  const key = method.toLowerCase() === 'get' ? 'params' : 'data';
  const baseRequestConfig = {
    method,
    url,
    [key]: params,
  };

  const requestConfig = token
    ? { ...baseRequestConfig, headers: { Authorization: `bearer ${token}` } }
    : baseRequestConfig;

  return axios.request(requestConfig).then(res => res.data);
};
