const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const { registerUser, loginUser } = require("../controllers/auth.controller");

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;