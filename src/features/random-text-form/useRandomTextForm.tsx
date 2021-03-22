import * as yup from "yup";
import { useCallback, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useStore } from "~/mobx/utils/useStore";
//@ts-ignore
import tdna from "typingdnarecorder-react-native";
import { useFocusEffect } from "@react-navigation/core";
import { getStringHash } from "~/mobx/utils/getStringHash";
import { useAlert } from "~/hooks/useAlert";

const validationSchema = yup.object({
  quoteText: yup.string().required("Quote is required").trim(),
});

export function useRandomTextForm() {
  const store = useStore();
  const alert = useAlert();
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

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        console.warn("FOCUS EFFECT");

        tdna.initialize();
        tdna.start();
        tdna.addTarget(quoteTextNativeId.current);
      }, 2000);

      return () => {
        console.warn("STOP FOCUS EFFECT");
        store.authStore.updateEnrollmentsLeft({ numberOfEnrollments: 0 });
        setFieldValue("quoteText", "");
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
      quoteText: "",
    },
    validationSchema,
    onSubmit(values, actions) {
      console.log({ actions });
      const quote =
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.";
      const textId = getStringHash(quote);

      tdna.getTypingPatternExtended(
        2,
        quote.length,
        quote,
        textId,
        textId,
        false,
        async (tp: string) => {
          const quoteTextId =
            textId.toString() + "-random_text-" + values.quoteText.length;
          try {
            if (store.authStore.activeUser == null) {
              throw new Error("DEV - active user is undefined or null");
            }
            await readTypingPatternData({
              user_id: store.authStore.activeUser?.id,
              typing_pattern: tp,
              device_type: "mobile",
              pattern_type: "2",
              text_id: quoteTextId,
            });
            const enrollmentsLeft = store.authStore.enrollmentsLeft;

            if (enrollmentsLeft > 0) {
              alert(
                "Success",
                `You have successfully enrolled a type 2 pattern.\nEnrollments left before verification: ${enrollmentsLeft}`
              );
              setFieldValue("quoteText", "");
              return;
            }

            alert("Success", "You have been successfully verified");
            setFieldValue("quoteText", "");
          } catch (error) {
            console.warn("error logging in", { error });
          }
        }
      );
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
