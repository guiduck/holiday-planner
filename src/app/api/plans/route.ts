import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany();

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
