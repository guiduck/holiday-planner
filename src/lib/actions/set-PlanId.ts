"use server";
import { cookies } from "next/headers";

export const setPlanIdCookie = async (planId: string) => {
  cookies().set({
    name: "planId",
    value: planId,
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default setPlanIdCookie;
