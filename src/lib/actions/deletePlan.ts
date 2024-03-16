"use server";

import { z } from "zod";
import prisma from "../prisma";
import { revalidateTag } from "next/cache";

export default async function deletePlan(planId?: string) {
  if (!planId) {
    return { message: "Missing required data" };
  }

  try {
    const deletePlanParams = z.string().uuid();
    const validationResult = deletePlanParams.safeParse(planId);

    if (!validationResult.success) {
      return {
        message: "Validation error: " + validationResult.error?.message,
      };
    }

    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return { message: "Plan not found" };
    }

    await prisma.plan.delete({
      where: {
        id: planId,
      },
    });

    const response = {
      message: "plan deleted",
    };

    revalidateTag("get-plans");

    return response;
  } catch (error) {
    return { message: "error", data: error };
  }
}
