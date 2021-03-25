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
import { useAnyTextPatternForm } from "./useAnyTextPatternForm";
import { IconButton } from "~/components/IconButton";

export const AnyTextPatternForm = observer(function AnyTextPatternForm() {
  const { fields, isValid, submitForm } = useAnyTextPatternForm();
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
          <Text weightBold>Any Text pattern form</Text>
          <Text sizeSmall colorDarkSofter>
            This is a mock email form. You should write an email of about 120
            characters for the best verification accuracy.
          </Text>
        </View>

        <Divider />
        <View paddingMedium>
          <TextInput
            label="random text"
            multiline
            numberOfLines={3}
            autoCorrect={false}
            textAlignVertical="top"
            style={{ minHeight: styleConstants.windowWidth * 0.5 }}
            {...fields.text}
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

          <Spacer medium />
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
