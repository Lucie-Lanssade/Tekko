const { Schema, model } = require("mongoose");

const InsightsSchema = new Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    compensation: { type: Number, required: true },
    level: { type: String, enum: ["Junior", "Intermediate", "Senior"] },
    company_xp: { type: Number },
    total_xp: { type: Number, required: true },
    company_note: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 6, 7, 8, 9, 10],
    },
    company_review: String,
  },
  { timestamps: true }
);

const Insights = model("Insights", InsightsSchema);

module.exports = Insights;
