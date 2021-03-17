import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { RandomTextForm } from "~/features/random-text-form/RandomTextForm";

export const RandomTextScreen = observer(function RandomTextScreen() {
  return (
    <Screen>
      <RandomTextForm />
    </Screen>
  );
});
