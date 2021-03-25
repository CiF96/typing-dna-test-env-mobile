import { observer } from "mobx-react";
import React from "react";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { shadow } from "~/utils/shadow";

export const EnrollmentPositionScreen = observer(
  function EnrollmentPositionScreen() {
    const store = useStore();

    const setEnrollmentPosition = store.uiStore.setEnrollmentPosition;
    return (
      <Screen withoutBottomTabBar withoutHeader>
        <Spacer medium />
        <Text alignCenter weightBold sizeExtraLarge>
          Pick the required enrollment position
        </Text>
        <View flex paddingMedium>
          {[
            {
              id: 1,
              desc:
                "Typing with the thumb while holding the phone in the same hand",
            },
            {
              id: 2,
              desc:
                "Typing with one hand while holding the phone in the other hand",
            },
            {
              id: 3,
              desc:
                "Typing with both hands while holding the phone in both hands",
            },
            {
              id: 4,
              desc: "Typing with one hand while holding the phone on a surface",
            },
            {
              id: 5,
              desc:
                "Typing with both hands while holding the phone on a surface",
            },
            { id: 6, desc: "Typing in landscape orientation" },
          ].map((enrollmentPosition) => {
            return (
              <>
                <TouchableOpacity
                  key={enrollmentPosition.id.toString()}
                  onPress={() => {
                    setEnrollmentPosition(enrollmentPosition.id);
                  }}
                  flexDirectionRow
                  paddingMedium
                  style={{
                    backgroundColor: "white",
                    ...shadow(2),
                    borderRadius: 8,
                  }}
                >
                  {/* <EnrollmentPositionIcon
                    positionId={enrollmentPosition.id}
                    size={50}
                  /> */}
                  <View paddingHorizontalMedium centerContent>
                    <Text style={{ fontSize: 40, lineHeight: 52 }} weightBold>
                      {enrollmentPosition.id}
                    </Text>
                  </View>
                  <Spacer medium />
                  <View flex>
                    <Text weightBold sizeLarge>
                      Description:
                    </Text>
                    <Spacer small />
                    <Text>{enrollmentPosition.desc}</Text>
                  </View>
                </TouchableOpacity>
                <Spacer small />
              </>
            );
          })}
        </View>
      </Screen>
    );
  }
);
