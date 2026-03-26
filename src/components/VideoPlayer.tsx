import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}

export default function VideoPlayer({ videoId, thumbnailUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-luxury-xl aspect-video bg-gray-800">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
              <Play className="h-10 w-10 md:h-12 md:w-12 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-lg font-medium">{title}</p>
            <p className="text-white/70 text-sm mt-1">Click to play</p>
          </div>
        </button>
      )}
    </div>
  );
}
