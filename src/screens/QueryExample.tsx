import React, { useMemo } from "react";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { useStore } from "~/mobx/utils/useStore";
import { Spinner } from "~/components/Spinner";
import { Spacer } from "~/components/Spacer";
import { shadow } from "~/utils/shadow";
import { constants } from "~/style/constants";
import { PersonInstance } from "~/mobx/entities/person/Person";
import { useInfiniteQuery } from "~/hooks/useInfiniteQuery";

interface PersonListItemProps {
  person: PersonInstance;
}

const style = (C: typeof constants) => {
  return StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: C.colorTextAccent,
      backgroundColor: C.colorBackgroundThemeSofter,
      ...shadow(2),
    },
  });
};

function useStyle(
  style: (
    styleConstants: typeof constants,
    window: ReturnType<typeof useWindowDimensions>
  ) => ReturnType<typeof StyleSheet.create>
) {
  const window = useWindowDimensions();
  return useMemo(() => style(constants, window), [style, window]);
}

const PersonListItem = observer(function PersonListItem({
  person,
}: PersonListItemProps) {
  const S = useStyle(style);

  return (
    <View paddingHorizontalMedium paddingVerticalSmall>
      <View paddingMedium style={S.container} flexDirectionRow>
        <View flex>
          <Text>
            <Text colorDarkSoft>Name:</Text> {person.name}
          </Text>
          <Text>
            <Text colorDarkSoft>Gender:</Text> {person.gender}
          </Text>
          <Text>
            <Text colorDarkSoft>Height (cm):</Text> {person.height}
          </Text>
          <Text>
            <Text colorDarkSoft>Mass (kg):</Text> {person.mass}
          </Text>
        </View>
        <View flex>
          <Text>
            <Text colorDarkSoft>Hair color:</Text> {person.hair_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Skin color:</Text> {person.skin_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Eye color:</Text> {person.eye_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Birth year:</Text> {person.birth_year}
          </Text>
        </View>
      </View>
    </View>
  );
});

export const QueryExample = observer(function QueryExample() {
  const store = useStore();
  const query = useInfiniteQuery("readPeople", (_key, page = 1) => {
    return store.personStore.readPersonList({ page });
  });

  return (
    <Screen preventScroll>
      <FlatList
        data={query.dataList}
        keyExtractor={(item) => item.url}
        renderItem={({ item: person }) => {
          return <PersonListItem person={person} />;
        }}
        ListHeaderComponent={
          query.isRefetchError ? (
            <View flex centerContent paddingExtraLarge>
              <Text>Something went wrong</Text>
              <Text onPress={query.onRefresh} colorTheme>
                Tap here or pull down to retry
              </Text>
              <Text sizeSmall>{query.error?.message}</Text>
            </View>
          ) : undefined
        }
        ItemSeparatorComponent={() => <Spacer />}
        onEndReachedThreshold={0.15}
        onEndReached={query.onEndReached}
        onRefresh={query.onRefresh}
        refreshing={query.isRefreshing}
        ListEmptyComponent={() => {
          return query.isError ? (
            <View>
              <View aspectRatioOne centerContent paddingExtraLarge>
                <Text>Something went wrong</Text>
                <Text sizeSmall>{query.error?.message}</Text>
                <Text colorAccent onPress={() => query.refetch()}>
                  Tap here or pull down to retry
                </Text>
              </View>
            </View>
          ) : query.isLoading ? (
            <View aspectRatioOne centerContent paddingExtraLarge>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View aspectRatioOne centerContent paddingExtraLarge>
              <Text>Nothing here. Try refreshing.</Text>
            </View>
          );
        }}
        ListFooterComponent={
          query.isFetchingMore ? (
            <Spinner style={{ padding: constants.spacingLarge }} />
          ) : query.isFetchMoreError ? (
            <View flex centerContent paddingExtraLarge>
              <Text>Something went wrong while getting data</Text>
              <Text sizeSmall>{query.error?.message}</Text>
              <Text onPress={() => query.fetchMore()} colorTheme>
                Try again?
              </Text>
            </View>
          ) : undefined
        }
      />
    </Screen>
  );
});
