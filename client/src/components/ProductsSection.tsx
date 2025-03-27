import React, { useState } from 'react';

const ProductShowcase = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      name: 'Image 1',
      image: 'https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg',
      url: ''
    },
    {
      id: 2,
      name: 'Image 2',
      image: 'https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg',
      url: ''
    },
    {
      id: 3,
      name: 'Image 3',
      image: 'https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg',
      url: ''
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Campaign Rally Highlights',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`
    },
    {
      id: 2,
      title: 'Policy Speech Clip',
      youtubeId: 'qKxfWd79HFI',
      thumbnail: `https://img.youtube.com/vi/qKxfWd79HFI/0.jpg`
    },
    {
      id: 3,
      title: 'Campaign Commercial',
      youtubeId: 'ub82Xb1C8os',
      thumbnail: `https://img.youtube.com/vi/ub82Xb1C8os/0.jpg`
    }
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Images */}
        <div className="bg-gray-50 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Campaign Merchandise
            </h2>

            {/* Large Image Slider */}
            <div
              className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={handleNextImage}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                  transition: 'transform 0.5s ease-in-out',
                  display: 'flex',
                  width: `${images.length * 100}%`
                }}
              >
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-full flex-shrink-0 flex items-center justify-center p-8"
                  >
                    <div className="max-w-full max-h-full flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Item Details */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {images[currentImageIndex].name}
              </h3>
              <a
                href={images[currentImageIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                View Details
              </a>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex 
                    ? 'bg-red-600' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="mt-8">
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold uppercase 
              tracking-wider hover:bg-red-700 transition-colors shadow-md"
            >
              See More
            </button>
          </div>
        </div>

        {/* Right Side - YouTube Videos */}
        <div className="bg-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Campaign Media</h2>

          {/* Large Active YouTube Video */}
          <div className="mb-6 relative">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="aspect-w-16 aspect-h-9 h-24 md:h-96">
                <iframe
                  src={`https://www.youtube.com/embed/${videos[activeVideoIndex].youtubeId}?autoplay=0&modestbranding=1&rel=0`}
                  title={videos[activeVideoIndex].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Video Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setActiveVideoIndex(index)}
                className={`rounded-lg overflow-hidden transform transition-all 
                  ${activeVideoIndex === index
                    ? 'scale-105 border-2 border-red-600 shadow-lg'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;