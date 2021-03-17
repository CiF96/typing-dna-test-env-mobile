import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { EmailForm } from "~/features/email-form/EmailForm";

export const EmailScreen = observer(function EmailScreen() {
  return (
    <Screen>
      <EmailForm />
    </Screen>
  );
});
