import React, { forwardRef } from "react";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { IconProps } from "~/components/Icon";
import { ButtonProps } from "~/components/Button";
import { StyleSheet } from "react-native";

export interface IconButtonProps extends ButtonProps {
  iconName: IconProps["name"];
  iconSize?: IconProps["size"];
  iconColor?: IconProps["color"];
  iconStyle?: IconProps["style"];
}

const HIT_SLOP: ButtonProps["hitSlop"] = {
  top: 4,
  right: 4,
  bottom: 4,
  left: 4,
};

const S = StyleSheet.create({
  noPadding: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
});

export const IconButton = forwardRef<Button, IconButtonProps>(
  ({ iconName, iconSize, iconColor, iconStyle, style, ...props }, ref: any) => {
    return (
      <Button
        ref={ref}
        hitSlop={HIT_SLOP}
        transparent
        style={[S.noPadding, style]}
        {...props}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={iconStyle}
        />
      </Button>
    );
  }
);
