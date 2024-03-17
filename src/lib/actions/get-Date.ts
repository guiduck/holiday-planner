"use server";
import { cookies } from "next/headers";

export const getDateCookie = async () => cookies().get("date")?.value;

export default getDateCookie;
