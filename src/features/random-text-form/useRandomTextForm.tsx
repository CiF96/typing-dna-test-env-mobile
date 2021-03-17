import * as yup from "yup";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/core";

const validationSchema = yup.object({
  quoteText: yup.string().required("Quote is required").trim(),
});

export function useRandomTextForm() {
  const store = useStore();
  const quoteTextNativeId = useRef(null);

  // const [
  //   emailAndPasswordTypingPattern,
  //   setEmailAndPasswordTypingPattern,
  // ] = useState("");

  useEffect(() => {
    // DEV SOLUTION FOR FAST REFRESH REMOVE LATER
    return () => {
      tdna.stop();
    };
  }, []);

  useFocusEffect(() => {
    setTimeout(() => {
      console.warn("FOCUS EFFECT");

      tdna.initialize();
      tdna.start();
      tdna.addTarget(quoteTextNativeId.current);
    }, 2000);

    return () => {
      console.warn("STOP FOCUS EFFECT");

      tdna.stop();
    };
  });

  const [sendEmail] = useMutation(store.authStore.login, {
    throwOnError: true,
  });

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    isValid,
    submitForm,
    touched,
    values,
  } = useFormik({
    initialValues: {
      quoteText: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      console.log({ sendEmail, values, actions });

      tdna.getTypingPattern(0, 0, "", 0, async (tp: string) => {
        try {
          console.warn({ email: tp });
        } catch (error) {
          console.warn("error logging in", { error });
        }
      });
    },
  });

  const fields = {
    quoteText: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          quoteTextNativeId.current = ref._nativeTag;
        }
      },
      value: values.quoteText,
      onChangeText: handleChange("quoteText") as (text: string) => any,
      onBlur: handleBlur("quoteText") as () => void,
      caption:
        touched.quoteText && errors.quoteText ? errors.quoteText : undefined,
      error: Boolean(touched.quoteText && errors.quoteText),
      onSubmitEditing: () => submitForm(),
    },
  };

  return {
    fields,
    isSubmitting,
    isValid,
    submitForm,
  };
}
