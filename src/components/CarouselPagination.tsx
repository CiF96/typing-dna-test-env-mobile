import React from "react";
import { StyleSheet } from "react-native";
import { constants } from "~/style/constants";
import { shadow } from "~/utils/shadow";

import { View } from "./View";

const S = StyleSheet.create({
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    borderWidth: 1,
  },
});

export const CarouselPagination = ({
  data,
  index,
}: {
  data: any;
  index: any;
}) => {
  return (
    <View centerContent flexDirectionRow>
      {data.map((_: any, i: number) => {
        return (
          <View
            key={i}
            style={[
              S.paginationDot,
              {
                borderColor: constants.colorBackgroundTheme,
                backgroundColor:
                  i === index
                    ? constants.colorBackgroundTheme
                    : constants.colorBackgroundLight,
                ...shadow(2),
              },
            ]}
          />
        );
      })}
    </View>
  );
};
