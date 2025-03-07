import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SelfieCaptureProps {
  onCapture: (imageData: string) => void
  trigger?: React.ReactNode
}

type OverlayType = "wanted" | "crime" | "drunk" | "clean"

export const SelfieCapture = ({ onCapture, trigger }: SelfieCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [selectedOverlay, setSelectedOverlay] = useState<OverlayType>("clean")
  const [isOpen, setIsOpen] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      console.log("Starting camera with facing mode:", facingMode)
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      console.log("Camera stream obtained successfully")
      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }, [facingMode, stream])

  const stopCamera = useCallback(() => {
    console.log("Stopping camera")
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const handleOpenChange = (open: boolean) => {
    console.log("Dialog open state changing to:", open)
    setIsOpen(open)
    if (open) {
      setCapturedImage(null)
      startCamera()
    } else {
      stopCamera()
    }
  }

  const toggleCamera = () => {
    console.log("Toggling camera")
    setFacingMode(prev => prev === "user" ? "environment" : "user")
    startCamera()
  }

  const capturePhoto = () => {
    console.log("Attempting to capture photo")
    if (!isVideoReady) {
      console.log("Video not ready yet")
      return
    }

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      console.log("Video dimensions:", video.videoWidth, video.videoHeight)
      
      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Handle mirroring for selfie mode
        if (facingMode === "user") {
          ctx.scale(-1, 1)
          ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
          ctx.scale(-1, 1)
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        }
        
        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg')
        console.log("Photo captured successfully")
        setCapturedImage(imageData)
        stopCamera() // Stop the camera after capturing
      }
    } else {
      console.log("Video or canvas ref not available")
    }
  }

  const handleRetake = () => {
    console.log("Retaking photo")
    setCapturedImage(null)
    startCamera()
  }

  const handleSave = () => {
    if (capturedImage) {
      console.log("Saving captured image")
      onCapture(capturedImage)
      handleOpenChange(false)
    }
  }

  // Handle video ready state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded")
      setIsVideoReady(true)
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            צלם תמונה
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">צלם תמונה</DialogTitle>
        </DialogHeader>

        {capturedImage ? (
          // Show captured image preview
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={handleRetake} variant="outline">
                צלם שוב
              </Button>
              <Button onClick={handleSave}>
                שמור
              </Button>
            </div>
          </div>
        ) : (
          // Show camera preview
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
              />
              
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white/40" />
              <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white/40" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white/40" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white/40" />
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
              {/* Overlay Selection */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={selectedOverlay === "wanted" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOverlay("wanted")}
                >
                  מבוקש
                </Button>
                <Button
                  variant={selectedOverlay === "crime" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOverlay("crime")}
                >
                  פשע
                </Button>
                <Button
                  variant={selectedOverlay === "drunk" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOverlay("drunk")}
                >
                  שיכור
                </Button>
                <Button
                  variant={selectedOverlay === "clean" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOverlay("clean")}
                >
                  נקי
                </Button>
              </div>

              {/* Camera Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleCamera}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full capture-button"
                  onClick={capturePhoto}
                >
                  <Camera className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </DialogContent>
    </Dialog>
  )
}