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
  quoteText: yup.string().required("Quote is required").trim(),
});

export function useExtendedPatternForm() {
  const store = useStore();
  const alert = useAlert();
  const quoteTextNativeId = useRef(null);
  const [position, setPosition] = useState<number>(1);

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
        quoteTextNativeId.current,
        false,
        async (tp: string) => {
          const quoteTextId =
            "textId: " +
            textId.toString() +
            "-length: " +
            values.quoteText.length;

          const percentageOfRewrite = values.quoteText.length / quote.length;

          if (percentageOfRewrite < 0.8) {
            alert(
              "Error",
              "You need to write at least 80% of the given quote. Try again."
            );
            tdna.reset();
            setFieldValue("quoteText", "");
            return;
          }
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
              selected_position: position,
            });

            const enrollmentsLeft = store.authStore.extendedEnrollmentsLeft;

            if (enrollmentsLeft > 0) {
              alert("Success", "Your pattern has been successfully enrolled.");
            } else {
              alert(
                "Success",
                "Your pattern has been successfully saved and verified."
              );
            }
            setFieldValue("quoteText", "");
            tdna.reset();
          } catch (error) {
            const statusCode = error?.response?.status;
            console.log({ statusCode });
            setFieldValue("quoteText", "");
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
