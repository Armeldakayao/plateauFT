import { useRef } from "react"

export default function VideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const enableSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
    }
  }

  return (
    <div className="relative w-full ">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-center"
        src="/videos/bg-home-mairie.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <button
        onClick={enableSound}
        className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded"
      >
        Activer le son
      </button>
    </div>
  )
}
