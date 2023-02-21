const { Schema, model } = require("mongoose");

const InsightsSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    location: { type: String, required: true },

    title: { type: String, required: true },
    compensation: { type: Number, required: true },
    level: { type: String, enum: ["Junior", "Intermediate", "Senior"] },
    company_xp: { type: Number },
    total_xp: { type: Number, required: true },
    company_note: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    company_review: String,
  },
  { timestamps: true }
);

const Insights = model("Insights", InsightsSchema);

module.exports = Insights;
