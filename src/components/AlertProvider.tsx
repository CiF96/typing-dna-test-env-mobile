import React, {
  useState,
  createContext,
  useCallback,
  PropsWithChildren,
} from "react";
import {
  AlertButton,
  AlertOptions,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

import { Button } from "~/components/Button";
import { Modal } from "~/components/ModalProvider";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { Spacer } from "~/components/Spacer";
import { shadow } from "~/utils/shadow";

import { constants as C } from "~/style/constants";

interface ContextType {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions & { buttonsContainerStyle?: ViewStyle }
  ) => void;
}

export const AlertContext = createContext<ContextType | undefined>(undefined);

const defaultOptions = {
  cancelable: false,
  onDismiss: () => {},
  buttonsContainerStyle: {},
};

const MODAL_BACKDROP_COLOR = "rgba(126,126,126,0.5)";

const S = StyleSheet.create({
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: MODAL_BACKDROP_COLOR,
  },
  alertContainer: {
    backgroundColor: C.colorBackgroundLight,
    width: "80%",
    borderRadius: 8,
    ...shadow(4),
  },
  buttonsContainer: { flexDirection: "row-reverse" },
});

interface AlertProviderProps extends PropsWithChildren<{}> {}

export function AlertProvider({ children, ...otherProps }: AlertProviderProps) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertParams, setAlertParams] = useState({
    title: "",
    body: "",
    buttons: [] as AlertButton[],
    options: defaultOptions,
  });

  const alert: ContextType["alert"] = useCallback(
    (title = "", body = "", buttons = [], options = defaultOptions) => {
      const preparedOptions = { ...defaultOptions, ...options };
      setAlertParams({ title, body, buttons, options: preparedOptions });
      setAlertVisible(true);
    },
    []
  );

  const contextValue = { alertVisible, setAlertVisible, alert };

  const { title, body, buttons, options } = alertParams;

  const { onDismiss, cancelable, buttonsContainerStyle } = options;

  const handleModalPress = () => {
    if (cancelable) {
      onDismiss();
      setAlertVisible(false);
    }
  };

  const buttonsRender = buttons.map((button, index) => {
    return (
      <React.Fragment key={button.text}>
        {index !== 0 && <Spacer medium />}
        <Button
          transparent={button.style === "cancel"}
          title={button.text}
          onPress={() => {
            button.onPress?.();
            setAlertVisible(false);
          }}
          flex
          colorDanger={button.style === "destructive"}
          colorDark={button.style === "cancel"}
        />
      </React.Fragment>
    );
  });

  const shouldShowTitle = typeof title === "string" && title !== "";
  const shouldShowBody = typeof body === "string" && body !== "";

  return (
    <AlertContext.Provider value={contextValue} {...otherProps}>
      {children}
      {alertVisible && (
        <Modal>
          <View style={S.containerStyle}>
            <TouchableWithoutFeedback onPress={handleModalPress}>
              <View
                justifyContentCenter
                alignItemsCenter
                style={S.containerStyle}
              >
                <View paddingLarge style={[S.alertContainer]}>
                  {shouldShowTitle && (
                    <View centerContent paddingVerticalMedium>
                      <Text alignCenter weightBold sizeExtraLarge>
                        {title}
                      </Text>
                    </View>
                  )}
                  {shouldShowBody && (
                    <View centerContent paddingVerticalMedium>
                      <Text alignCenter>{body}</Text>
                    </View>
                  )}
                  <View
                    centerContent
                    paddingVerticalMedium
                    style={[S.buttonsContainer, buttonsContainerStyle]}
                  >
                    {buttonsRender.length === 0 ? (
                      <Button
                        transparent
                        title="OK"
                        onPress={() => {
                          if (typeof onDismiss === "function") {
                            onDismiss();
                          }
                          setAlertVisible(false);
                        }}
                      />
                    ) : (
                      buttonsRender
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
}
