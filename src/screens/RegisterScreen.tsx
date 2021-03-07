import React from "react";
import { observer } from "mobx-react";
import _ from "lodash";

import { Screen } from "~/components/Screen";
import { RegisterForm } from "~/features/register-form/RegisterForm";

export const RegisterScreen = observer(function RegisterScreen() {
  return (
    <Screen withoutBottomTabBar withoutHeader preventScroll>
      <RegisterForm />
    </Screen>
  );
});
