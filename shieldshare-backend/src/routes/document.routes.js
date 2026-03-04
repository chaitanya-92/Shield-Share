const express = require("express")
const router = express.Router()

const {
  uploadDocument,
  shareDocument,
  getMyDocuments,
  deleteDocument
} = require("../controllers/document.controller")

const { protect } = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")

router.post("/upload", protect, upload.single("file"), uploadDocument)

router.get("/", protect, getMyDocuments)

router.get("/share/:token", shareDocument)

router.delete("/:id", protect, deleteDocument)

module.exports = router