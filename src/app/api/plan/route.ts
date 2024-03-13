import { type NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  try {
    const createPlanBody = z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      locations: z.array(z.string()),
      participants: z.array(z.string()),
    });

    const { title, description, date, locations, participants } =
      createPlanBody.parse(requestBody);

    if (!title || !description || !date || !locations || !participants) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.create({
      data: {
        title,
        description,
        date,
        locations,
        participants,
      },
    });

    const response = {
      message: "success",
      data: plan,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "error", data: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const planIdParam = searchParams.get("planId");

  try {
    const getPlanParams = z.string().uuid();
    const planId = getPlanParams.parse(planIdParam);

    if (!planId) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    const response = {
      message: "success",
      data: plan,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "error", data: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const planIdParam = searchParams.get("planId");

  try {
    const deletePlanParams = z.string().uuid();
    const planId = deletePlanParams.parse(planIdParam);

    if (!planId) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    await prisma.plan.delete({
      where: {
        id: planId,
      },
    });

    const response = {
      message: "plan deleted",
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "error", data: error },
      { status: 500 }
    );
  }
}
