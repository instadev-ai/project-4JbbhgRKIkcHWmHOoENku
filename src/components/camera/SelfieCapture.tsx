import { useState, useRef, useCallback } from "react"
import { Camera, RotateCw, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SelfieCaptureProps {
  onCapture?: (imageData: string) => void
  trigger?: React.ReactNode
}

export const SelfieCapture = ({ onCapture, trigger }: SelfieCaptureProps) => {
  const [open, setOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
        },
        audio: false,
      })

      setStream(newStream)

      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }, [facingMode, stream])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setCapturedImage(null)
  }, [stream])

  const toggleCamera = () => {
    setFacingMode(prev => (prev === "user" ? "environment" : "user"))
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      startCamera()
    } else {
      stopCamera()
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext("2d")
      if (context) {
        // Flip the image horizontally if using front camera
        if (facingMode === "user") {
          context.scale(-1, 1)
          context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
          context.scale(-1, 1) // Reset the transformation
        } else {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
        }

        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)
      }
    }
  }

  const handleSave = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage)
    }
    setOpen(false)
    stopCamera()
  }

  const handleRetake = () => {
    setCapturedImage(null)
    startCamera()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger || (
        <Button variant="outline" size="icon">
          <Camera className="h-4 w-4" />
        </Button>
      )}
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">צלם תמונה</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {!capturedImage ? (
            <>
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={`w-full h-full object-cover ${
                    facingMode === "user" ? "scale-x-[-1]" : ""
                  }`}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleCamera}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full"
                  onClick={capturePhoto}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRetake} variant="outline">
                  צלם שוב
                </Button>
                <Button onClick={handleSave}>
                  שמור
                </Button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  )
}