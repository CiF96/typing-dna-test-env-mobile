import Axios from "axios";

export function errorLogger(error: any) {
  // Do not log cancelled errors
  if (Axios.isCancel(error)) throw error;

  const url = error?.config?.url ?? "UNKNOWN_URL";

  console.log(`Network error accessing ${url}! Logged to console`);

  console.log(
    "Error message:",
    JSON.stringify(error.message ?? "None", null, 2)
  );
  console.log(
    "Error request:",
    JSON.stringify(error.request ?? "None", null, 2)
  );
  console.log(
    "Error response:",
    JSON.stringify(error.response ?? "None", null, 2)
  );
  console.log("Error config:", JSON.stringify(error.config ?? "None", null, 2));

  throw error;
}
