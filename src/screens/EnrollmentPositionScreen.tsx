import { observer } from "mobx-react";
import React from "react";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";

export const EnrollmentPositionScreen = observer(
  function EnrollmentPositionScreen() {
    const store = useStore();

    const setEnrollmentPosition = store.uiStore.setEnrollmentPosition;
    return (
      <Screen withoutBottomTabBar withoutHeader>
        <View flex paddingMedium>
          {[
            { id: 1, desc: "Jednpalcani unos" },
            { id: 2, desc: "Unos jednim prstom" },
            { id: 3, desc: "Dvopalcani unos" },
            { id: 4, desc: "Unos jednim prstom stol" },
            { id: 5, desc: "Unos dva prsta stol" },
            { id: 6, desc: "Horizontalni unos" },
          ].map((enrollmentPosition) => {
            return (
              <TouchableOpacity
                key={enrollmentPosition.id.toString()}
                onPress={() => {
                  setEnrollmentPosition(enrollmentPosition.id);
                }}
                alignItemsCenter
                flexDirectionRow
                paddingMedium
              >
                <Text>{enrollmentPosition.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Screen>
    );
  }
);
