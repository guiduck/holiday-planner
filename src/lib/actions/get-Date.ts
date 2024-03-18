"use server";
import { cookies } from "next/headers";

export async function getDateCookie() {
  try {
    const date = cookies().get("date")?.value;
    if (date) {
      return { message: "success", data: date };
    }
  } catch (error) {
    return {
      message: "error",
      data: "No date is selected.",
    };
  }
}

export default getDateCookie;
