import React, { ReactNode, useRef } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler,
} from "react-native";
import { View } from "~/components/View";

type Content = { uniqueId: string; children: React.ReactNode };

const ModalContext = React.createContext<{
  addContent(params: Content): void;
  removeContent(uniqueId: Content["uniqueId"]): void;
  updateContent(params: Content): void;
}>(null as any);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contentList, setContentList] = React.useState<Content[]>([]);

  // Create a value to pass to modal
  const actions = React.useRef({
    addContent({ uniqueId, children }: Content) {
      setContentList((list) => [...list, { uniqueId, children }]);
    },
    removeContent(uniqueId: Content["uniqueId"]) {
      setContentList((list) =>
        list.filter((item) => item.uniqueId !== uniqueId)
      );
    },
    updateContent({ uniqueId, children }: Content) {
      setContentList((list) =>
        list.map((el) => {
          if (el.uniqueId === uniqueId) {
            return { uniqueId, children };
          }
          return el;
        })
      );
    },
  });

  return (
    <ModalContext.Provider value={actions.current}>
      {children}
      {contentList.map(({ children, uniqueId }) => (
        <TouchableWithoutFeedback key={uniqueId} style={{}}>
          <View style={StyleSheet.absoluteFill}>{children}</View>
        </TouchableWithoutFeedback>
      ))}
    </ModalContext.Provider>
  );
};

export interface ModalProps {
  blockHardwareBackButton?: boolean;
  children?: ReactNode;
}

export function Modal({
  children,
  blockHardwareBackButton = true,
}: ModalProps) {
  const uniqueId = useRef(Math.random().toString()).current;
  const actions = React.useContext(ModalContext);

  // onMount => add the content to be rendered by ModalProvider
  React.useEffect(() => {
    actions.addContent({ uniqueId, children });
    // We don't put children in deps array since it would add content on every update.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, uniqueId]);

  // onUpdate => update the content in the array
  const isFirstRender = useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    actions.updateContent({ uniqueId, children });
  }, [actions, children, uniqueId]);

  // onDestroy => clear data
  React.useEffect(() => {
    return function cleanup() {
      actions.removeContent(uniqueId);
    };
  }, [actions, uniqueId]);

  // Block back button from interfering with app
  React.useEffect(() => {
    if (!blockHardwareBackButton) return;
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return handler.remove;
  }, [blockHardwareBackButton]);

  // nothing to render - ModalProvider handles the rendering
  return null;
}
