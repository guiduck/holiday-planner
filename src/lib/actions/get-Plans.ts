"use server";

import prisma from "@/lib/prisma";

export async function getPlans() {
  try {
    let plans;

    const response = await fetch(`${process.env.URL_LOCAL}/api/plans`, {
      next: {
        tags: ["get-plans"],
      },
    });

    if (response) {
      plans = (await response.json()).data;
    }

    if (!plans) {
      plans = await prisma.plan.findMany();
    }

    return { message: "success", data: plans };
  } catch (error) {
    return { message: "error", data: "Failed to get plans from database." };
  }
}
