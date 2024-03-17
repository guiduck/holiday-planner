"use server";

import prisma from "../prisma";
import { cookies, headers } from "next/headers";

export default async function getPlanById() {
  // const url = new URL(headers().get("x-url")!);
  //   const searchParams = url.searchParams;

  // console.log(url);
  //   const { planId } = searchParams;
  const planId = cookies().get("planId")?.value;

  if (!planId) {
    return;
  }

  try {
    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return;
    }

    return plan;
  } catch (error) {
    throw new Error(`error: ${JSON.stringify(error)}`);
  }
}
