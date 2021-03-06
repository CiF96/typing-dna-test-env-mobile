import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  Pressable,
  PressableProps,
} from "react-native";
import Video, { VideoProperties } from "react-native-video";

import { View, ViewProps } from "~/components/View";
import { Spinner } from "~/components/Spinner";
import { observer } from "mobx-react";
import { useStore } from "~/mobx/utils/useStore";
import { useIsFocused } from "@react-navigation/native";
import { Icon } from "./Icon";
import { constants } from "~/style/constants";

const S = StyleSheet.create({
  video: { width: "100%", height: "100%" },
  overlayOuterWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayWrap: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
  },
  overlayImage: { height: 64, width: 64 },
});

export interface VideoWithLoaderProps extends VideoProperties {
  openInFullScreen: boolean;
  initialPaused?: boolean;
  spinnerWrapProps?: ViewProps;
  spinnerProps?: any;
  overlayProps?: Partial<PressableProps>;
  overlayComponent?: ReactNode;
}

export const VideoWithLoader = observer(function VideoWithLoader({
  openInFullScreen,
  initialPaused,
  spinnerWrapProps,
  spinnerProps,
  overlayProps,
  overlayComponent,
  poster,
  onLoad,
  onError,
  ...props
}: VideoWithLoaderProps) {
  const video = useRef<Video>(null);
  const store = useStore();
  const navigation = store.uiStore.navigation;
  const [isPaused, setIsPaused] = useState(initialPaused ?? true);
  const [isLoading, setIsLoading] = useState(true);

  // Pause video if screen unfocused
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setIsPaused(true);
    }
  }, [isFocused]);

  const renderedOverlayComponent = overlayComponent || (
    <Icon name="play" size={40} color={constants.colorTextLight} />
  );

  return (
    <>
      {(isLoading || Platform.OS === "android") && (
        <View
          style={StyleSheet.absoluteFill}
          centerContent
          {...spinnerWrapProps}
        >
          <Spinner {...spinnerProps} />
        </View>
      )}
      <Video
        ref={video}
        pointerEvents="none"
        fullscreen={false}
        fullscreenAutorotate={false}
        fullscreenOrientation="landscape"
        resizeMode="contain"
        repeat
        controls={false}
        paused={isPaused}
        onLoad={(data) => {
          setIsLoading(false);
          if (Platform.OS === "android" && !poster) {
            video.current?.seek(0);
          }
          // console.warn(JSON.stringify(data, null, 2));
          onLoad?.(data);
        }}
        onError={(error) => {
          setIsLoading(false);
          onError?.(error);
        }}
        onEnd={() => {
          setIsPaused(true);
          setTimeout(() => {
            video.current?.seek(0);
          }, 1);
        }}
        style={S.video}
        {...props}
      />

      {!isLoading && (
        <Pressable
          style={S.overlayOuterWrap}
          onPress={
            openInFullScreen
              ? () => {
                  const uri =
                    typeof props.source === "object"
                      ? props.source.uri
                      : props.source;
                  navigation?.navigate("VideoPlayerScreen", { uri });
                }
              : () => {
                  setIsPaused((p) => !p);
                }
          }
          {...overlayProps}
        >
          {isPaused && (
            <>
              {Boolean(poster) && (
                <Image
                  source={{ uri: poster }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )}
              <View style={S.overlayWrap} centerContent>
                {renderedOverlayComponent}
              </View>
            </>
          )}
        </Pressable>
      )}
    </>
  );
});
