import React from "react";
import { observer } from "mobx-react";
import _ from "lodash";
import LinearGradient from "react-native-linear-gradient";

import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/Button";
import { ImageWithLoader } from "~/components/ImageWithLoader";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { constants } from "~/style/constants";
import { shadow } from "~/utils/shadow";
import { useRegisterForm } from "./useRegisterForm";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "~/router/RouterTypes";

export const RegisterForm = observer(function RegisterForm() {
  const navigation = useNavigation<StackNavigationProp>();
  const { fields, isValid, submitForm } = useRegisterForm();

  return (
    <LinearGradient colors={["#3b82f6", "white"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: constants.spacingMedium,
          flexGrow: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          paddingMedium
          style={{ backgroundColor: "white", borderRadius: 8, ...shadow(1) }}
        >
          <View alignItemsCenter>
            <View style={{ width: 100, aspectRatio: 1 }}>
              <ImageWithLoader
                source={require("~/assets/typingdna-logo.png")}
              />
            </View>
            <Text sizeExtraLarge weightBold>
              create your account
            </Text>
            <Text colorDarkSofter>
              or{" "}
              <Text
                weightBold
                colorTheme
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                sign in with an existing acount
              </Text>
            </Text>
          </View>

          <Spacer medium />
          <TextInput
            label="first name"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            {...fields.firstName}
          />

          <Spacer small />

          <TextInput
            label="last name"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
            {...fields.lastName}
          />
          <Spacer small />

          <TextInput
            nativeID="email"
            placeholder="email"
            label="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            {...fields.email}
          />
          <Spacer small />

          <TextInput
            nativeID="password"
            placeholder="password"
            label="password"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            {...fields.password}
          />
          <Spacer small />

          <TextInput
            label="confirm password"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            {...fields.confirmPassword}
          />
          <Spacer medium />

          <Button
            title="create account"
            disabled={!isValid}
            onPress={submitForm}
          />
        </View>
        <Spacer small />
        <Text colorDarkSoft alignCenter>
          This is a testing environment for the typingDna api and is not
          intended for commercial use.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
});
