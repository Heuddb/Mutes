import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Loader({ size = 10, color = '#111' }) {
  return (
    <div className="w-full flex items-center justify-center py-8" aria-busy>
      <BeatLoader size={size} color={color} loading={true} />
    </div>
  )
}
