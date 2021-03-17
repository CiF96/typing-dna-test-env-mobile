import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { constants } from "~/style/constants";
import { View } from "./View";

export interface DividerProps {
  vertical?: boolean;
  thickness?: number;
  color?: ViewStyle["borderColor"];
}

export const Divider = ({
  vertical,
  thickness = StyleSheet.hairlineWidth,
  color = constants.colorBackgroundLightDarker,
}: DividerProps) => {
  return (
    <View
      style={{
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 0,
        borderColor: color,
        borderWidth: thickness,
      }}
    />
  );
};
