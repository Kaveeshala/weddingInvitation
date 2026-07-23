import mongoose, { Schema, model, models } from "mongoose";

const BudgetItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BudgetCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [BudgetItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const BudgetSchema = new Schema(
  {
    targetBudget: {
      type: Number,
      default: 0,
      min: 0,
    },
    categories: {
      type: [BudgetCategorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Budget = models.Budget || model("Budget", BudgetSchema);

export default Budget;