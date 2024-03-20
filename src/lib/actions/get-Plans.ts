"use server";

import prisma from "@/lib/prisma";

export async function getPlansAction() {
  try {
    const plans = await prisma.plan.findMany();
    if (plans) {
      return { message: "success", data: plans };
    }
  } catch (error) {
    return { message: "error", data: "No plans found in database." };
  }
}
