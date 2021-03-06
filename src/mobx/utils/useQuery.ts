import _ from "lodash";
import { useCallback, useMemo, useReducer, useLayoutEffect } from "react";
import { runInAction } from "mobx";
import { getChildType, IMSTMap, IAnyModelType } from "mobx-state-tree";

import { isPromise } from "~/utils/isPromise";
import { useStore } from "~/mobx/utils/useStore";
import { RootStoreInstance as StoreInstance } from "~/mobx/RootStore";
import {
  createRefList,
  RefListInstance,
} from "~/mobx/util-models/createRefList";

const getResourceListFromResponse = (response: any): any[] => {
  return response.data;
};
const getNextPageFromResponse = (response: any): number => {
  return (response?.meta?.current_page ?? 0) + 1;
};
const getIsEndReachedFromResponse = (response: any): boolean => {
  return !response?.links?.next;
};

const initialState = {
  nextPage: 1,
  isLoading: true,
  isRefreshing: false,
  isFirstLoad: true,
  isFetchingNext: false,
  isEndReached: false,
  error: undefined as Error | undefined,
};
type Action =
  | { type: "fetch first" }
  | { type: "refresh" }
  | { type: "fetch next" }
  | { type: "fetch success"; response: any }
  | { type: "fetch error"; error: Error };

const reducer = (
  state: typeof initialState,
  action: Action
): typeof initialState => {
  switch (action.type) {
    case "fetch first": {
      if (state.isFirstLoad) return state;
      return { ...state, isFirstLoad: true, isLoading: true };
    }
    case "fetch next": {
      if (state.isRefreshing && !state.isFirstLoad && !state.isFetchingNext)
        return state;

      return {
        ...state,
        isLoading: true,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: true,
      };
    }
    case "refresh": {
      if (state.isRefreshing && !state.isFirstLoad && !state.isFetchingNext)
        return state;

      return {
        ...state,
        isLoading: true,
        isRefreshing: true,
        isFirstLoad: false,
        isFetchingNext: false,
      };
    }
    case "fetch success": {
      return {
        ...state,
        nextPage: getNextPageFromResponse(action.response),
        isEndReached: getIsEndReachedFromResponse(action.response),
        isLoading: false,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: false,
      };
    }
    case "fetch error": {
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: false,
        error: action.error,
      };
    }
  }
};

export function useQuery<ResourceModel extends IAnyModelType>(
  resolver: (
    store: StoreInstance
  ) => {
    query: (...args: any[]) => any;
    resourceMap: IMSTMap<ResourceModel>;
    refList?: RefListInstance<ResourceModel>;
  },
  deps: any[] = []
) {
  const store = useStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const context = useMemo(() => resolver(store), deps);
  const { query, resourceMap } = context;
  const isFetchListFnReady = typeof query === "function";

  const [state, dispatch] = useReducer(
    reducer,
    isFetchListFnReady
      ? initialState
      : { ...initialState, isLoading: false, isFirstLoad: false }
  );

  const localRefList = useMemo(() => {
    if (context.refList) return;

    const Resource = getChildType(resourceMap) as ResourceModel;
    const refListName = "RefList_" + Math.random();
    const refList = createRefList(refListName, Resource, {
      get: (id) => resourceMap.get(id.toString()) as ResourceModel["Type"],
      set: (e) => e.id,
    }).create();

    return refList;
  }, [context.refList, resourceMap]);

  const refList = (context.refList ?? localRefList) as RefListInstance<
    ResourceModel
  >;

  const fetchFirst = useCallback(async () => {
    if (!isFetchListFnReady) return;
    const promise = query({ page: 1 });
    if (!isPromise(promise)) {
      // this clears the loading state when response fetchFn isn't ready
      // example: search term is to short so we get null from context.query;
      dispatch({ type: "fetch success", response: {} });
      return;
    }

    dispatch({ type: "fetch first" });
    try {
      const response = await promise;
      runInAction(() => {
        refList.replace(
          _.castArray(getResourceListFromResponse(response)).map((e) => e.id)
        );
        dispatch({ type: "fetch success", response });
      });
    } catch (error) {
      console.warn("error in useQuery::fetchFirst", error);
      dispatch({ type: "fetch error", error });
    }
  }, [refList, query, isFetchListFnReady]);

  const fetchNext = useCallback(async () => {
    if (state.isEndReached || state.isFetchingNext) return;
    if (!isFetchListFnReady) return;

    const promise = query({ page: state.nextPage });
    if (!isPromise(promise)) return;

    dispatch({ type: "fetch next" });
    try {
      const response = await promise;
      runInAction(() => {
        for (const e of _.castArray(getResourceListFromResponse(response))) {
          refList.push(e.id);
        }
        dispatch({ type: "fetch success", response });
      });
    } catch (error) {
      console.warn("error in useQuery::fetchNext", error);
      dispatch({ type: "fetch error", error });
    }
  }, [
    refList,
    query,
    isFetchListFnReady,
    state.isEndReached,
    state.isFetchingNext,
    state.nextPage,
  ]);

  const refresh = useCallback(async () => {
    if (!isFetchListFnReady) return;
    const promise = query({ page: 1 });
    if (!isPromise(promise)) return;

    dispatch({ type: "refresh" });
    try {
      const response = await promise;
      runInAction(() => {
        refList.replace(
          _.castArray(getResourceListFromResponse(response)).map((e) => e.id)
        );
        dispatch({ type: "fetch success", response });
      });
    } catch (error) {
      console.warn("error in useQuery::refresh", error);
      dispatch({ type: "fetch error", error });
    }
  }, [refList, query, isFetchListFnReady]);

  useLayoutEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  return {
    nextPage: state.nextPage,
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    isFirstLoad: state.isFirstLoad,
    isFetchingNext: state.isFetchingNext,
    isEndReached: state.isEndReached,
    data: refList.array,
    fetch,
    fetchFirst,
    fetchNext,
    refresh,
    flatListProps: {
      data: refList.array,
      extraData: refList.map((e) => e.id).join(":"),
      refreshing: state.isRefreshing,
      onRefresh: refresh,
      onEndReached: fetchNext,
    },
  };
}
