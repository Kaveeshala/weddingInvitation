import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ categoryId: string; itemId: string }> }
) {
  try {
    await dbConnect();
    const { categoryId, itemId } = await params;

    const budget = await Budget.findOne();
    if (!budget) {
      return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
    }

    const category = budget.categories.id(categoryId);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const item = category.items.id(itemId);
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    item.deleteOne();
    await budget.save();

    return NextResponse.json({ success: true, budget }, { status: 200 });
  } catch (error) {
    console.error("DELETE budget item error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete item" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ categoryId: string; itemId: string }> }
) {
  try {
    await dbConnect();
    const { categoryId, itemId } = await params;
    const body = await req.json();

    const budget = await Budget.findOne();
    if (!budget) {
      return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
    }

    const category = budget.categories.id(categoryId);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    const item = category.items.id(itemId);
    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    if (body.name !== undefined) item.name = body.name;
    if (body.price !== undefined) item.price = body.price;

    await budget.save();

    return NextResponse.json({ success: true, budget }, { status: 200 });
  } catch (error) {
    console.error("PATCH budget item error:", error);
    return NextResponse.json({ success: false, message: "Failed to update item" }, { status: 500 });
  }
}
