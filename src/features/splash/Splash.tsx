import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { constants } from "~/style/constants";

export const Splash = ({ isReady }: { isReady: boolean }) => {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const shouldRun = isImageLoaded && isReady;
    if (!shouldRun || __DEV__) return;

    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 800,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    });
  }, [containerOpacity, imageOpacity, isImageLoaded, isReady]);

  if (!visible || __DEV__) return null;

  return (
    <Animated.View
      collapsable={false}
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: containerOpacity,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DBEAFE",
      }}
    >
      <Animated.Image
        source={require("~/assets/typingdna-logo.png")}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        style={{
          opacity: imageOpacity,
          width: constants.windowWidth * 0.6,
          height: constants.windowWidth * 0.6,
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
};
