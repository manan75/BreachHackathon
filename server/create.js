const mongoose = require("mongoose");
const EV = require("./Models/evModel"); // Import the schema

// MongoDB Connection (with improved error handling)
const connectionString = "mongodb+srv://MananDataB:manan2005@cluster0.a3rww.mongodb.net/Users"; // Separated for clarity

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Keep the timeout, but be aware of it
  // Consider adding these for more robust connection handling:
  // connectTimeoutMS: 30000,  // Timeout for establishing the initial connection (default is 30s)
  // socketTimeoutMS: 45000,    // Timeout for individual socket operations (default is 0 - no timeout)
})
  .then(() => {
    console.log("✅ Connected to MongoDB");

    // Now that we're connected, insert the data
    return EV.insertMany(evData); // Return the promise for chaining
  })
  .then(() => {
    console.log("✅ EV data inserted successfully!");
    mongoose.connection.close(); // Close the connection after success
  })
  .catch((err) => {
    console.error("❌ Error:", err); // More general error message

    // Check for specific connection errors (more informative)
    if (err.name === 'MongoServerSelectionError') {
      console.error("  Possible causes: Network issues, incorrect connection string, IP whitelist, cluster unavailable.");
    } else if (err.name === 'MongoNetworkError') {
      console.error("  Possible causes: Firewall blocking the connection, DNS resolution problems.");
    } else if (err.name === 'MongoError' && err.message.includes('Authentication failed')) {
      console.error("  Possible cause: Incorrect username or password.");
    } else if (err.name === 'ValidationError'){
        console.error(" Possible cause : Schema validation errors in evData")
    }

    mongoose.connection.close(); // Close the connection on error
  });

const evData = [
  {
    ev_id: "EV003",
    ev_name: "Leaf+",
    ev_model: "SL Plus",
    ev_year: 2023,
    ev_build_year: 2022,
    ev_totkms: 8500,
    ev_registration_no: "CA-99-EV-0003",
    ev_insurance_id: "INS-003",
    ev_insurance_company: "State Farm",
    ev_insurance_date: new Date("2023-05-20"),
    ev_insurance_expiry: new Date("2024-05-20"),
    ev_last_service_date: new Date("2024-04-15"),
    ev_next_service_due: new Date("2024-10-15"),
    ev_last_quality_check: new Date("2024-06-28"),
    ev_battery_status: "88%",
    ev_battery_health: "Good",
    ev_body_status: "Very Good",
    ev_registered: true,
  },
  {
    ev_id: "EV004",
    ev_name: "Bolt",
    ev_model: "LT",
    ev_year: 2022,
    ev_build_year: 2021,
    ev_totkms: 22000,
    ev_registration_no: "NY-22-EV-0004",
    ev_insurance_id: "INS-004",
    ev_insurance_company: "Geico",
    ev_insurance_date: new Date("2022-11-01"),
    ev_insurance_expiry: new Date("2023-11-01"),
    ev_last_service_date: new Date("2024-03-01"),
    ev_next_service_due: new Date("2024-09-01"),
    ev_last_quality_check: new Date("2024-05-18"),
    ev_battery_status: "82%",
    ev_battery_health: "Fair",
    ev_body_status: "Good",
    ev_registered: true,
  },
  {
    ev_id: "EV005",
    ev_name: "i3",
    ev_model: "s",
    ev_year: 2024,
    ev_build_year: 2023,
    ev_totkms: 3000,
    ev_registration_no: "TX-44-EV-0005",
    ev_insurance_id: "INS-005",
    ev_insurance_company: "Progressive",
    ev_insurance_date: new Date("2024-02-28"),
    ev_insurance_expiry: new Date("2025-02-28"),
    ev_last_service_date: new Date("2024-07-15"),
    ev_next_service_due: new Date("2025-01-15"),
    ev_last_quality_check: new Date("2024-07-29"),
    ev_battery_status: "98%",
    ev_battery_health: "Excellent",
    ev_body_status: "Excellent",
    ev_registered: true,
  },
  {
    ev_id: "EV006",
    ev_name: "Kona Electric",
    ev_model: "Ultimate",
    ev_year: 2023,
    ev_build_year: 2022,
    ev_totkms: 15000,
    ev_registration_no: "FL-77-EV-0006",
    ev_insurance_id: "INS-006",
    ev_insurance_company: "Allstate",
    ev_insurance_date: new Date("2023-09-10"),
    ev_insurance_expiry: new Date("2024-09-10"),
    ev_last_service_date: new Date("2024-05-05"),
    ev_next_service_due: new Date("2024-11-05"),
    ev_last_quality_check: new Date("2024-07-01"),
    ev_battery_status: "92%",
    ev_battery_health: "Very Good",
    ev_body_status: "Excellent",
    ev_registered: true,
},
  {
    ev_id: "EV007",
    ev_name: "Mustang Mach-E",
    ev_model: "Premium AWD",
    ev_year: 2022,
    ev_build_year: 2021,
    ev_totkms: 18500,
    ev_registration_no: "WA-33-EV-0007",
    ev_insurance_id: "INS-007",
    ev_insurance_company: "USAA",
    ev_insurance_date: new Date("2022-12-15"),
    ev_insurance_expiry: new Date("2023-12-15"),
    ev_last_service_date: new Date("2024-06-10"),
    ev_next_service_due: new Date("2024-12-10"),
    ev_last_quality_check: new Date("2024-07-22"),
    ev_battery_status: "85%",
    ev_battery_health: "Good",
    ev_body_status: "Very Good",
    ev_registered: true,
  }
  
  
];

// Removed the separate insertMany call; it's now chained within the connection promise.