import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { constants } from "~/style/constants";
import { View } from "./View";

export interface DividerProps {
  vertical?: boolean;
  width?: number;
  color?: ViewStyle["borderColor"];
}

export const Divider = ({
  vertical,
  width = StyleSheet.hairlineWidth,
  color = constants.colorBackgroundLightDark,
}: DividerProps) => {
  return (
    <View
      style={{
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 1,
        borderColor: color,
        borderWidth: width,
      }}
    />
  );
};
