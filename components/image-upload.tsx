"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, X, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  initialImage?: string
  onImageChange: (imageUrl: string | null) => void
  name: string
}

export default function ImageUpload({ initialImage, onImageChange, name }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Read the file as a data URL
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setImage(result)
      onImageChange(result)
      setIsUploading(false)
    }
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the image file",
        variant: "destructive",
      })
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImage(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Generate initials from name
  const getInitials = () => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="w-24 h-24 border-4 border-zinc-800">
          {image ? (
            <AvatarImage src={image} alt={name} />
          ) : (
            <AvatarFallback className="bg-dunkin-orange text-white text-xl">{getInitials()}</AvatarFallback>
          )}
        </Avatar>

        <div className="absolute -bottom-2 -right-2 flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-700"
            onClick={triggerFileInput}
          >
            <Camera className="h-4 w-4" />
          </Button>

          {image && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-full"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs border-zinc-700"
          onClick={triggerFileInput}
          disabled={isUploading}
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="h-3 w-3 mr-1" />
              {image ? "Change Photo" : "Upload Photo"}
            </>
          )}
        </Button>
        <p className="text-xs text-zinc-500 mt-1">JPEG, PNG, GIF up to 5MB</p>
      </div>
    </div>
  )
}
