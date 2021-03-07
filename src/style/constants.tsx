import { Dimensions } from "react-native";
import Color from "color";

const window = Dimensions.get("window");

const colorBackgroundTheme = "#3b82f6";
const colorBackgroundLight = "rgba(255,255,255,1)";
const colorBackgroundDark = "rgba(26,26,26,1)";
const colorTextLight = "rgba(255, 255, 255, 0.9)";
const colorTextDark = "#1A1A1A";

export const constants = {
  windowWidth: window.width,
  windowHeight: window.height,
  colorSuccess: "#008556",
  colorBackgroundTheme,
  colorBackgroundAccent: "#ba0000",
  colorBackgroundLight,
  colorBackgroundDark,
  colorBackgroundDanger: "#ff4444",
  colorBackgroundThemeSoft: Color(colorBackgroundTheme)
    .lighten(0.25)
    .rgb()
    .string(2),
  colorBackgroundThemeSofter: Color(colorBackgroundTheme)
    .lighten(0.5)
    .rgb()
    .string(2),
  colorBackgroundThemeHard: Color(colorBackgroundTheme)
    .darken(0.25)
    .rgb()
    .string(2),
  colorBackgroundThemeHarder: Color(colorBackgroundTheme)
    .darken(0.5)
    .rgb()
    .string(2),

  colorBackgroundLightDark: "#F1F1F1",
  colorBackgroundLightDarker: "#CCCCCC",
  colorBackgroundDarkLight: "rgb(30, 30, 30)",
  colorBackgroundDarkLighter: "rgb(33, 33, 33)",

  colorTextTheme: "#3b82f6",
  colorTextAccent: "#ba0000",
  colorTextSuccess: "#008556",
  colorTextWarning: "#E8A625",
  colorTextInfo: "#006FD6",
  colorTextLight,
  colorTextDark,
  colorTextDanger: "#ff4444",
  colorTextLightSoft: "rgba(255, 255, 255, 0.63)",
  colorTextLightSofter: "rgba(255, 255, 255, 0.45)",
  colorTextDarkSoft: "rgba(0, 0, 0, 0.63)",
  colorTextDarkSofter: "rgba(0, 0, 0, 0.45)",

  spacingExtraSmall: 4,
  spacingSmall: 8,
  spacingMedium: 16,
  spacingLarge: 32,
  spacingExtraLarge: 48,

  fontSizeExtraSmall: 9,
  fontSizeSmall: 12,
  fontSizeMedium: 14,
  fontSizeLarge: 16,
  fontSizeExtraLarge: 20,

  fontWeightLight: "300" as const,
  fontWeightRegular: "400" as const,
  fontWeightSemiBold: "500" as const,
  fontWeightBold: "700" as const,
  fontWeightExtraBold: "800" as const,
};
