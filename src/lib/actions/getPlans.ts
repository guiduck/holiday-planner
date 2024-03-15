import prisma from "@/lib/prisma";

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany();
    return plans;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
