const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");


const app = express();

const cors = require("cors")

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://shieldshare.vercel.app"
    ]
  })
)
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);



app.get("/", (req, res) => {
  res.send("ShieldShare Backend Running");
});

module.exports = app;