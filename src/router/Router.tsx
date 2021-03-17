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
import { DashboardScreen } from "~/screens/DashboardScreen";
import { EmailScreen } from "~/screens/EmailScreen";
import { RandomTextScreen } from "~/screens/RandomTextScreen";
import { constants } from "~/style/constants";
import { Icon } from "~/components/Icon";
import { TouchableOpacity } from "~/components/TouchableOpacity";

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

export const Router = observer(() => {
  const store = useStore();
  const isLoggedIn = store.authStore.isLoggedIn;

  const screenOptions: StackNavigationOptions = {
    header(props) {
      return <Header {...props} />;
    },
    headerRight() {
      return (
        <TouchableOpacity
          onPress={() => {
            store.authStore.logout();
          }}
        >
          <Icon
            name="account"
            size={24}
            color={constants.colorBackgroundLight}
          />
        </TouchableOpacity>
      );
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
        {isLoggedIn === false ? (
          renderAuthScreens()
        ) : (
          <>
            <Stack.Screen name="Tabs" options={{ headerShown: false }}>
              {() => {
                return (
                  <Tabs.Navigator
                    tabBarOptions={{
                      tabStyle: {
                        backgroundColor: constants.colorBackgroundTheme,
                      },
                      activeTintColor: constants.colorTextLight,
                      inactiveTintColor: constants.colorTextLightSofter,
                    }}
                  >
                    <Tabs.Screen
                      name="Dashboard"
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
                        tabBarLabel: "Dashboard",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="DashboardScreen"
                              component={DashboardScreen}
                              options={{ title: "Dashboard" }}
                            />
                          </DashboardStack.Navigator>
                        );
                      }}
                    </Tabs.Screen>
                    <Tabs.Screen
                      name="Email"
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
                        tabBarLabel: "Email",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="EmailScreen"
                              component={EmailScreen}
                              options={{ title: "Email" }}
                            />
                          </DashboardStack.Navigator>
                        );
                      }}
                    </Tabs.Screen>
                    <Tabs.Screen
                      name="Random text"
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
                        tabBarLabel: "Random text",
                      }}
                    >
                      {() => {
                        return (
                          <DashboardStack.Navigator
                            headerMode="screen"
                            screenOptions={screenOptions}
                          >
                            <DashboardStack.Screen
                              name="RandomTextScreen"
                              component={RandomTextScreen}
                              options={{ title: "Random text" }}
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
