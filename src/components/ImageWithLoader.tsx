import React, { memo, useCallback, useState } from "react";
import { Image, ImageProps, ImageStyle, StyleSheet } from "react-native";

import { View, ViewProps } from "~/components/View";
import { Spinner } from "./Spinner";

interface ImageWithLoaderProps extends Omit<ImageProps, "style"> {
  containerProps?: ViewProps;
  imageStyle?: ImageStyle;
  style?: ViewProps["style"];
}

/**
 * All props passed to ImageWithLoader are passed through to the Image component
 * except the style prop.
 * The style prop is applied to the container View.
 * If, however, you want to override the Image component style you can use the imageStyle prop.
 *
 */
export const ImageWithLoader = memo(function ImageWithLoader({
  containerProps,
  imageStyle,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);
  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  const onError = useCallback(() => {
    setIsLoading(false);
  }, []);

  const { style, ...imageProps } = props;

  return (
    <View {...containerProps} style={[{ overflow: "hidden" }, style]}>
      <Image
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        style={[{ width: "100%", height: "100%" }, imageStyle]}
        {...imageProps}
      />
      {isLoading && (
        <View style={StyleSheet.absoluteFill} centerContent>
          <Spinner />
        </View>
      )}
    </View>
  );
});
