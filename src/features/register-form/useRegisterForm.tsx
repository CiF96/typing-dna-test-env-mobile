import { useCallback, useRef } from "react";
import { Alert, TextInput } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
import { useNavigation } from "@react-navigation/core";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getStringHash } from "~/mobx/utils/getStringHash";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is a required field")
    .max(50, "First name is too long")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is a required field")
    .max(50, "Last name is too long")
    .trim(),
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
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .nullable(true)
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export function useRegisterForm() {
  const store = useStore();
  const navigation = useNavigation();
  const emailNativeId = useRef(null);
  const passwordNativeId = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        tdna.initialize();
        tdna.start();
        tdna.addTarget(emailNativeId.current);
        tdna.addTarget(passwordNativeId.current);
      }, 2000);

      return () => {
        tdna.stop();
      };
    }, [])
  );

  const [register] = useMutation(store.authStore.register, {
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      const emailAndPasswordValue = `${values.email}${values.password}`;
      const textId = getStringHash(emailAndPasswordValue);
      tdna.getTypingPattern(
        1,
        emailAndPasswordValue.length,
        emailAndPasswordValue,
        textId,
        async (tp: string) => {
          const emailAndPasswordTextId =
            textId.toString() + "-auth-" + emailAndPasswordValue.length;

          try {
            await register({
              name: values.firstName,
              last_name: values.lastName,
              email: values.email,
              password: values.password,
              password_confirmation: values.confirmPassword,
              typing_pattern: tp,
              pattern_type: "1",
              device_type: "mobile",
              text_id: emailAndPasswordTextId,
            });

            navigation.navigate("LoginScreen");
          } catch (error) {
            console.warn("error logging in", { error });
            tdna.reset();
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

      // const response = await login({
      //   email: values.email,
      //   password: values.password,
      //   typing_pattern: emailAndPasswordTypingPattern,
      // });
      // console.log({ response });
      //do something
    },
  });

  const refs = {
    lastNameInput: useRef<TextInput>(null),
    emailInput: useRef<TextInput>(null),
    confirmPasswordInput: useRef<TextInput>(null),
  };

  const fields = {
    firstName: {
      value: values.firstName,
      onChangeText: handleChange("firstName") as (text: string) => void,
      onBlur: handleBlur("firstName") as () => void,
      caption:
        touched.firstName && errors.firstName ? errors.firstName : undefined,
      error: Boolean(touched.firstName && errors.firstName),
      onSubmitEditing: () => refs.lastNameInput?.current?.focus(),
    },
    lastName: {
      ref: refs.lastNameInput,
      value: values.lastName,
      onChangeText: handleChange("lastName") as (text: string) => void,
      onBlur: handleBlur("lastName") as () => void,
      caption:
        touched.lastName && errors.lastName ? errors.lastName : undefined,
      error: Boolean(touched.lastName && errors.lastName),
      onSubmitEditing: () => refs.emailInput?.current?.focus(),
    },
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
      error: Boolean(touched.email && errors.email), // our text input
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
      error: Boolean(touched.password && errors.password), // our text input
      onSubmitEditing: () => refs.confirmPasswordInput?.current?.focus(),
    },
    confirmPassword: {
      value: values.confirmPassword,
      onChangeText: handleChange("confirmPassword") as (text: string) => void,
      onBlur: handleBlur("confirmPassword") as () => void,
      caption:
        touched.confirmPassword && errors.confirmPassword
          ? errors.confirmPassword
          : undefined,
      error: Boolean(touched.confirmPassword && errors.confirmPassword), // our text input
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
