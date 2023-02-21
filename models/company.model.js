const { Schema, model } = require('mongoose');

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    // location: { type: String, required: true },
  },
  { timestamps: true }
);

const Company = model('Company', companySchema);

module.exports = Company;
