import * as yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/core";

const validationSchema = yup.object({
  emailRecipient: yup
    .string()
    .required("Email recipient is required")
    .email("Email format invalid")
    .max(50, "Email is too long")
    .trim(),
  emailSubject: yup.string().trim(),
  emailText: yup.string().required("Email content is required").trim(),
});

export function useEmailForm() {
  const store = useStore();
  const emailRecipientNativeId = useRef(null);
  const emailSubjectNativeId = useRef(null);
  const emailTextNativeId = useRef(null);
  const emailTextRequirement = 120;

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

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        console.warn("EFFECT");

        tdna.initialize();
        tdna.start();
        tdna.addTarget(emailRecipientNativeId.current);
        tdna.addTarget(emailSubjectNativeId.current);
        tdna.addTarget(emailTextNativeId.current);
      }, 2000);

      return () => {
        console.warn("STOP EFFECT");

        tdna.stop();
      };
    }, [])
  );

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
      emailRecipient: "",
      emailSubject: "",
      emailText: "",
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

  const [emailTextLeft, setEmailTextLeft] = useState<number>(
    120 - values.emailText.length
  );

  const fields = {
    emailRecipient: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          emailRecipientNativeId.current = ref._nativeTag;
        }
      },
      value: values.emailRecipient,
      onChangeText: handleChange("emailRecipient") as (text: string) => void,
      onBlur: handleBlur("emailRecipient") as () => void,
      caption:
        touched.emailRecipient && errors.emailRecipient
          ? errors.emailRecipient
          : undefined,
      error: Boolean(touched.emailRecipient && errors.emailRecipient),
    },
    emailSubject: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          emailSubjectNativeId.current = ref._nativeTag;
        }
      },
      value: values.emailSubject,
      onChangeText: handleChange("emailSubject") as (text: string) => void,
      onBlur: handleBlur("emailSubject") as () => void,
      caption:
        touched.emailSubject && errors.emailSubject
          ? errors.emailSubject
          : undefined,
      error: Boolean(touched.emailSubject && errors.emailSubject),
    },
    emailText: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          emailTextNativeId.current = ref._nativeTag;
        }
      },
      value: values.emailText,
      onChangeText: (text: string) => {
        handleChange("emailText")(text);
        setEmailTextLeft(emailTextRequirement - text.length);
      },
      onBlur: handleBlur("emailText") as () => void,
      caption:
        touched.emailText && errors.emailText
          ? errors.emailText
          : `Email text should be at least 120 characters for best resultss. ${
              emailTextLeft > 0 && `${emailTextLeft} left`
            }`,
      error: Boolean(touched.emailText && errors.emailText),
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
