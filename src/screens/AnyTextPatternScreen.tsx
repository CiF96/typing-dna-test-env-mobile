import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { AnyTextPatternForm } from "~/features/any-text-pattern-form/AnyTextPatternForm";

export const AnyTextScreen = observer(function AnyTextScreen() {
  return (
    <Screen>
      <AnyTextPatternForm />
    </Screen>
  );
});
