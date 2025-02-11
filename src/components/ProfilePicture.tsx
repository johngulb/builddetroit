import { useState, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Cropper from "react-easy-crop"
import type { Point, Area } from "react-easy-crop/types"

interface ProfilePictureFormProps {
  data: {
    profile_picture: string | null
  }
  updateData: (data: Partial<{ profile_picture: string | null }>) => void
}

export default function ProfilePictureForm({ data, updateData }: ProfilePictureFormProps) {
  const [image, setImage] = useState<string | null>(data.profile_picture)
  const [croppedImage, setCroppedImage] = useState<string | null>(data.profile_picture)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImage(reader.result as string)
        setIsCropping(true)
      })
      reader.readAsDataURL(file)
    }
  }

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous")
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return null
    }

    canvas.width = 256
    canvas.height = 256

    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, 256, 256)

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty")
          return
        }
        resolve(blob)
      }, "image/jpeg")
    })
  }

  const handleCropImage = useCallback(async () => {
    if (image && croppedAreaPixels) {
      try {
        setIsLoading(true)
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels)
        if (croppedBlob) {
          const previewUrl = URL.createObjectURL(croppedBlob)
          setCroppedImage(previewUrl)
          
          const formData = new FormData()
          formData.append('file', croppedBlob, 'cropped-image.jpg')

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })

          if (!response.ok) {
            throw new Error('Failed to upload image')
          }

          const { url } = await response.json()
          updateData({ profile_picture: url })
          setIsCropping(false)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }, [image, croppedAreaPixels, updateData])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {isCropping && image ? (
        <Box sx={{ position: 'relative', width: 256, height: 256 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={croppedImage || undefined}
            sx={{ width: 100, height: 100, cursor: 'pointer' }}
            onClick={() => document.getElementById("profile-picture-input")?.click()}
          />
          <IconButton
            sx={{
              position: 'absolute',
              bottom: -10,
              right: -10,
              backgroundColor: 'white',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
            onClick={() => document.getElementById("profile-picture-input")?.click()}
          >
            <PhotoCamera />
          </IconButton>
        </Box>
      )}
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        id="profile-picture-input" 
      />

      {isCropping && (
        <Button 
          variant="contained"
          onClick={handleCropImage}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Save"}
        </Button>
      )}
    </Box>
  )
}
