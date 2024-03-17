"use server";
import { cookies } from "next/headers";
import { formatDate } from "../utils/formatDate";

export const setDateCookie = async (date: Date) => {
  //   cookies().set("date", date.getDate().toString());

  cookies().set({
    name: "date",
    value: formatDate(date),
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default setDateCookie;
