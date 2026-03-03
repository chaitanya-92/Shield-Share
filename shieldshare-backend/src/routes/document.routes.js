const express = require("express"); 
const router = express.Router();

const {uploadDocument} = require("../controllers/document.controller");
const {protect} = require("../middleware/auth.middleware");
const  upload = require("../middleware/upload.middleware");

router.post("/upload", protect,upload.single("file"),  uploadDocument);
module.exports = router;