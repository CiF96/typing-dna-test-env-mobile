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
        store.authStore.updateEnrollmentsLeft({ numberOfEnrollments: 0 });
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
      tdna.getTypingPattern(
        0,
        values.text.length,
        "",
        0,
        async (tp: string) => {
          const emailTextId =
            textId.toString() + "-email-" + values.text.length;

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
            });
            const enrollmentsLeft = store.authStore.enrollmentsLeft;

            console.log({ enrollmentsLeft });

            if (enrollmentsLeft > 0) {
              alert(
                "Success",
                `You have successfully enrolled an any-text pattern.\nEnrollments left before verification: ${enrollmentsLeft}`
              );
              setFieldValue("text", "");
              return;
            }

            alert("Success", "You have been successfully verified");
            setFieldValue("text", "");
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
    120 - values.text.length
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
          : `Email text should be at least 120 characters for best results. ${
              textLeft > 0 ? `${textLeft} left` : ""
            }`,
      error: Boolean(touched.text && errors.text),
      onSubmitEditing: () => submitForm(),
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
  };

  return {
    fields,
    isSubmitting,
    isValid,
    submitForm,
  };
}
