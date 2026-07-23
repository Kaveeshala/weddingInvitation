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

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 }
      );
    }

    const budget = await getOrCreateBudget();

    budget.categories.push({
      name,
      items: [],
    });

    await budget.save();

    return NextResponse.json(
      {
        success: true,
        budget,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST budget category error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add category",
      },
      { status: 500 }
    );
  }
}