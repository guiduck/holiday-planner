"use server";
import prisma from "@/lib/prisma";

export async function getPlans() {
  try {
    let plans;

    const response = await fetch("http://localhost:3000/api/plans", {
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

    return plans;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
