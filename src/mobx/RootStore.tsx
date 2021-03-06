import { types, Instance } from "mobx-state-tree";

import { AuthStore } from "./Auth";
import { ConfigStore } from "./entities/config/ConfigStore";
import { I18n } from "./I18n";
import { UserStore } from "./entities/user/UserStore";
import { PersonStore } from "./entities/person/PersonStore";
import { UIStore } from "./UIStore";
import { TypingPatternStore } from "./TypingPatternStore";

export const RootStore = types.model("RootStore", {
  configStore: types.optional(ConfigStore, {}),
  authStore: types.optional(AuthStore, {}),
  i18n: types.optional(I18n, {}),
  userStore: types.optional(UserStore, {}),
  personStore: types.optional(PersonStore, {}),
  typingPatternStore: types.optional(TypingPatternStore, {}),
  uiStore: types.optional(UIStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
