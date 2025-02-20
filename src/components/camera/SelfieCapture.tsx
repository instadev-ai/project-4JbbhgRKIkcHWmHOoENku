import { useState, useRef, useCallback } from "react"
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
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }, [facingMode])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      startCamera()
    } else {
      stopCamera()
      setCapturedImage(null)
    }
  }

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user")
    if (stream) {
      stopCamera()
      setTimeout(startCamera, 300) // Give some time for camera to switch
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw the video frame to the canvas
      context.save()
      if (facingMode === "user") {
        // Flip horizontally for selfie mode
        context.scale(-1, 1)
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
      } else {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      context.restore()

      // Add overlay effects based on selectedOverlay
      switch (selectedOverlay) {
        case "wanted":
          context.strokeStyle = "red"
          context.lineWidth = 20
          context.strokeRect(0, 0, canvas.width, canvas.height)
          context.font = "60px Arial"
          context.fillStyle = "red"
          context.fillText("WANTED", 20, 60)
          break
        case "crime":
          context.strokeStyle = "yellow"
          context.lineWidth = 20
          context.strokeRect(0, 0, canvas.width, canvas.height)
          context.font = "60px Arial"
          context.fillStyle = "yellow"
          context.fillText("🚨", canvas.width - 80, 60)
          break
        case "drunk":
          // Add rainbow gradient border
          const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "red")
          gradient.addColorStop(0.2, "orange")
          gradient.addColorStop(0.4, "yellow")
          gradient.addColorStop(0.6, "green")
          gradient.addColorStop(0.8, "blue")
          gradient.addColorStop(1, "violet")
          context.strokeStyle = gradient
          context.lineWidth = 20
          context.strokeRect(0, 0, canvas.width, canvas.height)
          // Add beer emoji
          context.font = "60px Arial"
          context.fillText("🍺", 20, 60)
          break
        default:
          // Clean mode - no overlay
          break
      }

      const imageData = canvas.toDataURL("image/jpeg")
      setCapturedImage(imageData)
    }
  }

  const handleSave = () => {
    if (capturedImage) {
      onCapture(capturedImage)
      handleOpenChange(false)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    startCamera()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            <span>צלם תמונה</span>
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">צלם תמונה</DialogTitle>
        </DialogHeader>
        <div className="relative">
          {/* Camera Preview with Overlay */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
            />
            
            {/* Fun Overlays */}
            <div className={`absolute inset-0 pointer-events-none ${getOverlayClass()}`} />
            
            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-white/40" />
            <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-white/40" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-white/40" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-white/40" />
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-col gap-4">
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

          {/* Hidden canvas for capturing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function for overlay classes
const getOverlayClass = () => {
  return "camera-overlay-wanted"
}