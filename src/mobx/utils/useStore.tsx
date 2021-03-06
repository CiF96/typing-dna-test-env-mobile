import React from "react";
import { MobXProviderContext } from "mobx-react";

import { RootStoreInstance } from "../RootStore";

export function useStore(): RootStoreInstance {
  return React.useContext(MobXProviderContext).store;
}
