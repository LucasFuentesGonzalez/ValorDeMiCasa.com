'use client'

export default function LightRayBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="ray ray-one" />
      <div className="ray ray-two" />
      <div className="ray ray-three" />
      <div className="ray ray-four" />
      <div className="ray ray-five" />
    </div>
  )
}
