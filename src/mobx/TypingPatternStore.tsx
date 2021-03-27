import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { AxiosResponse } from "axios";

import { Response } from "~/types/Response";
import { getRoot } from "./utils/getRoot";
import { getEnv } from "./utils/getEnv";

export interface TypingPatternStoreInstance
  extends Instance<typeof TypingPatternStore> {}
export interface TypingPatternStoreSnapshotIn
  extends SnapshotIn<typeof TypingPatternStore> {}
export interface TypingPatternStoreSnapshotOut
  extends SnapshotOut<typeof TypingPatternStore> {}

export const TypingPatternStore = types
  .model("TypingPatternStore", {
    anyTextEnrollmentsLeft: types.optional(types.number, 0),
    sameTextEnrollmentsLeft: types.optional(types.number, 0),
    extendedEnrollmentsLeft: types.optional(types.number, 0),
  })

  .actions((self) => ({
    updateExtendedEnrollmentsLeft(numberOfEnrollments: number) {
      self.extendedEnrollmentsLeft = numberOfEnrollments;
    },
    updateAnyTextEnrollmentsLeft(numberOfEnrollments: number) {
      self.anyTextEnrollmentsLeft = numberOfEnrollments;
    },
    updateSametextEnrollmentsLeft(numberOfEnrollments: number) {
      self.sameTextEnrollmentsLeft = numberOfEnrollments;
    },
  }))

  .actions((self) => ({
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
        switch (params.pattern_type) {
          case "0":
            self.updateAnyTextEnrollmentsLeft(response.data.enrollments_left);
            break;
          case "1":
            self.updateSametextEnrollmentsLeft(response.data.enrollments_left);
            break;
          case "2":
            self.updateExtendedEnrollmentsLeft(response.data.enrollments_left);
            break;
          default:
            break;
        }
      }

      return response;
    }),

    readUserInfo: flow<
      Response<{
        anyTextEnrollmentsLeft: number;
        sameTextEnrollmentsLeft: number;
        extendedEnrollmentsLeft: number;
      }>,
      [{ user_id: string }]
    >(function* readUserInfo(params): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.get("/user-info", {
        params,
      });

      self.updateAnyTextEnrollmentsLeft(response.data.anyTextEnrollmentsLeft);
      self.updateSametextEnrollmentsLeft(response.data.sameTextEnrollmentsLeft);
      self.updateExtendedEnrollmentsLeft(response.data.extendedEnrollmentsLeft);
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
  }));
