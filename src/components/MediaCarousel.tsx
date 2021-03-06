import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { CarouselPagination } from "~/components/CarouselPagination";
import { View } from "~/components/View";
import { isImage } from "~/utils/isImage";
import { ImageViewerWrap } from "./ImageViewerWrap";
import { ImageWithLoader } from "./ImageWithLoader";
import { VideoWithLoader } from "./VideoWithLoader";

function useStyle() {
  const window = useWindowDimensions();
  return useMemo(() => {
    const S = StyleSheet.create({
      slideImage: {
        width: window.width,
        height: window.height * 0.382,
        minHeight: 100,
      },
    });

    return S;
  }, [window.height, window.width]);
}

export interface MediaCarouselProps {
  mediaList: string[];
}

export const MediaCarousel = ({ mediaList }: MediaCarouselProps) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  const S = useStyle();

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);

      const distance = Math.abs(roundIndex - index);

      const isNoMansLand = 0.4 < distance;

      if (roundIndex !== indexRef.current && !isNoMansLand) {
        setIndex(roundIndex);
      }
    },
    []
  );

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={onScroll}
        removeClippedSubviews={false}
      >
        {mediaList.map((slide) => {
          if (isImage(slide)) {
            return (
              <ImageViewerWrap key={slide} uri={slide}>
                <ImageWithLoader
                  source={{ uri: slide }}
                  style={S.slideImage}
                  resizeMode="cover"
                />
              </ImageViewerWrap>
            );
          }
          return (
            <View key={slide}>
              <VideoWithLoader
                openInFullScreen={false}
                source={{ uri: slide }}
                style={S.slideImage}
                initialPaused
                repeat={false}
                resizeMode="contain"
              />
            </View>
          );
        })}
      </ScrollView>
      {mediaList.length > 1 && (
        <View
          centerContent
          paddingMedium
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <CarouselPagination data={mediaList} index={index} />
        </View>
      )}
    </>
  );
};
