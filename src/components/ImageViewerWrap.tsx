import React, { useState } from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "./ModalProvider";
import { Text } from "./Text";
import { isImage } from "~/utils/isImage";
import { IconButton } from "./IconButton";
import { View } from "./View";
import { constants } from "~/style/constants";

export interface ImageViewerWrapProps {
  uri: string;
  disabled?: boolean;
  children: React.ReactElement;
}

const S = StyleSheet.create({
  closeButton: { zIndex: 10, marginTop: constants.spacingLarge },
});

export const ImageViewerWrap = ({
  uri,
  disabled = false,
  children,
}: ImageViewerWrapProps) => {
  const [isActive, setIsActive] = useState(false);
  const isDisabled = disabled || !isImage(uri);
  if (isDisabled) {
    return children;
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setIsActive(true)}>
        {children}
      </TouchableWithoutFeedback>

      {isActive && (
        <Modal>
          <View style={{ backgroundColor: constants.colorBackgroundDark }} flex>
            <ImageViewer
              enableSwipeDown
              imageUrls={[{ url: uri }]}
              onCancel={() => setIsActive(false)}
              renderIndicator={(currentIndex, numImages) => {
                if (numImages === 1) {
                  return null as any;
                }
                return (
                  <Text>
                    {currentIndex}/{numImages}
                  </Text>
                );
              }}
            />
            <IconButton
              iconName="cancel"
              iconColor={constants.colorTextLight}
              absoluteTopRightMedium
              iconSize={24}
              onPress={() => {
                setIsActive(false);
              }}
              style={S.closeButton}
            />
          </View>
        </Modal>
      )}
    </>
  );
};
