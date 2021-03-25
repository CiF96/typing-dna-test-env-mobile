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

export const SameTextPatternForm = observer(function SameTextPatternForm() {
  const { fields, isValid, submitForm } = useSameTextPatternForm();

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
            This is a mock text area form. Here we are testing the typingDna
            solution for pre-written text. You have to rewrite the presented
            quote as accurate as possible.
          </Text>
        </View>

        <Divider />
        <View paddingMedium>
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
                iconName="minus"
                iconSize={30}
                iconColor={constants.colorBackgroundDark}
                onPress={fields.position.onDecreasePress}
              />
              <Spacer medium />
              <Text weightBold style={{ fontSize: 30 }}>
                {fields.position.value}
              </Text>
              <Spacer medium />
              <IconButton
                iconName="plus"
                iconSize={30}
                iconColor={constants.colorBackgroundDark}
                onPress={fields.position.onIncreasePress}
              />
            </View>
          </View>
          <Button
            title="send"
            disabled={!isValid}
            onPress={submitForm}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </View>
  );
});
