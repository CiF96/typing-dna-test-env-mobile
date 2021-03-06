import { AxiosRequestConfig } from "axios";

export function addToken(getToken: () => string | undefined) {
  return (config: AxiosRequestConfig) => {
    const token = getToken();
    // Skip if no token available
    if (!token) return config;

    // Skip if Authorization header is already present
    if (config.headers.Authorization || config.headers.authorization)
      return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  };
}
