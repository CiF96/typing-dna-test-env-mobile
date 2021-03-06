import React, { useContext, ReactNode } from "react";
import { TouchableOpacity } from "react-native";

import { Icon } from "~/components/Icon";
import { RadioGroupContext } from "~/components/RadioGroup";
import { View, ViewProps } from "~/components/View";

import { constants as C } from "~/style/constants";

interface RadioButtonProps<T> {
  size?: number;
  value: T;
  children?: ReactNode;
  contentContainerStyle?: ViewProps["style"];
}

export function RadioButton<T>({
  value,
  size = 24,
  contentContainerStyle,
  children,
}: RadioButtonProps<T>) {
  const { onChange, selectedValue } = useContext(RadioGroupContext);

  return (
    <TouchableOpacity
      onPress={() => {
        onChange(value);
      }}
    >
      {children ?? (
        <View flexDirectionRow alignItemsCenter style={contentContainerStyle}>
          <Icon
            size={size}
            name={
              selectedValue === value ? "radio-button-on" : "radio-button-off"
            }
            color={C.colorBackgroundTheme}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
