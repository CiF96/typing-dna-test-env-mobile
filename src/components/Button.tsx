import React, { ReactNode, useState, forwardRef, useEffect } from "react";
import { TextStyle, StyleSheet, TouchableWithoutFeedback } from "react-native";

import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "~/components/TouchableOpacity";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text, TextProps } from "~/components/Text";
import { View } from "~/components/View";
import { shadow } from "~/utils/shadow";

import { constants as C, constants } from "~/style/constants";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  outline?: boolean;
  transparent?: boolean;
  colorLight?: boolean;
  colorLightDark?: boolean;
  colorLightDarker?: boolean;
  colorDark?: boolean;
  colorDarkLight?: boolean;
  colorDarkLighter?: boolean;
  colorDanger?: boolean;
  colorTheme?: boolean;
  colorAccent?: boolean;
  children?: ReactNode;
  onPress?:
    | TouchableOpacityProps["onPress"]
    | ((...args: any[]) => Promise<any>);
  blockUi?: boolean;
  textProps?: TextProps;
}
export type Button = typeof Button;
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      title,

      sizeSmall = false,
      sizeMedium = false,
      sizeLarge = false,

      outline = false,
      transparent = false,

      colorLight = false,
      colorLightDark = false,
      colorLightDarker = false,
      colorDark = false,
      colorDarkLight = false,
      colorDarkLighter = false,
      colorDanger = false,
      colorTheme = false,
      colorAccent = false,

      style: inheritedStyle,
      disabled,
      children,
      onPress,
      blockUi = true,
      textProps,
      ...props
    },
    ref
  ) => {
    const isMounted = React.useRef<boolean>(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const shouldRenderTitle = typeof title === "string";

    const resolveBackgroundColor = () => {
      if (outline) return "transparent";
      if (transparent) return "transparent";
      if (disabled) return C.colorBackgroundLightDarker;

      if (colorLight) return C.colorBackgroundLight;
      if (colorLightDark) return C.colorBackgroundLightDark;
      if (colorLightDarker) return C.colorBackgroundLightDarker;
      if (colorDark) return C.colorBackgroundDark;
      if (colorDarkLight) return C.colorBackgroundDarkLight;
      if (colorDarkLighter) return C.colorBackgroundDarkLighter;
      if (colorDanger) return C.colorBackgroundDanger;
      if (colorTheme) return C.colorBackgroundTheme;
      if (colorAccent) return C.colorBackgroundAccent;

      return C.colorBackgroundTheme;
    };

    const resolveTextStyle = () => {
      const style: TextStyle = {};

      if (sizeSmall) style.fontSize = C.fontSizeSmall;
      else if (sizeMedium) style.fontSize = C.fontSizeMedium;
      else if (sizeLarge) style.fontSize = C.fontSizeLarge;
      else style.fontSize = C.fontSizeLarge;

      if (outline || transparent) {
        if (colorLight) style.color = C.colorTextDark;
        else if (colorLightDark) style.color = C.colorTextLightSoft;
        else if (colorLightDarker) style.color = C.colorTextLightSofter;
        else if (colorDark) style.color = C.colorTextDark;
        else if (colorDarkLight) style.color = C.colorTextDarkSoft;
        else if (colorDarkLighter) style.color = C.colorTextDarkSofter;
        else if (colorDanger) style.color = C.colorTextDanger;
        else if (colorTheme) style.color = C.colorTextTheme;
        else if (colorAccent) style.color = C.colorTextAccent;
        else style.color = C.colorTextTheme;
      } else {
        if (colorLight) style.color = C.colorTextDark;
        else style.color = C.colorTextLight;
      }

      if (disabled) {
        style.color = C.colorTextDarkSoft;
      }

      return style;
    };

    const resolveBorderColor = () => {
      if (outline) return resolveTextStyle().color;
      if (transparent) return "transparent";

      if (colorLight) return C.colorTextLight;
      if (colorLightDark) return C.colorTextLightSoft;
      if (colorLightDarker) return C.colorTextLightSofter;
      if (colorDark) return C.colorTextDark;
      if (colorDarkLight) return C.colorTextDarkSoft;
      if (colorDarkLighter) return C.colorTextDarkSofter;
      if (colorDanger) return C.colorTextDanger;
      if (colorTheme) return C.colorTextTheme;
      if (colorAccent) return C.colorTextAccent;

      if (disabled) return "transparent";
      return C.colorBackgroundTheme;
    };

    const resolveShadow = () => {
      return 0;
    };

    function resolveHeight() {
      if (sizeSmall) return 32;
      if (sizeMedium) return 40;
      return 48;
    }

    const [isLoading, setIsLoading] = useState(false);

    const height = resolveHeight();
    const borderRadius = 8; // shared between the button and the spinner overlay
    const style: TouchableOpacityProps["style"] = {
      height,
      flexDirection: "row",
      justifyContent: "center", // ideja kod dodavanja ikona -> children != null ? "flex-start" : "center"
      alignItems: "center",
      backgroundColor: resolveBackgroundColor(),
      borderColor: resolveBorderColor(),
      borderWidth: 1,
      borderRadius,
      ...shadow(resolveShadow()),
      opacity: isLoading || disabled ? 0.5 : 1,
      paddingHorizontal: constants.spacingMedium,
    };

    const textStyle = resolveTextStyle();

    return (
      <>
        <TouchableOpacity
          ref={ref}
          style={[style, inheritedStyle]}
          onPress={(event) => {
            if (typeof onPress === "function") {
              const maybePromise = onPress(event);

              if (maybePromise && typeof maybePromise.then === "function") {
                setIsLoading(true);
                maybePromise.finally(
                  () => isMounted.current && setIsLoading(false)
                );
              }
            }
          }}
          disabled={isLoading || disabled}
          {...props}
        >
          <>
            {children}
            {Boolean(children && shouldRenderTitle) && <Spacer small />}
            {shouldRenderTitle && (
              <Text
                numberOfLines={1}
                style={textStyle}
                weightBold
                {...textProps}
              >
                {title}
              </Text>
            )}
          </>
          {isLoading && (
            <View
              centerContent
              style={{ ...StyleSheet.absoluteFillObject, borderRadius }}
            >
              <Spinner size="small" color={C.colorTextDarkSoft} />
            </View>
          )}
        </TouchableOpacity>

        {Boolean(blockUi && isLoading) && (
          <Modal blockHardwareBackButton>
            <TouchableWithoutFeedback>
              <View flex />
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </>
    );
  }
);
