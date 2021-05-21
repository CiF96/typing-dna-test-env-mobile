import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  cast,
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

const VerificationCounts = types
  .model("VerificationCounts", {
    anyText: types.array(types.number),
    sameText: types.array(types.number),
    extended: types.array(types.number),
  })
  .actions((self) => ({
    positionVerificationCount({
      patternType,
      positionId,
    }: {
      patternType: 0 | 1 | 2;
      positionId: 1 | 2 | 3 | 4 | 5 | 6;
    }) {
      if (patternType === 0) {
        return self.anyText[positionId - 1];
      }
      if (patternType === 1) {
        return self.sameText[positionId - 1];
      }
      return self.extended[positionId - 1];
    },
  }))
  .actions((self) => ({
    async increasePositionVerificationCount({
      patternType,
      positionId,
    }: {
      patternType: 0 | 1 | 2;
      positionId: 1 | 2 | 3 | 4 | 5 | 6;
    }) {
      const env = getEnv(self);
      if (patternType === 0) {
        self.anyText[positionId - 1]++;
        await env.persistence.set("anyTextCount", self.anyText);

        return;
      }
      if (patternType === 1) {
        self.sameText[positionId - 1]++;
        await env.persistence.set("sameTextCount", self.sameText);

        return;
      }
      self.extended[positionId - 1]++;
      await env.persistence.set("extendedCount", self.extended);

      return;
    },
    async clearPatternVerificationCount({
      patternType,
    }: {
      patternType: 0 | 1 | 2;
    }) {
      const env = getEnv(self);

      if (patternType === 0) {
        self.anyText = cast([0, 0, 0, 0, 0, 0]);
        await env.persistence.set("anyTextCount", self.anyText);

        return;
      }
      if (patternType === 1) {
        self.sameText = cast([0, 0, 0, 0, 0, 0]);
        await env.persistence.set("sameTextCount", self.sameText);

        return;
      }
      self.extended = cast([0, 0, 0, 0, 0, 0]);
      await env.persistence.set("extendedCount", self.extended);

      return;
    },
    async clearAllVerificationCounts() {
      const env = getEnv(self);
      self.anyText = cast([0, 0, 0, 0, 0, 0]);
      self.sameText = cast([0, 0, 0, 0, 0, 0]);
      self.extended = cast([0, 0, 0, 0, 0, 0]);

      await env.persistence.set("anyTextCount", self.anyText);
      await env.persistence.set("sameTextCount", self.sameText);
      await env.persistence.set("extendedCount", self.extended);
    },
  }));

export const TypingPatternStore = types
  .model("TypingPatternStore", {
    anyTextEnrollmentsLeft: types.optional(types.number, 0),
    sameTextEnrollmentsLeft: types.optional(types.number, 0),
    extendedEnrollmentsLeft: types.optional(types.number, 0),
    verificationCounts: types.optional(VerificationCounts, {
      anyText: [0, 0, 0, 0, 0, 0],
      sameText: [0, 0, 0, 0, 0, 0],
      extended: [0, 0, 0, 0, 0, 0],
    }),
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

      const params = {
        min_length: 140,
        max_length: 180,
      };

      const response: AxiosResponse = yield env.http.get("/quote", { params });

      console.log({ response });

      return response;
    }),

    readTypingPatternData: flow<
      Response<{
        typing_dna: any;
        enrollments_left: number;
        is_save?: boolean | null;
      }>,
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
          pattern_type?: "0" | "1" | "2";
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

    afterAttach: flow(function* afterAttach(): any {
      const env = getEnv(self);
      const anyTextVerifications = yield env.persistence.get("anyTextCount");
      const sameTextVerifications = yield env.persistence.get("sameTextCount");
      const extendedVerifications = yield env.persistence.get("extendedCount");

      self.verificationCounts.anyText =
        cast(anyTextVerifications) ?? cast([0, 0, 0, 0, 0, 0]);
      self.verificationCounts.sameText =
        cast(sameTextVerifications) ?? cast([0, 0, 0, 0, 0, 0]);
      self.verificationCounts.extended =
        cast(extendedVerifications) ?? cast([0, 0, 0, 0, 0, 0]);

      yield env.persistence.set(
        "anyTextCount",
        self.verificationCounts.anyText
      );
      yield env.persistence.set(
        "sameTextCount",
        self.verificationCounts.sameText
      );
      yield env.persistence.set(
        "extendedCount",
        self.verificationCounts.extended
      );
    }),
  }));
