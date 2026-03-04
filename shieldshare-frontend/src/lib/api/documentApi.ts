import api from "@/src/lib/axios"

interface UploadOptions {
  maxViews: number
  expiryHours: number
  onProgress?: (percent: number) => void
}

export const uploadDocument = async (
  file: File,
  options: UploadOptions
) => {

  const formData = new FormData()

  formData.append("file", file)
  formData.append("maxViews", String(options.maxViews))
  formData.append("expiryHours", String(options.expiryHours))

  const res = await api.post("/documents/upload", formData, {

    headers: {
      "Content-Type": "multipart/form-data"
    },

    onUploadProgress: (event) => {

      if (!options.onProgress) return

      const percent = Math.round(
        (event.loaded * 100) / (event.total || 1)
      )

      options.onProgress(percent)

    }

  })

  return res.data
}


export const getDocuments = async () => {

  const res = await api.get("/documents")

  return res.data.documents
}


export const deleteDocument = async (id: string) => {

  const res = await api.delete(`/documents/${id}`)

  return res.data
}