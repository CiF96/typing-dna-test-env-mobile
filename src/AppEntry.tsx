import "mobx-react-lite/batchingForReactNative";

import React, { useEffect, useState, useRef } from "react";
import { Provider } from "mobx-react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { createHttp } from "~/services/http/createHttp";
import { createPersistence } from "~/services/createPersistence";
import { ModalProvider } from "~/components/ModalProvider";
import { createStore } from "~/mobx/createStore";
import { RootStoreInstance } from "./mobx/RootStore";
import { Router } from "./router/Router";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { Platform } from "react-native";
import { createQueryCache } from "./services/createQueryCache";
import { Splash } from "./features/splash/Splash";

async function initialize() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const queryCache = createQueryCache();

  const http = createHttp();
  const persistence = createPersistence();
  const store = await createStore({ http, persistence });
  await store.authStore.watchToken();
  await store.authStore.silentLogin();

  return { store, queryCache };
}

export function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const store = useRef<RootStoreInstance | undefined>(undefined);
  const queryCache = useRef<QueryCache | undefined>(undefined);

  useEffect(() => {
    initialize().then((context) => {
      store.current = context.store;
      queryCache.current = context.queryCache;
      setIsReady(true);
    });
  }, []);

  return (
    <>
      {isReady && (
        <Provider store={store.current}>
          <ReactQueryCacheProvider queryCache={queryCache.current}>
            <SafeAreaProvider>
              <KeyboardAvoidingView
                enabled={Platform.select({ android: false, default: true })}
                behavior="padding"
                style={{ flex: 1 }}
              >
                <ModalProvider>
                  <Router />
                </ModalProvider>
              </KeyboardAvoidingView>
            </SafeAreaProvider>
          </ReactQueryCacheProvider>
        </Provider>
      )}
      <Splash isReady={isReady} />
    </>
  );
}
