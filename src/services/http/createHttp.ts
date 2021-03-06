import Axios, { AxiosInstance } from "axios";

import { constants } from "~/constants";

import { addToken } from "./addToken.interceptor";
import { requestLogger } from "./requestLogger.interceptor";
import { responseLogger } from "./responseLogger.interceptor";
import { errorLogger } from "./errorLogger.interceptor";
import { addBaseUrl } from "./addBaseUrl.interceptor";

interface Http extends AxiosInstance {
  setToken: (token: string | undefined) => any;
  setBaseUrl: (token: string | undefined) => any;
}

export function createHttp(axios = Axios) {
  const state: { token: string | undefined; baseUrl: string | undefined } = {
    token: undefined,
    baseUrl: undefined,
  };
  const http = axios.create({
    baseURL: constants.BASE_URL,
  }) as Http;

  http.interceptors.request.use(addToken(() => state.token));
  http.interceptors.request.use(requestLogger);
  http.interceptors.request.use(addBaseUrl(() => state.baseUrl));
  http.interceptors.response.use(responseLogger, errorLogger);

  http.setToken = (token) => {
    state.token = token;
  };

  http.setBaseUrl = (baseUrl) => {
    state.baseUrl = baseUrl;
  };

  return http;
}

export interface HttpStatic extends ReturnType<typeof createHttp> {}
