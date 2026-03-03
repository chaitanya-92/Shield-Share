const app = require("./app.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 ShieldShare server running on port ${PORT}`);
});