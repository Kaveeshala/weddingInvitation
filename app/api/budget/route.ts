import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Budget from "@/models/Budget";

async function getOrCreateBudget() {
  let budget = await Budget.findOne();

  if (!budget) {
    budget = await Budget.create({
      targetBudget: 0,
      categories: [],
    });
  }

  return budget;
}

export async function GET() {
  try {
    await dbConnect();

    const budget = await getOrCreateBudget();

    return NextResponse.json({
      success: true,
      budget,
    });
  } catch (error) {
    console.error("GET budget error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch budget",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const targetBudget = Number(body.targetBudget);

    if (Number.isNaN(targetBudget) || targetBudget < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Target budget must be a valid positive amount",
        },
        { status: 400 }
      );
    }

    const budget = await getOrCreateBudget();
    budget.targetBudget = targetBudget;
    await budget.save();

    return NextResponse.json({
      success: true,
      budget,
    });
  } catch (error) {
    console.error("PATCH budget error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update target budget",
      },
      { status: 500 }
    );
  }
}