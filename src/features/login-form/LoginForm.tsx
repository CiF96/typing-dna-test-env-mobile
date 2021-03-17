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
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
// import tdna from "typingdnarecorder-react-native";

export const LoginForm = observer(function LoginForm() {
  const navigation = useNavigation<StackNavigationProp>();
  const store = useStore();
  const enrollmentsLeft = store.authStore.enrollmentsLeft;
  // const emailNativeId = useRef(null);
  // const passwordNativeId = useRef(null);

  // const [
  //   emailAndPasswordTypingPattern,
  //   setEmailAndPasswordTypingPattern,
  // ] = useState("");

  const { fields, isValid, submitForm } = useLoginForm();

  // useEffect(() => {
  //   setTimeout(() => {
  //     tdna.initialize();
  //     tdna.start();
  //     tdna.addTarget(emailNativeId.current);
  //     tdna.addTarget(passwordNativeId.current);
  //   }, 2000);

  //   return () => {
  //     tdna.stop();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (passwordNativeId != null) {
  //     setTimeout(() => {
  //       tdna.addTarget(passwordNativeId);
  //     }, 2000);
  //   }
  // }, [passwordNativeId]);

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
            {enrollmentsLeft > 0 ? (
              <>
                <Text sizeExtraLarge weightBold>
                  enroll new typing pattern
                </Text>
                <Spacer extraSmall />
                <Text sizeSmall alignCenter>
                  Enrollments left before verification -{" "}
                  <Text
                    weightBold
                    sizeSmall
                    style={{ color: "green" }}
                    alignCenter
                  >
                    {enrollmentsLeft}
                  </Text>
                </Text>
              </>
            ) : (
              <>
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
              </>
            )}
          </View>
          <Spacer medium />

          <Spacer medium />
          <TextInput
            // ref={(ref) => {
            //   if (ref != null) {
            //     //@ts-ignore
            //     emailNativeId.current = ref._nativeTag;
            //   }
            // }}
            label="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            {...fields.email}
          />
          <Spacer small />
          <TextInput
            // ref={(ref) => {
            //   if (ref != null) {
            //     //@ts-ignore
            //     passwordNativeId.current = ref._nativeTag;
            //   }
            // }}
            label="password"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            {...fields.password}
          />
          <Spacer medium />
          <Button
            title={enrollmentsLeft > 0 ? "enroll" : "sign in"}
            disabled={!isValid}
            onPress={submitForm}

            // onPress={async () => {
            //   const emailAndPasswordValue = `${fields.email.value}${fields.password.value}`;

            //   tdna.getTypingPattern(
            //     1,
            //     emailAndPasswordValue.length,
            //     emailAndPasswordValue,
            //     0,
            //     (tp: string) => {
            //       console.log({ emailAndPassword: tp });
            //       setEmailAndPasswordTypingPattern(tp);
            //     }
            //   );

            //   // tdna.getTypingPattern(
            //   //   1,
            //   //   emailAndPasswordValue.length,
            //   //   emailAndPasswordValue,
            //   //   0,
            //   //   (tp: string) => {
            //   //     console.log({ password: tp });
            //   //     setPasswordTypingPattern(tp);
            //   //   }
            //   // );
            //   await submitForm();
            // }}
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
