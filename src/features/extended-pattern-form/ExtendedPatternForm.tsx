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
import { useAlert } from "~/hooks/useAlert";
import { useQueryCache } from "react-query";
import { Spinner } from "~/components/Spinner";
import { Modal } from "~/components/ModalProvider";
import { useIsFocused } from "@react-navigation/native";

export const ExtendedPatternForm = observer(function ExtendedPatternForm() {
  const store = useStore();
  const activeUser = store.authStore.activeUser;
  const isFocused = useIsFocused();
  const queryCache = useQueryCache();
  const alert = useAlert();
  const {
    fields,
    isValid,
    submitForm,
    resetTypingDna,
    isTypingDnaReady,
  } = useExtendedPatternForm();
  const enrollmentsLeft = store.typingPatternStore.extendedEnrollmentsLeft;
  const verificationCounts = store.typingPatternStore.verificationCounts;
  const enrollmentPosition = store.uiStore.selectedEnrollmentPositionId;

  const positionVerificationCount = verificationCounts.positionVerificationCount(
    {
      patternType: 2,
      positionId: fields.position.value as 1 | 2 | 3 | 4 | 5 | 6,
    }
  );

  return (
    <>
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
            <Button title="reset" onPress={resetTypingDna} />
            <Spacer small />
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
                two things made me decide not to build on the Alabama coast, so
                we came back to Memphis.
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
              disableFullscreenUI
              {...fields.quoteText}
            />
            <Spacer medium />
            {enrollmentsLeft === 0 && (
              <>
                <Text alignCenter sizeSmall weightBold colorDarkSoft>
                  Verifications with position {fields.position.value}:{" "}
                  {positionVerificationCount}
                </Text>
                <Spacer medium />
              </>
            )}
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
                <Text
                  colorTheme={fields.position.value === enrollmentPosition}
                  weightBold
                  style={{ fontSize: 30, lineHeight: 40 }}
                >
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
            <View
              flexDirectionRow
              alignItemsCenter
              style={{ justifyContent: "space-between" }}
            >
              <Button
                title="delete patterns"
                colorDanger
                onPress={async () => {
                  if (activeUser == null) {
                    throw new Error("DEV - Active user is null or undefined");
                  }
                  await store.typingPatternStore.deleteUserTypingPatterns({
                    user_id: activeUser?.id,
                    device: "mobile",
                    pattern_type: "2",
                  });

                  store.typingPatternStore.verificationCounts.clearPatternVerificationCount(
                    { patternType: 2 }
                  );

                  await queryCache.refetchQueries(["userInfo"]);

                  alert(
                    "Success",
                    "You successfully deleted your extended typing patterns."
                  );
                }}
              />
              <Button
                title={enrollmentsLeft > 0 ? "enroll" : "verify"}
                disabled={!isValid}
                onPress={async () => {
                  await submitForm();
                }}
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        </View>
      </View>
      {!isTypingDnaReady && isFocused && (
        <Modal>
          <View flex style={{ paddingBottom: 49, paddingTop: 25 }}>
            <View
              flex
              centerContent
              style={{
                backgroundColor: "white",
              }}
            >
              <Spinner size="large" />
              <Spacer small />
              <Text weightBold>Setting up typingDna please wait...</Text>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
});
