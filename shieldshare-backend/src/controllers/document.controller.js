const Document = require("../models/document.model")
const crypto = require("crypto")
const path = require("path")
const fs = require("fs")



/*
|--------------------------------------------------------------------------
| Upload Document
|--------------------------------------------------------------------------
*/

const uploadDocument = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      })
    }

    const maxViews = Number(req.body.maxViews) || 5
    const expiryHours = Number(req.body.expiryHours) || 24

    const shareToken = crypto.randomBytes(16).toString("hex")

    const document = await Document.create({

      originalName: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size,
      uploadedBy: req.user.id,

      shareToken,

      views: 0,

      maxViews,

      expiresAt: new Date(
        Date.now() + expiryHours * 60 * 60 * 1000
      )

    })

    res.status(201).json({

      message: "File uploaded successfully",

      shareLink: `${process.env.BASE_URL}/api/documents/share/${shareToken}`,

      documentId: document._id

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: error.message
    })

  }

}



/*
|--------------------------------------------------------------------------
| Share Document (Download)
|--------------------------------------------------------------------------
*/

const shareDocument = async (req, res) => {

  try {

    const { token } = req.params

    const document = await Document.findOne({
      shareToken: token
    })

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      })
    }

    // Expiry check
    if (document.expiresAt && new Date() > document.expiresAt) {
      return res.status(400).json({
        message: "Link expired"
      })
    }

    // Max views check
    if (document.views >= document.maxViews) {
      return res.status(400).json({
        message: "Max views reached"
      })
    }

    // Increment views
    document.views += 1
    await document.save()

    const filePath = path.resolve("uploads", document.storedName)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File missing on server"
      })
    }

    res.sendFile(filePath)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}



/*
|--------------------------------------------------------------------------
| Get User Documents
|--------------------------------------------------------------------------
*/

const getMyDocuments = async (req, res) => {

  try {

    const documents = await Document
      .find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 })

    const formatted = documents.map((doc) => ({

      id: doc._id,
      name: doc.originalName,
      size: doc.size,
      views: doc.views,

      expiresAt: doc.expiresAt,

      link: `${process.env.BASE_URL}/api/documents/share/${doc.shareToken}`

    }))

    res.json({
      documents: formatted
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}



/*
|--------------------------------------------------------------------------
| Delete Document
|--------------------------------------------------------------------------
*/

const deleteDocument = async (req, res) => {

  try {

    const { id } = req.params

    const document = await Document.findById(id)

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      })
    }

    if (document.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      })
    }

    const filePath = path.resolve("uploads", document.storedName)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    await document.deleteOne()

    res.json({
      message: "Document deleted successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}



module.exports = {
  uploadDocument,
  shareDocument,
  getMyDocuments,
  deleteDocument,
}