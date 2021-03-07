import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { HomeScreen } from "~/screens/HomeScreen";
import { QueryExample } from "~/screens/QueryExample";
import { DropdownExample } from "~/screens/DropdownExample";
import { LoginScreen } from "~/screens/LoginScreen";
import { useStore } from "~/mobx/utils/useStore";
import { Header } from "~/components/Header";
import { RegisterScreen } from "~/screens/RegisterScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

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
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
        {isLoggedIn === false ? (
          renderAuthScreens()
        ) : (
          <>
            <Stack.Screen name="Tabs">
              {() => {
                return (
                  <Tabs.Navigator>
                    <Tabs.Screen
                      name="HomeScreen"
                      component={HomeScreen}
                      options={{ title: "HomeScreen" }}
                    />
                  </Tabs.Navigator>
                );
              }}
            </Stack.Screen>
            <Stack.Screen
              name="QueryExample"
              component={QueryExample}
              options={{ title: "QueryExample" }}
            />
            <Stack.Screen
              name="DropdownExample"
              component={DropdownExample}
              options={{ title: "DropdownExample" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
