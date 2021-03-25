import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { LoginScreen } from "~/screens/LoginScreen";
import { useStore } from "~/mobx/utils/useStore";
import { Header } from "~/components/Header";
import { RegisterScreen } from "~/screens/RegisterScreen";
import { SameTextScreen } from "~/screens/SameTextPatternScreen";
import { AnyTextScreen } from "~/screens/AnyTextPatternScreen";
import { ExtendedScreen } from "~/screens/ExtendedPatternScreen";
import { constants } from "~/style/constants";
import { Icon } from "~/components/Icon";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { useAlert } from "~/hooks/useAlert";
import { IconButton } from "~/components/IconButton";
import { EnrollmentPositionScreen } from "~/screens/EnrollmentPositionScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();
const DashboardStack = createStackNavigator();

export interface RouterProps {}

function renderAuthScreens() {
  return (
    <>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </>
  );
}
function renderEnrollmentPositionScreen() {
  return (
    <>
      <Stack.Screen
        name="EnrollmentPositionScreen"
        component={EnrollmentPositionScreen}
        options={{ headerShown: false }}
      />
    </>
  );
}

export const Router = observer(() => {
  const store = useStore();
  const alert = useAlert();
  const activeUser = store.authStore.activeUser;
  const isLoggedIn = store.authStore.isLoggedIn;
  const isEnrollmentPositionSelected =
    store.uiStore.selectedEnrollmentPositionId !== undefined;
  const setEnrollmentPosition = store.uiStore.setEnrollmentPosition;

  const screenOptions: StackNavigationOptions = {
    header(props) {
      return <Header {...props} />;
    },
    headerRight() {
      return (
        <View flexDirectionRow alignItemsCenter>
          <IconButton
            iconName="delete-user"
            iconSize={24}
            iconColor={constants.colorBackgroundLight}
            onPress={async () => {
              if (activeUser == null) {
                throw new Error("DEV - Active user is null or undefined");
              }
              await store.authStore.deleteUserTypingPatterns({
                user_id: activeUser?.id,
                device: "mobile",
              });
              alert(
                "Success",
                "You successfully deleted your typing patterns.",
                [
                  {
                    text: "Ok",
                    onPress: () => {
                      setEnrollmentPosition(undefined);
                    },
                  },
                ]
              );
            }}
          />

          <Spacer medium />
          <IconButton
            iconName="logout"
            iconSize={24}
            iconColor={constants.colorBackgroundLight}
            onPress={() => {
              store.authStore.logout();
            }}
          />
        </View>
      );
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
        {isLoggedIn === false ? (
          renderAuthScreens()
        ) : !isEnrollmentPositionSelected ? (
          renderEnrollmentPositionScreen()
        ) : (
          <>
            <Stack.Screen name="Tabs" options={{ headerShown: false }}>
              {() => {
                return (
                  <Tabs.Navigator
                    // initialRouteName="Email"
                    tabBarOptions={{
                      tabStyle: {
                        backgroundColor: constants.colorBackgroundTheme,
                      },
                      activeTintColor: constants.colorTextLight,
                      inactiveTintColor: constants.colorTextLightSofter,
                    }}
                  >
                    <Tabs.Screen
                      name="Same Text"
                      options={{
                        tabBarIcon(props) {
                          return (
                            <Icon
                              name="dashboard"
                              size={24}
                              color={
                                props.focused
                                  ? constants.colorTextLight
                                  : constants.colorTextLightSofter
                              }
                            />
                          );
                        },
                        tabBarLabel: "Same Text",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="SameTextScreen"
                              component={SameTextScreen}
                              options={{ title: "Same Text pattern" }}
                            />
                          </DashboardStack.Navigator>
                        );
                      }}
                    </Tabs.Screen>
                    <Tabs.Screen
                      name="Any Text"
                      options={{
                        tabBarIcon(props) {
                          return (
                            <Icon
                              name="email-outline"
                              size={24}
                              color={
                                props.focused
                                  ? constants.colorTextLight
                                  : constants.colorTextLightSofter
                              }
                            />
                          );
                        },
                        tabBarLabel: "Any Text",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="AnyTextScreen"
                              component={AnyTextScreen}
                              options={{ title: "Any Text pattern" }}
                            />
                          </DashboardStack.Navigator>
                        );
                      }}
                    </Tabs.Screen>
                    <Tabs.Screen
                      name="Extended"
                      options={{
                        tabBarIcon(props) {
                          return (
                            <Icon
                              name="text"
                              size={24}
                              color={
                                props.focused
                                  ? constants.colorTextLight
                                  : constants.colorTextLightSofter
                              }
                            />
                          );
                        },
                        tabBarLabel: "Extended",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="ExtendedScreen"
                              component={ExtendedScreen}
                              options={{ title: "Extended pattern" }}
                            />
                          </DashboardStack.Navigator>
                        );
                      }}
                    </Tabs.Screen>
                  </Tabs.Navigator>
                );
              }}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
