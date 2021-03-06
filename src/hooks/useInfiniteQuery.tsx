import { useRef, useState } from "react";
import {
  InfiniteQueryConfig,
  QueryFunction,
  QueryKey,
  useInfiniteQuery as RQuseInfiniteQuery,
} from "react-query";
import _ from "lodash";

// You can replace this with the commented PaginatedResponse import
// import { PaginatedResponse } from "~/types/Response";
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export function useInfiniteQuery<
  TResult extends PaginatedResponse<any>,
  TError extends Error
>(
  key: QueryKey,
  queryFn: QueryFunction<TResult>,
  config?: InfiniteQueryConfig<TResult, TError>
) {
  const query = RQuseInfiniteQuery(key, queryFn, {
    getFetchMore(response: TResult) {
      return parseInt(response.next?.split("=").pop() ?? "0");
    },
    ...config,
  });

  // This will tell us where to render the error message
  // refetch - render in the header
  // fetchMore - render in the footer
  const errorSource = useRef<"refetch" | "fetchMore" | undefined>(undefined);
  const isFetchMoreError = query.isError && errorSource.current === "fetchMore";
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

  const onEndReached =
    !query.isFetchingMore && query.canFetchMore && !isFetchMoreError
      ? () => {
          errorSource.current = "fetchMore";
          query.fetchMore();
        }
      : undefined;

  const dataList = _.flatMap(
    query.data,
    (response) => response.results
  ) as TResult["results"];

  return {
    ...query,
    isRefreshing,
    onRefresh,
    onEndReached,
    dataList,
    isFetchMoreError,
    isRefetchError,
  };
}
