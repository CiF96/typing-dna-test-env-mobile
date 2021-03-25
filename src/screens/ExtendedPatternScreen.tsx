import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { ExtendedPatternForm } from "~/features/extended-pattern-form/ExtendedPatternForm";

export const ExtendedScreen = observer(function ExtendedScreen() {
  return (
    <Screen>
      <ExtendedPatternForm />
    </Screen>
  );
});
