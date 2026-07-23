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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    await dbConnect();

    const { categoryId } = await params;
    const body = await req.json();

    const name = body.name?.trim();
    const price = Number(body.price);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Item name is required",
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Item price must be a valid positive amount",
        },
        { status: 400 }
      );
    }

    const budget = await getOrCreateBudget();
    const category = budget.categories.id(categoryId);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 }
      );
    }

    category.items.push({
      name,
      price,
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
    console.error("POST budget item error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add item",
      },
      { status: 500 }
    );
  }
}