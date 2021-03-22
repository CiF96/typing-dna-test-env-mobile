import { useContext } from "react";

import { AlertContext } from "~/components/AlertProvider";

export function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined)
    throw new Error("Calling use alert without an AlertProvider");

  return context.alert;
}
