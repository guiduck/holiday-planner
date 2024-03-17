import { cookies } from "next/headers";

export default async function getErrors() {
  const error = cookies().get("error");

  if (!error) return { show: false, type: "success", message: "", time: 0 };

  console.log(error);

  const errorObj = JSON.parse(error || "");
  return errorObj;
}
