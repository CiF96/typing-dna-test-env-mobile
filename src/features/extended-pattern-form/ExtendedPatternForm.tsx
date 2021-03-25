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
import { useExtendedPatternForm } from "./useExtendedPatternForm";
import { StyleSheet } from "react-native";
import { IconButton } from "~/components/IconButton";
import { useStore } from "~/mobx/utils/useStore";

export const ExtendedPatternForm = observer(function ExtendedPatternForm() {
  const { fields, isValid, submitForm } = useExtendedPatternForm();
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
          <Text weightBold>Extended pattern form</Text>
          <Text sizeSmall colorDarkSofter>
            This is a form we use to test the{" "}
            <Text sizeSmall style={{ color: "blue" }} weightBold>
              typingdna
            </Text>{" "}
            extended patterns. Please re-write the text below in to the text
            field as accurate as possible.
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
            quote to be rewritten
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
              I ran into Ku Klux Klan and the threat of hurricanes, and those
              two things made me decide not to build on the Alabama coast, so we
              came back to Memphis.
            </Text>
          </View>
          <Spacer small />
          <TextInput
            label="quote"
            multiline
            numberOfLines={3}
            autoCorrect={false}
            textAlignVertical="top"
            style={{ minHeight: styleConstants.windowWidth * 0.5 }}
            {...fields.quoteText}
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
