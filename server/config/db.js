const mongoose = require('mongoose');
require('dotenv').config();  // Ensure environment variables are loaded

const mongoURL = process.env.mongo_url;  // Get the connection string from environment variables

if (!mongoURL) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1);  // Exit the process with an error code
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err.message));
