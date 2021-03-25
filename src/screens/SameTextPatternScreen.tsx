import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";

import { SameTextPatternForm } from "~/features/same-text-pattern-form/SameTextPatternForm";

export const SameTextScreen = observer(function SameTextScreen() {
  return (
    <Screen>
      <SameTextPatternForm />
    </Screen>
  );
});
