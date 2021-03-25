import React from "react";
import { observer } from "mobx-react";

import { View } from "~/components/View";
import { shadow } from "~/utils/shadow";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { Divider } from "~/components/Divider";
import { Spacer } from "~/components/Spacer";
import { Button } from "~/components/Button";
import { constants, constants as styleConstants } from "~/style/constants";
import { useSameTextPatternForm } from "./useSameTextPatternForm";
import { IconButton } from "~/components/IconButton";
import { RadioGroup } from "~/components/RadioGroup";
import { RadioButton } from "~/components/RadioButton";
import { useStore } from "~/mobx/utils/useStore";
import { StyleSheet } from "react-native";

export const SameTextPatternForm = observer(function SameTextPatternForm() {
  const { fields, isValid, submitForm } = useSameTextPatternForm();
  const store = useStore();
  const enrollmentsLeft = store.authStore.enrollmentsLeft;

  return (
    <View paddingSmall justifyContentCenter flex>
      <View
        style={{
          borderRadius: 8,
          backgroundColor: styleConstants.colorBackgroundLight,
          ...shadow(2),
        }}
      >
        <View paddingVerticalSmall paddingHorizontalMedium>
          <Text weightBold>Same Text pattern form</Text>
          <Text sizeSmall colorDarkSofter>
            This is a form we use to test the{" "}
            <Text sizeSmall style={{ color: "blue" }} weightBold>
              typingdna
            </Text>{" "}
            same-text patterns. Please re-write the credentials underneath
            exactly as they say.
          </Text>
        </View>

        <Divider />
        {enrollmentsLeft > 0 && (
          <>
            <Spacer medium />
            <View centerContent>
              <Text weightBold style={{ color: "green" }}>
                Enrollments left before verification - {enrollmentsLeft}
              </Text>
            </View>
          </>
        )}
        <View paddingMedium>
          <Text weightBold sizeSmall>
            credentials
          </Text>
          <Spacer small />
          <View
            paddingMedium
            style={{
              borderRadius: 8,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: styleConstants.colorTextDarkSofter,
            }}
          >
            <Text sizeSmall colorDarkSoft>
              email: test@lloyds.design
            </Text>
            <Text sizeSmall colorDarkSoft>
              password: test12345678
            </Text>
          </View>
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
            // secureTextEntry
            {...fields.password}
          />
          <Spacer medium />
          <Text weightBold sizeLarge>
            position
          </Text>
          <Spacer small />
          <View centerContent>
            <View flexDirectionRow alignItemsCenter>
              <IconButton
                iconName="chevron-left"
                iconSize={30}
                iconColor={constants.colorBackgroundDark}
                onPress={fields.position.onDecreasePress}
              />
              <Spacer medium />
              <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
                {fields.position.value}
              </Text>
              <Spacer medium />
              <IconButton
                iconName="chevron-right"
                iconSize={30}
                iconColor={constants.colorBackgroundDark}
                onPress={fields.position.onIncreasePress}
              />
            </View>
          </View>
          <Spacer medium />
          <RadioGroup {...fields.selectedKeyboardType}>
            <View flexDirectionRow alignItemsCenter>
              <RadioButton value="tap" />
              <Spacer medium />
              <Text>Tap</Text>
            </View>
            <Spacer small />
            <View flexDirectionRow alignItemsCenter>
              <RadioButton value="swipe" />
              <Spacer medium />
              <Text>Swipe</Text>
            </View>
            <Spacer small />
            <View flexDirectionRow alignItemsCenter>
              <RadioButton value="other" />
              <Spacer medium />
              <Text>Other</Text>
            </View>
          </RadioGroup>
          <Spacer medium />
          <Button
            title={enrollmentsLeft > 0 ? "enroll" : "verify"}
            disabled={!isValid}
            onPress={submitForm}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </View>
  );
});
