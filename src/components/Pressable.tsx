import React from "react";
import { Pressable as RNPressable } from "react-native";

import { withLayoutProps } from "~/hoc/withLayoutProps";

export const Pressable = withLayoutProps(RNPressable);

export type Pressable = typeof Pressable;
export type PressableProps = React.ComponentProps<Pressable>;
