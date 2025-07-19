const fs = require("fs");
const path = require("path");

// Check if .env file already exists
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, "env.example");

if (fs.existsSync(envPath)) {
  console.log("✅ .env file already exists");
  console.log(
    "If you want to recreate it, delete the existing .env file first"
  );
} else if (fs.existsSync(envExamplePath)) {
  try {
    // Copy env.example to .env
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ Successfully created .env file from env.example");
    console.log(
      "📝 Please edit the .env file with your actual configuration values"
    );
  } catch (error) {
    console.error("❌ Error creating .env file:", error.message);
  }
} else {
  console.log("❌ env.example file not found");
  console.log(
    "Please create a .env file manually with the required environment variables"
  );
}
