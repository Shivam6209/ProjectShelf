'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Maximize2 } from 'lucide-react';
import MediaRenderer from './MediaRenderer';
import { Button } from '@/components/ui/button';

interface MediaItem {
  id?: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  caption?: string;
}

interface MediaGalleryProps {
  mediaItems: MediaItem[];
  className?: string;
  initialLayout?: 'masonry' | 'slider';
}

export default function MediaGallery({
  mediaItems,
  className = '',
  initialLayout = 'masonry'
}: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layout, setLayout] = useState<'masonry' | 'slider'>(initialLayout);

  // No media to display
  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  // For single media item, display it beautifully
  if (mediaItems.length === 1) {
    return (
      <div className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}>
        <MediaRenderer
          media={mediaItems[0]}
          aspectRatio={mediaItems[0].type === 'VIDEO' ? 'video' : 'auto'}
          className="w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            {mediaItems[0].caption && (
              <p className="text-white text-sm font-medium">{mediaItems[0].caption}</p>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
              onClick={() => setIsModalOpen(true)}
            >
              <Maximize2 className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // For multiple items, display as masonry or slider
  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className={className}>
      {layout === 'masonry' ? (
        // Beautiful Masonry Grid Layout
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {mediaItems.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative break-inside-avoid mb-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              onClick={() => openModal(index)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <MediaRenderer
                  media={item}
                  aspectRatio="auto"
                  showCaption={false}
                  isPreview={true}
                  className="w-full transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Media Type Indicator */}
                  <div className="absolute top-4 left-4">
                    {item.type === 'VIDEO' && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        Video
                      </div>
                    )}
                  </div>
                  
                  {/* Expand Button */}
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Maximize2 className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  
                  {/* Caption */}
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Enhanced Slider Layout
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <MediaRenderer
              media={mediaItems[activeIndex]}
              aspectRatio={mediaItems[activeIndex].type === 'VIDEO' ? 'video' : 'auto'}
              className="w-full"
            />
            
            {/* Slider Navigation */}
            {mediaItems.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('prev');
                  }}
                  className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 rounded-full h-12 w-12"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('next');
                  }}
                  className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 rounded-full h-12 w-12"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </Button>
              </div>
            )}
            
            {/* Caption Overlay */}
            {mediaItems[activeIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  {mediaItems[activeIndex].caption}
                </p>
              </div>
            )}
          </div>
          
          {/* Elegant Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary shadow-lg' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Layout Toggle */}
      {mediaItems.length > 1 && (
        <div className="flex justify-center mt-8">
          <div className="bg-gray-100 rounded-full p-1 flex gap-1">
            <Button
              variant={layout === 'masonry' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLayout('masonry')}
              className="rounded-full px-4"
            >
              Gallery
            </Button>
            <Button
              variant={layout === 'slider' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLayout('slider')}
              className="rounded-full px-4"
            >
              Slideshow
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Close Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 text-white hover:bg-white/20 rounded-full h-10 w-10"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <MediaRenderer
                media={mediaItems[activeIndex]}
                aspectRatio={mediaItems[activeIndex].type === 'VIDEO' ? 'video' : 'auto'}
                className="max-h-[85vh] w-full"
              />
            </div>
            
            {/* Navigation in Modal */}
            {mediaItems.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('prev');
                  }}
                  className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateMedia('next');
                  }}
                  className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            )}
            
            {/* Caption in Modal */}
            {mediaItems[activeIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <p className="text-white text-xl font-medium text-center">
                  {mediaItems[activeIndex].caption}
                </p>
              </div>
            )}
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {mediaItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 