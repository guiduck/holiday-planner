import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany();

    plans[0].description = `test ${Math.random()}`;

    const response = {
      message: "success",
      data: plans,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "error", data: error },
      { status: 500 }
    );
  }
}
