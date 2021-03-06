import React from "react";
import {
  Platform,
  ImageProps,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";
import Color from "color";
import { observer } from "mobx-react";

import { Text, TextProps } from "~/components/Text";
import { View, ViewProps } from "~/components/View";
import { constants as C } from "~/style/constants";
import { shadow } from "~/utils/shadow";
import { ImageWithLoader } from "./ImageWithLoader";

interface AvatarProps {
  source: string | ImageSourcePropType;
  /** extraSmall=24, small=30, medium=40, large=60, extraLarge=80, giant=100  windowed=window.width*0.33 */
  extraSmall?: boolean;
  /** extraSmall=24, small=30, medium=40, large=60, extraLarge=80 giant=100  windowed=window.width*0.33 */
  small?: boolean;
  /** extraSmall=24, small=30, medium=40, large=60, extraLarge=80 giant=100  windowed=window.width*0.33 */
  medium?: boolean;
  /** extraSmall=24, small=30, medium=40, large=60, extraLarge=80 giant=100  windowed=window.width*0.33 */
  large?: boolean;
  /** extraSmall=24, small=30, medium=40, large=60, extraLarge=80 giant=100  windowed=window.width*0.33 */
  extraLarge?: boolean;
  giant?: boolean;
  round?: boolean;
  windowed?: boolean;

  style?: ViewProps["style"] & ImageProps["style"];
}

export const Avatar = observer(function Avatar({
  source,
  extraSmall,
  small,
  medium,
  large,
  extraLarge,
  giant,
  windowed,
  round = true,
  style: inheritedStyle,
  ...props
}: AvatarProps) {
  const window = useWindowDimensions();
  const size = extraSmall
    ? 24
    : small
    ? 30
    : medium
    ? 40
    : large
    ? 60
    : extraLarge
    ? 80
    : giant
    ? 100
    : windowed
    ? window.width * 0.33
    : 40;

  const borderRadius = round ? size * 0.5 : 0;
  const style: ViewProps["style"] & ImageProps["style"] = {
    backgroundColor: C.colorBackgroundLight,
    ...shadow(1),
    width: size,
    height: size,
    borderRadius,
  };

  const textStyle: TextProps["style"] = {
    color: Color(C.colorBackgroundTheme).isDark()
      ? C.colorTextLight
      : C.colorTextDark,
    fontSize: size * 0.6,
    lineHeight: Platform.select({ android: 100, default: 0 }),
  };

  if (typeof source === "string") {
    const firstLetter = source[0] ?? "";
    return (
      <View centerContent style={[style, inheritedStyle]} {...props}>
        <Text style={textStyle}>{firstLetter.toUpperCase()}</Text>
      </View>
    );
  }

  return (
    <ImageWithLoader
      source={source}
      style={[style, inheritedStyle]}
      {...props}
    />
  );
});
