import { QueryCache } from "react-query";

export function createQueryCache() {
  const queryCache = new QueryCache({
    defaultConfig: {
      queries: {
        cacheTime: 60 * 1000,
        ...(__DEV__ ? { retry: false } : {}),
        structuralSharing: false,
        getFetchMore(lastPage: any) {
          // Laravel specific
          if (lastPage?.links?.next) {
            return lastPage.meta.current_page + 1;
          }

          return null;
        },
      },
      mutations: {
        throwOnError: true,
      },
    },
  });

  return queryCache;
}
