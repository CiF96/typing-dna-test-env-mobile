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
    enrollmentsLeft: types.optional(types.number, 0),
  })
  .views((self) => {
    return {
      get isLoggedIn() {
        return Boolean(self.token && self.activeUser);
      },
    };
  })
  .actions((self) => ({
    updateEnrollmentsLeft({
      numberOfEnrollments,
    }: {
      numberOfEnrollments: number;
    }) {
      self.enrollmentsLeft = numberOfEnrollments;
    },
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
      self.token = undefined;
      self.activeUser = undefined;
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

    readQuote: flow<Response<{ quote: any }>, []>(function* readQuote(): any {
      const env = getEnv(self);

      const response: AxiosResponse = yield env.http.get("/quote");

      console.log({ response });

      return response;
    }),

    readTypingPatternData: flow<
      Response<{ typing_dna: any; enrollments_left: number }>,
      [
        {
          user_id: string;
          typing_pattern: string;
          device_type: "mobile" | "desktop";
          pattern_type: "0" | "1" | "2";
          text_id: string;
          selected_position: number;
          keyboard_type?: "tap" | "swipe" | "other";
        }
      ]
    >(function* readTypingPatternData(params): any {
      const env = getEnv(self);
      const root = getRoot(self);
      const enrolledPosition = root.uiStore.selectedEnrollmentPositionId;
      const response: AxiosResponse = yield env.http.post(
        "/typing-pattern-data",
        { enrolled_position: enrolledPosition, ...params }
      );
      console.log({
        response,
      });

      const messageCode = response.data.typing_dna.message_code;

      const shouldUpdateEnrollments = messageCode === 1 || messageCode === 10;

      if (shouldUpdateEnrollments) {
        self.updateEnrollmentsLeft({
          numberOfEnrollments: response.data.enrollments_left,
        });
      }

      return response;
    }),

    deleteUserTypingPatterns: flow<
      Response<{ typing_dna: any; enrollments_left: number }>,
      [
        {
          user_id: string;
          device: "mobile" | "desktop" | "all";
        }
      ]
    >(function* deleteUserTypingPatterns(params): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.post(
        "/delete-user-typing-patterns",
        params
      );

      console.log({
        response,
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
