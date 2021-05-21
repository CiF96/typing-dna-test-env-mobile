import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { autorun } from "mobx";
import { AxiosResponse } from "axios";

import { constants } from "~/constants";
import { Response } from "~/types/Response";
import { User, UserInstance } from "./entities/user/User";
import { getRoot } from "./utils/getRoot";
import { getEnv } from "./utils/getEnv";

export interface AuthStoreInstance extends Instance<typeof AuthStore> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStore> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStore> {}

export const AuthStore = types
  .model("AuthStore", {
    activeUser: types.safeReference(User),
    token: types.maybe(types.string),
  })
  .views((self) => {
    return {
      get isLoggedIn() {
        return Boolean(self.token && self.activeUser);
      },
    };
  })
  .actions((self) => ({
    processAuthUser({ user, token }: { user: any; token: string }) {
      const root = getRoot(self);
      root.userStore.process(user);
      if (token !== undefined) self.token = token;
      self.activeUser = user.id;
      return self.activeUser;
    },
  }))
  .actions((self) => ({
    silentLogin: flow(function* silentLogin(): any {
      const env = getEnv(self);

      try {
        if (!self.token) return;
        const response: AxiosResponse = yield env.http.get("/me");
        self.processAuthUser(response.data);
        return true;
      } catch (error) {
        console.log("error in silent login", error.message);
        self.token = undefined;
        return false;
      }
    }),

    logout() {
      const root = getRoot(self);
      self.token = undefined;
      self.activeUser = undefined;
      root.typingPatternStore.verificationCounts.clearAllVerificationCounts();
      root.uiStore.setEnrollmentPosition(undefined);
    },
  }))
  .actions((self) => ({
    login: flow<
      Response<{
        user: UserInstance;
        typing_dna: any;
        enrollments_left: number;
      }>,
      [
        {
          email: string;
          password: string;
        }
      ]
    >(function* login(params): any {
      const env = getEnv(self);

      const response: AxiosResponse = yield env.http.post("/login", params);

      console.log({
        response,
      });

      response.data.user = self.processAuthUser({
        user: response.data.user,
        token: response.data.token,
      });

      return response;
    }),

    register: flow<
      Response<{
        user: UserInstance;
        typing_dna: any;
        enrollments_left: number;
      }>,
      [
        {
          name: string;
          last_name: string;
          email: string;
          password: string;
          password_confirmation: string;
        }
      ]
    >(function* register(params): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.post(`/register`, params);

      console.log({
        response,
      });

      response.data.user = self.processAuthUser({
        user: response.data.user,
        token: response.data.token,
      });

      return response;
    }),

    watchToken: flow(function* watchToken(): any {
      const env = getEnv(self);

      // sync token to api and persistence
      self.token = yield env.persistence.get(
        constants.ASYNC_STORAGE_KEYS.TOKEN
      );

      autorun(() => {
        env.persistence.set(constants.ASYNC_STORAGE_KEYS.TOKEN, self.token);
      });

      autorun(() => {
        env.http.setToken(self.token);
      });
    }),
  }));
