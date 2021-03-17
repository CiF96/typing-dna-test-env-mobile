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
import { useEmailForm } from "./useEmailForm";

export const EmailForm = observer(function EmailForm() {
  const { fields, isValid, submitForm } = useEmailForm();
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
          <Text weightBold>Email</Text>
          <Text sizeSmall colorDarkSofter>
            This is a mock email form. You should write an email of about 120
            characters for the best verification accuracy.
          </Text>
        </View>

        <Divider />
        <View paddingMedium>
          <TextInput
            label="recipient"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            {...fields.emailRecipient}
          />
          <Spacer small />
          <TextInput label="subject" {...fields.emailSubject} />
          <Spacer small />
          <TextInput
            label="email"
            multiline
            numberOfLines={3}
            autoCorrect={false}
            textAlignVertical="top"
            style={{ minHeight: styleConstants.windowWidth * 0.5 }}
            {...fields.emailText}
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
