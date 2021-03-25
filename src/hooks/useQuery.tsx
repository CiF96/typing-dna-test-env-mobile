import { useRef, useState } from "react";
import {
  QueryConfig,
  QueryFunction,
  QueryKey,
  useQuery as RQuseQuery,
} from "react-query";

export interface Response<Data> {
  data: Data;
}

export function useQuery<TResult extends Response<any>, TError extends Error>(
  key: QueryKey,
  queryFn: QueryFunction<TResult>,
  config?: QueryConfig<TResult, TError>
) {
  const query = RQuseQuery(key, queryFn, config);

  // This will tell us where to render the error message
  // refetch - render in the header
  // undefined - render in the content area
  const errorSource = useRef<"refetch" | undefined>(undefined);
  const isRefetchError = query.isError && errorSource.current === "refetch";

  // react-query doesn't keep track of this so we have to do it ourselves
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async function onRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    errorSource.current = "refetch";
    await query.refetch().finally(() => {
      setIsRefreshing(false);
    });
  };

  return {
    ...query,
    isRefreshing,
    onRefresh,
    isRefetchError,
  };
}
