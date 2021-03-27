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
  const emailTextRequirement = 120;
  const [position, setPosition] = useState<number>(1);
  const [selectedKeyboardType, setSelectedKeyboardType] = useState<
    "tap" | "swipe"
  >("tap");

  useEffect(() => {
    // DEV SOLUTION FOR FAST REFRESH REMOVE LATER
    return () => {
      tdna.stop();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        console.warn("EFFECT");

        tdna.initialize();
        tdna.start();

        tdna.addTarget(emailTextNativeId.current);
      }, 2000);

      return () => {
        console.warn("STOP EFFECT");
        tdna.stop();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const [readTypingPatternData] = useMutation(
    store.authStore.readTypingPatternData,
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
    onSubmit(values, actions) {
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
            await readTypingPatternData({
              user_id: store.authStore.activeUser?.id,
              typing_pattern: tp,
              device_type: "mobile",
              pattern_type: "0",
              text_id: emailTextId,
              selected_position: position,
              keyboard_type: selectedKeyboardType,
            });

            const enrollmentsLeft = store.authStore.anyTextEnrollmentsLeft;

            if (enrollmentsLeft > 0) {
              alert("Success", "Your pattern has been successfully enrolled.");
            } else {
              alert(
                "Success",
                "Your pattern has been successfully saved and verified."
              );
            }
            setFieldValue("text", "");
            tdna.reset();
          } catch (error) {
            const statusCode = error?.response?.status;
            console.log({ statusCode });
            setFieldValue("text", "");
            tdna.reset();

            if (statusCode === 403) {
              alert("Failed", "This is not you typing is it?");
              return;
            }
            if (statusCode === 404) {
              alert("Failed", "This pattern has not been enrolled.");
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
  };
}
