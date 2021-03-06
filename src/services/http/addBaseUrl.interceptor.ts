import { AxiosRequestConfig } from "axios";

export function addBaseUrl(getBaseUrl: () => string | undefined) {
  return (config: AxiosRequestConfig) => {
    const baseUrl = getBaseUrl();
    if (typeof baseUrl === "undefined") return config;

    config.baseURL = baseUrl;

    return config;
  };
}
