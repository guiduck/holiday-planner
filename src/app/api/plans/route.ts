import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
