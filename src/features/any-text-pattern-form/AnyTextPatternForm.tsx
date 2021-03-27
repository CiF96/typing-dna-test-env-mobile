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
import { useStore } from "~/mobx/utils/useStore";
import { useQuery } from "~/hooks/useQuery";
import { StyleSheet } from "react-native";
import { Spinner } from "~/components/Spinner";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { RadioGroup } from "~/components/RadioGroup";
import { RadioButton } from "~/components/RadioButton";

export const AnyTextPatternForm = observer(function AnyTextPatternForm() {
  const {
    fields,
    isValid,
    submitForm,
    resetTypingDna,
  } = useAnyTextPatternForm();
  const store = useStore();
  const enrollmentsLeft = store.authStore.anyTextEnrollmentsLeft;

  const quoteQuery = useQuery("quoteQuery", (_key: any) => {
    return store.authStore.readQuote();
  });

  const quote = quoteQuery.data?.data.quote.quote;

  console.log({ quote });

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
            This is a form we use to test the{" "}
            <Text sizeSmall style={{ color: "blue" }} weightBold>
              typingdna
            </Text>{" "}
            any-text patterns. Please re-write the quote underneath - only the
            length is crucial - the quote does not to be rewritten perfectly.
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
          <Button title="reset" onPress={resetTypingDna} />
          <Spacer small />
          {fields.selectedKeyboardType.selectedValue === "tap" && (
            <>
              <Text weightBold sizeSmall>
                quote to be rewritten
              </Text>
              <Spacer small />
              <TouchableOpacity
                onPress={() => {
                  quoteQuery.refetch();
                }}
                paddingMedium
                style={{
                  borderRadius: 8,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: styleConstants.colorTextDarkSofter,
                }}
              >
                {quoteQuery.isLoading ? (
                  <Spinner size="large" />
                ) : (
                  <Text sizeSmall colorDarkSoft>
                    {quote}
                  </Text>
                )}
              </TouchableOpacity>
              <Spacer small />
            </>
          )}
          <TextInput
            label="random text"
            multiline
            numberOfLines={3}
            autoCorrect={false}
            textAlignVertical="top"
            style={{ minHeight: styleConstants.windowWidth * 0.5 }}
            disableFullscreenUI
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
          <Text weightBold sizeLarge>
            experiment type
          </Text>
          <Spacer small />
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
          </RadioGroup>
          <Spacer medium />
          <Button
            title={enrollmentsLeft > 0 ? "enroll" : "verify"}
            disabled={!isValid}
            onPress={() => {
              quoteQuery.refetch();
              submitForm();
            }}
            style={{ alignSelf: "flex-end" }}
          />
        </View>
      </View>
    </View>
  );
});
