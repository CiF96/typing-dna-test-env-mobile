import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { Button } from "~/components/Button";
import { useNavigation } from "@react-navigation/native";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Screen>
      <View paddingMedium>
        <Button
          title="Query example"
          onPress={() => navigation.navigate("QueryExample")}
        />

        <Spacer />

        <Button
          title="Dropdown example"
          onPress={() => navigation.navigate("DropdownExample")}
        />

        <Spacer />

        <Button
          title="Form example"
          onPress={() => navigation.navigate("FormExample")}
        />
      </View>
    </Screen>
  );
});
