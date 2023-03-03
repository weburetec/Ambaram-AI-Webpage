import mongoose from "mongoose";

const priceSchema = mongoose.Schema(
  {
    basic: { type: Number, required: true },
    standard: { type: Number, required: true },
    pro: { type: Number, required: true },
    enterprise: { type: String, required: true },
    individual: { type: Number, required: true },
    individualFeature:{ type:[String], required: true},
    individualPlanFeature:{ type:[String], required: true},
    basicFeature:{ type:[String], required: true},
    standardFeature:{ type:[String], required: true},
    proFeature:{ type:[String], required: true},
    enterpriseFeature:{ type:[String], required: true},
    basicPlanFeature:{ type:[String], required: true},
    standardPlanFeature:{ type:[String], required: true},
    proPlanFeature:{ type:[String], required: true},
    enterprisePlanFeature:{ type:[String], required: true},
  },
);

export default mongoose.model("price", priceSchema);