import { useState, useRef, useCallback } from "react"
import { Camera, FlipCamera, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SelfieCaptureProps {
  onCapture?: (image: string) => void
  trigger?: React.ReactNode
}

export const SelfieCapture = ({ onCapture, trigger }: SelfieCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [overlayType, setOverlayType] = useState<'wanted' | 'crime' | 'drunk' | 'none'>('wanted')

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
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
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageData = canvas.toDataURL("image/jpeg")
      
      if (onCapture) {
        onCapture(imageData)
      }

      handleOpenChange(false)
    }
  }

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user")
    if (stream) {
      stopCamera()
      setTimeout(startCamera, 300)
    }
  }

  const getOverlayClass = () => {
    switch (overlayType) {
      case 'wanted':
        return 'camera-overlay-wanted'
      case 'crime':
        return 'camera-overlay-crime'
      case 'drunk':
        return 'camera-overlay-drunk'
      default:
        return ''
    }
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
          <DialogTitle className="text-center">צילום תמונה</DialogTitle>
        </DialogHeader>
        <div className="relative">
          {/* Camera Preview with Overlay */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover mirror"
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
                variant={overlayType === 'wanted' ? "default" : "outline"}
                size="sm"
                onClick={() => setOverlayType('wanted')}
              >
                מבוקש
              </Button>
              <Button
                variant={overlayType === 'crime' ? "default" : "outline"}
                size="sm"
                onClick={() => setOverlayType('crime')}
              >
                פשע
              </Button>
              <Button
                variant={overlayType === 'drunk' ? "default" : "outline"}
                size="sm"
                onClick={() => setOverlayType('drunk')}
              >
                שיכור
              </Button>
              <Button
                variant={overlayType === 'none' ? "default" : "outline"}
                size="sm"
                onClick={() => setOverlayType('none')}
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
                <FlipCamera className="h-4 w-4" />
              </Button>
              
              <Button
                size="icon"
                className="h-14 w-14 rounded-full capture-button"
                onClick={capturePhoto}
              >
                <ImageIcon className="h-6 w-6" />
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