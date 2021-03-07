import React from "react";
import { observer } from "mobx-react";
import _ from "lodash";

import { Screen } from "~/components/Screen";
import { LoginForm } from "~/features/login-form/LoginForm";

export const LoginScreen = observer(function LoginScreen() {
  return (
    <Screen withoutBottomTabBar withoutHeader preventScroll>
      <LoginForm />
    </Screen>
  );
});
