import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    await dbConnect();
    const { categoryId } = await params;

    const budget = await Budget.findOne();
    if (!budget) {
      return NextResponse.json({ success: false, message: "Budget not found" }, { status: 404 });
    }

    const category = budget.categories.id(categoryId);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found" }, { status: 404 });
    }

    category.deleteOne();
    await budget.save();

    return NextResponse.json({ success: true, budget }, { status: 200 });
  } catch (error) {
    console.error("DELETE budget category error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete category" }, { status: 500 });
  }
}
