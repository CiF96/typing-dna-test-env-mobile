import * as yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/core";
import { getStringHash } from "~/mobx/utils/getStringHash";
import { useAlert } from "~/hooks/useAlert";

const validationSchema = yup.object({
  text: yup.string().required("Email content is required").trim(),
});

export function useAnyTextPatternForm() {
  const store = useStore();
  const alert = useAlert();
  const emailTextNativeId = useRef(null);
  const emailTextRequirement = 140;
  const [position, setPosition] = useState<number>(1);
  const [selectedKeyboardType, setSelectedKeyboardType] = useState<
    "tap" | "swipe"
  >("tap");
  const [isTypingDnaReady, setIsTypingDnaReady] = useState(false);

  const verificationCounts = store.typingPatternStore.verificationCounts;

  useEffect(() => {
    // DEV SOLUTION FOR FAST REFRESH REMOVE LATER
    return () => {
      tdna.stop();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        tdna.initialize();
        tdna.start();

        tdna.addTarget(emailTextNativeId.current);
        setIsTypingDnaReady(true);
      }, 2000);

      return () => {
        tdna.stop();
        setIsTypingDnaReady(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const [readTypingPatternData] = useMutation(
    store.typingPatternStore.readTypingPatternData,
    {
      throwOnError: true,
    }
  );

  const resetTypingDna = () => {
    tdna.reset();
  };

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    submitForm,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema,
    async onSubmit(values, actions) {
      console.log({ actions });
      const textId = getStringHash(values.text);
      tdna.getTypingPatternExtended(
        0,
        0,
        "",
        0,
        emailTextNativeId.current,
        false,
        async (tp: string) => {
          const emailTextId =
            "textId: " +
            textId.toString() +
            "-length: " +
            values.text.length +
            "-keyboard type: " +
            selectedKeyboardType;

          try {
            if (store.authStore.activeUser == null) {
              throw new Error("DEV - active user is undefined or null");
            }
            const response = await readTypingPatternData({
              user_id: store.authStore.activeUser?.id,
              typing_pattern: tp,
              device_type: "mobile",
              pattern_type: "0",
              text_id: emailTextId,
              selected_position: position,
              keyboard_type: selectedKeyboardType,
            });

            setFieldValue("text", "");
            tdna.reset();

            if (response?.data.is_save) {
              alert("Success", "Your pattern has been successfully saved.");
              return;
            }
            alert(
              "Success",
              "Your pattern has been successfully saved and verified."
            );

            verificationCounts.increasePositionVerificationCount({
              patternType: 0,
              positionId: position as 1 | 2 | 3 | 4 | 5 | 6,
            });
          } catch (error) {
            const statusCode = error?.response?.status;
            console.log({ statusCode });
            setFieldValue("text", "");
            tdna.reset();

            if (statusCode === 403) {
              alert("Failed", "This is not you typing is it?");
              verificationCounts.increasePositionVerificationCount({
                patternType: 0,
                positionId: position as 1 | 2 | 3 | 4 | 5 | 6,
              });
              return;
            }
            if (statusCode === 404) {
              alert("Failed", "This pattern has not been enrolled.");
              verificationCounts.increasePositionVerificationCount({
                patternType: 0,
                positionId: position as 1 | 2 | 3 | 4 | 5 | 6,
              });
              return;
            }
            if (statusCode === 406) {
              alert("Failed", "Wrong mobile pattern used.");
              return;
            }

            alert("Error", "Something went wrong!");
          }
        }
      );
    },
  });

  const [textLeft, setEmailTextLeft] = useState<number>(
    emailTextRequirement - values.text.length
  );

  const fields = {
    text: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          emailTextNativeId.current = ref._nativeTag;
        }
      },
      value: values.text,
      onChangeText: (text: string) => {
        handleChange("text")(text);
        setEmailTextLeft(emailTextRequirement - text.length);
      },
      onBlur: handleBlur("text") as () => void,
      caption:
        touched.text && errors.text
          ? errors.text
          : `Rewritten text should be at least ${emailTextRequirement} characters long, ${
              textLeft > 0 ? `${textLeft} left` : ""
            }`,
      error: Boolean(touched.text && errors.text),
      // onSubmitEditing: () => submitForm(),
    },
    position: {
      value: position,
      onIncreasePress: () => {
        if (position < 6) {
          setPosition(position + 1);
          // setFieldValue("position", values.position++);
        }
      },
      onDecreasePress: () => {
        if (position > 1) {
          setPosition(position - 1);
        }
      },
    },
    selectedKeyboardType: {
      selectedValue: selectedKeyboardType,
      onChange: setSelectedKeyboardType,
    },
  };

  return {
    fields,
    isSubmitting,
    isValid,
    submitForm,
    resetTypingDna,
    isTypingDnaReady,
  };
}
