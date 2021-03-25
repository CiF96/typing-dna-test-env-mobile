import * as yup from "yup";
import { Alert, TextInput } from "react-native";
import { useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";

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
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values, actions) {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
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
    },
  });

  const refs = {
    passwordInput: useRef<TextInput>(null),
  };

  const fields = {
    email: {
      value: values.email,
      onChangeText: handleChange("email") as (text: string) => void,
      onBlur: handleBlur("email") as () => void,
      caption: touched.email && errors.email ? errors.email : undefined,
      error: Boolean(touched.email && errors.email),
      onSubmitEditing: () => refs.passwordInput?.current?.focus(),
    },
    password: {
      ref: refs.passwordInput,
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
