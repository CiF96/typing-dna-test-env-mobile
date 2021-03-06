import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import { StackHeaderProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStore } from "~/mobx/utils/useStore";
import { shadow } from "~/utils/shadow";

import { constants as C, constants } from "~/style/constants";

import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { View } from "./View";
import { Icon } from "./Icon";

const headerHeight = 64;

function useStyles({ shouldShowShadow }: { shouldShowShadow: boolean }) {
  const insets = useSafeAreaInsets();
  const insetTop = insets.top;
  const store = useStore();

  return useMemo(() => {
    return StyleSheet.create({
      statusBar: {
        height: insetTop,
        backgroundColor: store.uiStore.safeAreaBackgroundColor,
      },
      container: shouldShowShadow ? { ...shadow(3) } : {},
      headerContainer: {
        height: headerHeight,
        backgroundColor: C.colorBackgroundLight,
        justifyContent: "space-between",
        paddingHorizontal: constants.spacingMedium,
      },
      backButton: {
        height: headerHeight,
        width: headerHeight,
        justifyContent: "center",
        alignItems: "center",
      },
      headerLeft: { position: "absolute", top: 0, left: 0, bottom: 0 },
      headerRight: { position: "absolute", top: 0, right: 0, bottom: 0 },
      titleText: { flex: 1 },
    });
  }, [insetTop, shouldShowShadow, store.uiStore.safeAreaBackgroundColor]);
}

interface HeaderProps extends StackHeaderProps {
  scene: StackHeaderProps["scene"] & {
    descriptor: {
      options: { shouldRenderBack?: boolean; shouldShowShadow?: boolean };
    };
  };
}

export const Header = observer(function Header({
  previous,
  scene,
  navigation,
}: HeaderProps) {
  const canGoBack = previous !== undefined;

  const HeaderRight = scene.descriptor?.options?.headerRight?.({});
  const HeaderLeft = scene.descriptor?.options?.headerLeft?.({});
  const shouldRenderBack = scene.descriptor?.options?.shouldRenderBack ?? true;
  const shouldShowShadow = scene.descriptor.options.shouldShowShadow ?? true;

  const { title } = scene.descriptor.options;

  const S = useStyles({ shouldShowShadow });
  const store = useStore();

  const { t } = store.i18n;

  return (
    <View style={S.container}>
      <View style={S.statusBar} />
      <View flexDirectionRow alignItemsCenter style={S.headerContainer}>
        <View alignItemsCenter flexDirectionRow flex>
          {canGoBack && shouldRenderBack && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                style={S.backButton}
                name="arrow-left"
                size={24}
                color={C.colorTextDark}
              />
            </TouchableOpacity>
          )}
          {HeaderLeft}
          <Spacer small />
          <Text
            colorDark
            sizeLarge
            weightBold
            style={S.titleText}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {t(title as any)}
          </Text>
        </View>

        <View justifyContentCenter flexDirectionRow>
          {HeaderRight}
        </View>
      </View>
    </View>
  );
});
