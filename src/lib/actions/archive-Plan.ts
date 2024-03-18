"use server";

import { z } from "zod";
import prisma from "../prisma";
import { revalidateTag } from "next/cache";

export default async function archivePlan(planId?: string) {
  if (!planId) {
    return { message: "error", data: "Missing required data." };
  }

  try {
    const archivePlanParams = z.string().uuid();
    const validationResult = archivePlanParams.safeParse(planId);

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
      return { message: "error", data: "Plan not found." };
    }

    await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        archived: !plan.archived,
      },
    });

    const response = {
      message: "success",
      data: `updaed from ${plan.archived} to ${!plan.archived}`,
    };

    revalidateTag("get-plans");

    return response;
  } catch (error) {
    return { message: "error", data: JSON.stringify(error) };
  }
}
