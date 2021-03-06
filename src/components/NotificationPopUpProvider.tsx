import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { constants } from "~/style/constants";
import { Icon } from "./Icon";

const useStyle = () => {
  const { top } = useSafeAreaInsets();
  return useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          position: "absolute",
          right: constants.spacingSmall,
          width: 42,
          height: 42,
          top: top + constants.spacingSmall,
          overflow: "hidden",
          backgroundColor: "transparent",
        },
        bubble: {
          width: 42,
          height: 42,
          backgroundColor: constants.colorBackgroundThemeHard,
          overflow: "hidden",
          aspectRatio: 1,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [top]
  );
};

export interface NotificationPopUpContextType {
  showPopUp: (type: "default" | "chat") => void;
}

export const NotificationPopUpContext = createContext<
  NotificationPopUpContextType | undefined
>(undefined);

interface NotificationPopUpProviderProps extends PropsWithChildren<{}> {}

export const NotificationPopUpProvider = ({
  children,
  ...otherProps
}: NotificationPopUpProviderProps) => {
  const store = useStore();
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const showAnimation = useRef(new Animated.Value(0)).current;
  const [notificationType, setNotificationType] = useState<
    Parameters<NotificationPopUpContextType["showPopUp"]>[0]
  >("default");

  const S = useStyle();

  const showPopUp: NotificationPopUpContextType["showPopUp"] = useCallback(
    (type) => {
      setNotificationType(type);

      shakeAnimation.setValue(0);
      Animated.timing(shakeAnimation, {
        duration: 1000,
        toValue: 3,
        easing: Easing.bounce,
        useNativeDriver: true,
        delay: 1000,
      }).start();

      showAnimation.setValue(0);
      Animated.timing(showAnimation, {
        duration: 3500,
        toValue: 7,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    },
    [shakeAnimation, showAnimation]
  );

  useEffect(() => {
    if (typeof showPopUp !== "function") return;
    store.uiStore.setShowNotificationPopUp(showPopUp);
  }, [showPopUp, store.uiStore]);

  const contextValue = { showPopUp };

  const interpolatedShake = shakeAnimation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -10, 0, 10, 0, -10, 0],
  });

  const interpolatedShow = showAnimation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
    outputRange: [0, 1, 1, 1, 1, 1, 1, 0],
  });

  const iconWrapStyle = {
    transform: [{ translateX: interpolatedShake }],
  };

  const containerAnimationStyle = {
    transform: [{ scale: interpolatedShow }],
  };

  const iconName = useMemo(() => {
    if (notificationType === "chat") return "chat";
    return "bell";
  }, [notificationType]);

  return (
    <NotificationPopUpContext.Provider value={contextValue} {...otherProps}>
      {children}
      <View style={S.containerStyle} centerContent>
        <Animated.View style={[S.bubble, containerAnimationStyle]}>
          <Animated.View style={[{ width: 24, height: 24 }, iconWrapStyle]}>
            <Icon name={iconName} size={24} />
          </Animated.View>
        </Animated.View>
      </View>
    </NotificationPopUpContext.Provider>
  );
};
