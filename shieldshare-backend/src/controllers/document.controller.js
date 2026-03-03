const uploadDocument = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({  
        message: "File uploaded successfully",
        originalName: req.file.originalname,
        storedName: req.file.filename,
        size: req.file.size,
        uploadedBy: req.user.email,
    });
};

module.exports = { uploadDocument };