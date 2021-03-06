import React, { ReactNode } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  StyleSheet,
} from "react-native";

import { constants as C } from "~/style/constants";
import { View } from "./View";
import { Text } from "./Text";
import { Spacer } from "./Spacer";
import Collapsible from "react-native-collapsible";

const S = StyleSheet.create({
  baseStyle: {
    paddingHorizontal: C.spacingMedium,
    margin: 0,
    minHeight: 40,
    backgroundColor: C.colorBackgroundLight,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  labelSeparator: { height: 8 },
});

export interface TextInputProps extends RNTextInputProps {
  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;

  weightLight?: boolean;
  weightRegular?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;
  weightExtraBold?: boolean;
  forwardedRef?: React.Ref<RNTextInput>;

  label?: string;
  error?: boolean;
  caption?: string;

  children?: ReactNode;
}

class TextInput extends React.PureComponent<TextInputProps> {
  render() {
    const {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorDark,
      colorDarkSoft,
      colorDarkSofter,
      colorLight,
      colorLightSoft,
      colorLightSofter,

      weightLight,
      weightRegular,
      weightSemiBold,
      weightBold,
      weightExtraBold,

      forwardedRef,
      style,

      label = "",
      error = false,
      caption = "",

      ...props
    } = this.props;

    let fontSize: TextStyle["fontSize"] = C.fontSizeMedium;
    let lineHeight: TextStyle["lineHeight"] = 20;
    if (sizeExtraSmall) {
      fontSize = C.fontSizeExtraSmall;
      lineHeight = 12;
    } else if (sizeSmall) {
      fontSize = C.fontSizeSmall;
      lineHeight = 16;
    } else if (sizeMedium) {
      fontSize = C.fontSizeMedium;
      lineHeight = 20;
    } else if (sizeLarge) {
      fontSize = C.fontSizeLarge;
      lineHeight = 22;
    } else if (sizeExtraLarge) {
      fontSize = C.fontSizeExtraLarge;
      lineHeight = 26;
    }

    let color: TextStyle["color"] = C.colorTextDark;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    let fontFamily: TextStyle["fontFamily"] = "Manrope-Regular";
    if (weightLight) {
      fontWeight = C.fontWeightLight;
      fontFamily = "Manrope-Light";
    } else if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      fontFamily = "Manrope-Regular";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      fontFamily = "Manrope-SemiBold";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      fontFamily = "Manrope-Bold";
    } else if (weightExtraBold) {
      fontWeight = C.fontWeightExtraBold;
      fontFamily = "Manrope-ExtraBold";
    }

    const borderColor = error ? C.colorTextDanger : C.colorTextDarkSofter;
    return (
      <View>
        {Boolean(label) && (
          <Text sizeLarge weightBold>
            {label}
          </Text>
        )}
        {Boolean(label) && <View style={S.labelSeparator} />}
        <RNTextInput
          ref={forwardedRef}
          selectionColor={C.colorBackgroundThemeSofter}
          style={[
            S.baseStyle,
            {
              fontSize,
              color,
              fontWeight,
              fontFamily,
              borderColor,
              lineHeight,
            },
            style,
          ]}
          {...props}
        />

        <Collapsible collapsed={!caption}>
          <View>
            <Spacer extraSmall />
            <Text sizeSmall colorDanger={error}>
              {caption}
            </Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

const TextInputWithRef = React.forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    return <TextInput forwardedRef={ref} {...props} />;
  }
);

export { TextInputWithRef as TextInput };
