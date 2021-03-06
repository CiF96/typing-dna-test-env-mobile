import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { LoginForm } from "~/features/login-form/login-form.component";

export const FormExample = observer(function FormExample() {
  return (
    <Screen withoutBottomTabBar>
      <LoginForm
        onSignInSuccess={() => {
          console.warn("Successfully logged in");
        }}
        onForgotPasswordPress={() => {
          console.warn('"Forgot password" pressed');
        }}
        onRegisterPress={() => {
          console.warn('"Register" pressed');
        }}
      />
    </Screen>
  );
});
