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
  email: yup
    .string()
    .required("Field is required")
    .oneOf(
      ["test@lloyds.design"],
      "The text you entered doesn't match the credential. Try again."
    )
    .trim(),
  password: yup
    .string()
    .required("Field is required")
    .oneOf(
      ["test12345678"],
      "The text you entered doesn't match the credential. Try again."
    ),
});

export function useSameTextPatternForm() {
  const store = useStore();
  const alert = useAlert();
  const emailNativeId = useRef(null);
  const passwordNativeId = useRef(null);
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
        console.warn("FOCUS EFFECT");

        tdna.initialize();
        tdna.start();
        tdna.addTarget(emailNativeId.current);
        tdna.addTarget(passwordNativeId.current);
      }, 2000);

      return () => {
        console.warn("STOP FOCUS EFFECT");
        setValues({ email: "", password: "" });
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
    setValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      console.log({ actions });
      const emailAndPasswordValue = `${values.email}${values.password}`;
      const textId = getStringHash(emailAndPasswordValue);
      tdna.getTypingPattern(
        1,
        emailAndPasswordValue.length,
        emailAndPasswordValue,
        textId,
        async (tp: string) => {
          const emailAndPasswordTextId =
            "textId: " +
            textId.toString() +
            "-length: " +
            emailAndPasswordValue.length;

          try {
            if (store.authStore.activeUser == null) {
              throw new Error("DEV - active user is undefined or null");
            }
            await readTypingPatternData({
              user_id: store.authStore.activeUser?.id,
              typing_pattern: tp,
              pattern_type: "1",
              device_type: "mobile",
              text_id: emailAndPasswordTextId,
              selected_position: position,
            });
            const enrollmentsLeft = store.authStore.sameTextEnrollmentsLeft;

            if (enrollmentsLeft > 0) {
              alert("Success", "Your pattern has been successfully enrolled.");
            } else {
              alert(
                "Success",
                "Your pattern has been successfully saved and verified."
              );
            }
            setValues({ email: "", password: "" });
            tdna.reset();
          } catch (error) {
            const statusCode = error?.response?.status;
            console.log({ statusCode });
            setValues({ email: "", password: "" });
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
  };

  return {
    fields,
    isSubmitting,
    isValid,
    submitForm,
    resetTypingDna,
  };
}
