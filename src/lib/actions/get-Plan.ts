"use server";

import prisma from "../prisma";
import { cookies } from "next/headers";

export default async function getPlanById() {
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

    return { message: "success", data: plan };
  } catch (error) {
    return {
      message: "error",
      data: "Failed to get plan using id from database.",
    };
  }
}
