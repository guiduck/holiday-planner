"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import prisma from "../prisma";
import { revalidateTag } from "next/cache";
import { PlanType } from "@/models/plan-models";

const createPlanBody = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  locations: z.array(z.string()),
  participants: z.array(z.string()),
});

export type PlanFormType = {
  date?: string;
  title: string;
  description: string;
  locations: string[];
  participants: string[];
};

export const handleCreatePlan = async (
  formData: PlanFormType
): Promise<{ message: string; data: string | PlanType }> => {
  try {
    const dateForm = cookies().get("date")?.value;
    if (!dateForm) {
      return { message: "error", data: "Date is missing in cookies." };
    }

    const validationResult = createPlanBody.safeParse({
      ...formData,
      date: dateForm,
    });

    if (!validationResult.success) {
      return {
        message: "error",
        data: "Validation error: " + validationResult.error?.message,
      };
    }

    const plan = await prisma.plan.create({
      data: validationResult.data,
    });

    revalidateTag("get-plans");

    return { ...validationResult, data: plan, message: "success" };
  } catch (error) {
    return { message: "error", data: JSON.stringify(error) };
  }
};

export default handleCreatePlan;
