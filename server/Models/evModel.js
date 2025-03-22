const mongoose = require("mongoose");

const evSchema = new mongoose.Schema({
  ev_id: { type: String, required: true, unique: true },
  ev_name: { type: String, required: true },
  ev_model: { type: String, required: true },
  ev_year: { type: Number, required: true },
  ev_build_year: { type: Number, required: true },
  ev_totkms: { type: Number, required: true },
  ev_registration_no: { type: String, required: true, unique: true },
  ev_insurance_id: { type: String, required: true },
  ev_insurance_company: { type: String, required: true },
  ev_insurance_date: { type: Date, required: true },
  ev_insurance_expiry: { type: Date, required: true },
  ev_last_service_date: { type: Date, required: true },
  ev_next_service_due: { type: Date, required: true },
  ev_last_quality_check: { type: Date, required: true },
  ev_battery_status: { type: String, required: true },
  ev_battery_health: { type: String, required: true },
  ev_body_status: { type: String, required: true },
  ev_registered: { type: String, required: true },
});

const EV = mongoose.model("EV", evSchema);

module.exports = EV;
