"use server";

import { z } from "zod";
import prisma from "../prisma";
import { revalidateTag } from "next/cache";

export default async function deletePlan(planId?: string) {
  if (!planId) {
    return { message: "error", data: "Missing required data" };
  }

  try {
    const deletePlanParams = z.string().uuid();
    const validationResult = deletePlanParams.safeParse(planId);

    if (!validationResult.success) {
      return {
        message: "error",
        data: "Validation error: " + validationResult.error?.message,
      };
    }

    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return { message: "error", data: "Plan not found" };
    }

    await prisma.plan.delete({
      where: {
        id: planId,
      },
    });

    const response = {
      message: "success",
      data: "plan deleted",
    };

    revalidateTag("get-plans");

    return response;
  } catch (error) {
    return { message: "error", data: JSON.stringify(error) };
  }
}
