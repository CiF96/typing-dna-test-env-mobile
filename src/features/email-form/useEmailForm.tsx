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
  const alert = useAlert();
  const emailRecipientNativeId = useRef(null);
  const emailSubjectNativeId = useRef(null);
  const emailTextNativeId = useRef(null);
  const emailTextRequirement = 120;

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
    setValues,
  } = useFormik({
    initialValues: {
      emailRecipient: "",
      emailSubject: "",
      emailText: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      console.log({ actions });
      const textId = getStringHash(values.emailText);
      tdna.getTypingPattern(
        0,
        values.emailText.length,
        "",
        0,
        async (tp: string) => {
          const emailTextId =
            textId.toString() + "-email-" + values.emailText.length;

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
            });
            const enrollmentsLeft = store.authStore.enrollmentsLeft;

            console.log({ enrollmentsLeft });

            if (enrollmentsLeft > 0) {
              alert(
                "Success",
                `You have successfully enrolled an any-text pattern.\nEnrollments left before verification: ${enrollmentsLeft}`
              );
              setValues({
                emailRecipient: "",
                emailSubject: "",
                emailText: "",
              });
              return;
            }

            alert("Success", "You have been successfully verified");
            setValues({
              emailRecipient: "",
              emailSubject: "",
              emailText: "",
            });
          } catch (error) {
            console.warn("error logging in", { error });
          }
        }
      );
    },
  });

  const [emailTextLeft, setEmailTextLeft] = useState<number>(
    120 - values.emailText.length
  );

  //TODO: MAKNI NEPOTREBNE FIELDOVE SUBJECT I TO - PREIMENUJ TO U ANY TEXT FORM ILI SLICNO

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
