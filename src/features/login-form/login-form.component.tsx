import React from "react";
import { observer } from "mobx-react";

import { View } from "~/components/View";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { Modal } from "~/components/ModalProvider";
import { TextInput } from "~/components/TextInput";
import { Text } from "~/components/Text";

import { useLoginForm } from "./use-login-form.hook";

export interface LoginFormProps {
  onSignInSuccess: () => any;
  onRegisterPress: () => any;
  onForgotPasswordPress: () => any;
}

export const LoginForm = observer(
  ({
    onSignInSuccess,
    onRegisterPress,
    onForgotPasswordPress,
  }: LoginFormProps) => {
    const { fields, isSubmitting, isValid, submitForm } = useLoginForm({
      onSignInSuccess,
    });

    return (
      <View flex paddingExtraLarge>
        <Text weightBold>Login</Text>
        <Spacer />

        <TextInput
          label="Email"
          placeholder="john.doe@email.com"
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          spellCheck={false}
          blurOnSubmit={false}
          maxLength={50}
          {...fields.email}
        />
        <Spacer small />

        <TextInput
          label="Password"
          placeholder="********"
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          spellCheck={false}
          textContentType="password"
          {...fields.password}
        />
        <Spacer extraLarge />

        <Button onPress={submitForm} disabled={!isValid} title="Sign in" />
        {isSubmitting && <Modal />}

        <Spacer large />

        <Button onPress={onForgotPasswordPress} title="Forgot password?" />

        <Spacer />

        <Button onPress={onRegisterPress} title="Register" />
      </View>
    );
  }
);
