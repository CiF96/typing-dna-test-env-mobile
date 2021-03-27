import React from "react";
import { observer } from "mobx-react";
import _ from "lodash";
import { useNavigation } from "@react-navigation/core";
import LinearGradient from "react-native-linear-gradient";

import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/Button";
import { ImageWithLoader } from "~/components/ImageWithLoader";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { StackNavigationProp } from "~/router/RouterTypes";
import { constants } from "~/style/constants";
import { shadow } from "~/utils/shadow";
import { useLoginForm } from "./useLoginForm";

export const LoginForm = observer(function LoginForm() {
  const navigation = useNavigation<StackNavigationProp>();

  const { fields, isValid, submitForm } = useLoginForm();

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
              sign in to your account
            </Text>
            <Text colorDarkSofter>
              or{" "}
              <Text
                weightBold
                colorTheme
                onPress={() => {
                  navigation.navigate("RegisterScreen");
                }}
              >
                create your account
              </Text>
            </Text>
          </View>
          <Spacer medium />

          <Spacer medium />
          <TextInput
            label="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            {...fields.email}
          />
          <Spacer small />
          <TextInput
            label="password"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            {...fields.password}
          />
          <Spacer medium />
          <Button title="sign in" disabled={!isValid} onPress={submitForm} />
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
