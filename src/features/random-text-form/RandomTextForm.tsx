import React from "react";
import { observer } from "mobx-react";

import { View } from "~/components/View";
import { shadow } from "~/utils/shadow";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { Divider } from "~/components/Divider";
import { Spacer } from "~/components/Spacer";
import { Button } from "~/components/Button";
import { constants as styleConstants } from "~/style/constants";
import { useRandomTextForm } from "./useRandomTextForm";
import { StyleSheet } from "react-native";

export const RandomTextForm = observer(function RandomTextForm() {
  const { fields, isValid, submitForm } = useRandomTextForm();

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
          <Text weightBold>Random text</Text>
          <Text sizeSmall colorDarkSofter>
            This is a mock text area form. Here we are testing the typingDna
            solution for pre-written text. You have to rewrite the presented
            quote as accurate as possible.
          </Text>
        </View>

        <Divider />
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
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
          <Spacer small />
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
