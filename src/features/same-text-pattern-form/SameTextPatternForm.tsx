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
import { useStore } from "~/mobx/utils/useStore";
import { StyleSheet } from "react-native";
import { useAlert } from "~/hooks/useAlert";
import { useQueryCache } from "react-query";
import { Spinner } from "~/components/Spinner";
import { Modal } from "~/components/ModalProvider";
import { useIsFocused } from "@react-navigation/native";

export const SameTextPatternForm = observer(function SameTextPatternForm() {
  const store = useStore();
  const activeUser = store.authStore.activeUser;
  const queryCache = useQueryCache();
  const isFocused = useIsFocused();
  const alert = useAlert();
  const {
    fields,
    isValid,
    submitForm,
    resetTypingDna,
    isTypingDnaReady,
  } = useSameTextPatternForm();
  const enrollmentsLeft = store.typingPatternStore.sameTextEnrollmentsLeft;
  const verificationCounts = store.typingPatternStore.verificationCounts;
  const enrollmentPosition = store.uiStore.selectedEnrollmentPositionId;

  const positionVerificationCount = verificationCounts.positionVerificationCount(
    {
      patternType: 1,
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
            <Button title="reset" onPress={resetTypingDna} />
            <Spacer small />
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
                password: testingtyping123
              </Text>
            </View>
            <TextInput
              label="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              disableFullscreenUI
              {...fields.email}
            />
            <Spacer small />
            <TextInput
              label="password"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              disableFullscreenUI
              // secureTextEntry
              {...fields.password}
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
                    pattern_type: "1",
                  });

                  store.typingPatternStore.verificationCounts.clearPatternVerificationCount(
                    { patternType: 1 }
                  );

                  await queryCache.refetchQueries(["userInfo"]);

                  alert(
                    "Success",
                    "You successfully deleted your same-text typing patterns."
                  );
                }}
              />
              <Button
                title={enrollmentsLeft > 0 ? "enroll" : "verify"}
                disabled={!isValid}
                onPress={submitForm}
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
