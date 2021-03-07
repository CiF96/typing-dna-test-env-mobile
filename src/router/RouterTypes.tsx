import { StackNavigationProp as RNStackNavigationProp } from "@react-navigation/stack";

export type StackNavigatorScreenParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type StackNavigationProp = RNStackNavigationProp<
  StackNavigatorScreenParams
>;
