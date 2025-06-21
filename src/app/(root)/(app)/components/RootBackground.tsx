'use client'

import background from '@/assets/background.webp'
import { useRootBackground } from '@/contexts/RootBackgroundContext'
import Image from 'next/image'
import React, { memo, useRef, useEffect } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

const RootBackground: React.FC = () => {
  const { isVideoPlayed, toggleVideo } = useRootBackground()
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isVideoPlayed) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isVideoPlayed])

  return (
    <>
      <button
        aria-label="Audio toggle"
        type="button"
        className="fixed right-0 top-0 z-[120] mr-3 mt-3 leading-none md:mr-5 md:mt-5 lg:mr-10"
        onClick={() => toggleVideo()}
      >
        {isVideoPlayed ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/media/background.webm"
      />

      <div className="fixed left-0 top-0 h-full w-full overflow-hidden bg-white dark:bg-black">
        <Image
          src={background}
          alt={process.env.NEXT_PUBLIC_HOST + ' background image.'}
          className={'block h-full w-full object-cover'}
        />
      </div>
    </>
  )
}

export default memo(RootBackground)