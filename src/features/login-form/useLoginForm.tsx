import * as yup from "yup";
import { Alert } from "react-native";
import { useCallback, useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/native";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email format invalid")
    .max(50, "Email is too long")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password too short"),
});

export function useLoginForm() {
  const store = useStore();
  const emailNativeId = useRef(null);
  const passwordNativeId = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        console.log("EFFECT");
        tdna.initialize();
        tdna.start();
        tdna.addTarget(emailNativeId.current);
        tdna.addTarget(passwordNativeId.current);
      }, 2000);

      return () => {
        console.log("STOP EFFECT");
        tdna.stop();
      };
    }, [])
  );

  const [login] = useMutation(store.authStore.login, {
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
    setValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      const emailAndPasswordValue = `${values.email}${values.password}`;

      tdna.getTypingPattern(
        1,
        emailAndPasswordValue.length,
        emailAndPasswordValue,
        0,
        async (tp: string) => {
          const emailAndPasswordTextId =
            "mobile-auth-" + emailAndPasswordValue.length;
          try {
            const response = await login({
              email: values.email,
              password: values.password,
              typing_pattern: tp,
              pattern_type: "1",
              device_type: "mobile",
              text_id: emailAndPasswordTextId,
            });
            console.log({ response });

            setValues({ email: "", password: "" });
            tdna.reset();

            // navigation.navigate("Tabs");
          } catch (error) {
            console.warn("error logging in", { error });

            const statusCode = error?.response?.status;

            if (statusCode === 401) {
              actions.setErrors({
                email: "",
                password: "Wrong email or password",
              });
            } else {
              Alert.alert("Error", "Something went wrong");
            }
          }
        }
      );
    },
  });

  const fields = {
    email: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          emailNativeId.current = ref._nativeTag;
        }
      },
      value: values.email,
      onChangeText: handleChange("email") as (text: string) => void,
      onBlur: handleBlur("email") as () => void,
      caption: touched.email && errors.email ? errors.email : undefined,
      error: Boolean(touched.email && errors.email),
      // onSubmitEditing: () => refs.passwordInput?.current?.focus(),
    },
    password: {
      ref: (ref: any) => {
        if (ref != null) {
          //@ts-ignore
          passwordNativeId.current = ref._nativeTag;
        }
      },
      value: values.password,
      onChangeText: handleChange("password") as (text: string) => void,
      onBlur: handleBlur("password") as () => void,
      caption:
        touched.password && errors.password ? errors.password : undefined,
      error: Boolean(touched.password && errors.password),
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
