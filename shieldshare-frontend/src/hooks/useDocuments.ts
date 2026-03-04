"use client"

import { useEffect, useState } from "react"
import { getDocuments, deleteDocument } from "@/src/lib/api/documentApi"
import { notify } from "@/src/lib/toast"

export interface DocumentItem {
  id: string
  name: string
  size: number
  views: number
  expiresAt: string
  link: string
}

export function useDocuments() {

  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadDocuments = async () => {

    try {

      setLoading(true)

      const data = await getDocuments()

      setDocuments(data)

    } catch (error) {

      console.error(error)

      notify.error("Failed to load documents")

    } finally {

      setLoading(false)

    }

  }

  const handleDelete = async (id: string) => {

    try {

      await deleteDocument(id)

      notify.success("File deleted")

      loadDocuments()

    } catch {

      notify.error("Delete failed")

    }

  }

  useEffect(() => {

    loadDocuments()

  }, [])

  return {
    documents,
    loading,
    loadDocuments,
    handleDelete
  }

}