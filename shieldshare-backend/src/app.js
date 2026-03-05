const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");


const app = express();

app.use(
  cors({
    origin: [
      "https://shield-share.vercel.app"
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