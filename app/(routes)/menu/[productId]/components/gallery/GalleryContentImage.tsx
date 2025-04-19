'use client'

import Image from "next/image"

interface GalleryContentImageProps {
    url: string
}
const GalleryContentImage = ({url} :GalleryContentImageProps) => {
  return (
    <div className="w-full h-full aspect-square sm:rounded-lg overflow-hidden relative">
    {/* the styles are bad cuz of the video is cut try to figure it out */}
     <Image
      src={url}
      alt="url"
      className=" w-full h-full object-contain"
      fill
     />
    </div>
  )
}

export default GalleryContentImage
