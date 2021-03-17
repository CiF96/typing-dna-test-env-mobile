import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { constants } from "~/style/constants";
import { shadow } from "~/utils/shadow";

export const DashboardScreen = observer(function DashboardScreen() {
  return (
    <Screen>
      <View paddingSmall flex style={{ backgroundColor: "#DBEAFE" }}>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: constants.colorBackgroundLight,
            ...shadow(2),
          }}
        />
      </View>
    </Screen>
  );
});
