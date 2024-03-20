"use server";

import prisma from "@/lib/prisma";

export async function getPlans() {
  try {
    let plans;

    const URL =
      process.env.NODE_ENV !== "development"
        ? process.env.URL_PROD
        : process.env.URL_LOCAL;

    const response = await fetch(`${URL}/api/plans`, {
      next: {
        tags: ["get-plans"],
      },
    });

    if (response) {
      plans = (await response.json()).data;
    }

    try {
      if (!plans) {
        plans = await prisma.plan.findMany();
      }
    } catch (error) {
      return { message: "error", data: "No plans found in database." };
    }

    return { message: "success", data: plans };
  } catch (error) {
    return { message: "error", data: "Failed to get Plans." };
  }
}
