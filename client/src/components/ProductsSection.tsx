import React, { useState, useEffect, useRef } from 'react';

const ProductsSlider = () => {
  const products = [
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

  const [currentOffset, setCurrentOffset] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderContainer = sliderRef.current;
    const sliderWidth = sliderContainer.scrollWidth;
    const totalWidth = sliderWidth / 2;

    const animate = () => {
      setCurrentOffset((prevOffset) => {
        const newOffset = prevOffset - 1;
        return newOffset <= -totalWidth ? 0 : newOffset;
      });
    };

    const intervalId = setInterval(animate, 20);

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate products to create infinite scroll effect
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="py-16 bg-trump-light-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={sliderRef}
          className="flex" 
          style={{ 
            transform: `translateX(${currentOffset}px)`,
            width: '200%',
            display: 'flex'
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <a
              key={index}
              href={product.url}
              className="flex-shrink-0 w-1/3 px-4 flex flex-col items-center group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full h-48 rounded mb-3 flex justify-center items-center p-4 shadow-sm transition-transform group-hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-trump-light-navy text-center text-lg font-medium">{product.name}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Red banner */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-trump-light-accent"></div>
    </section>
  );
};

export default ProductsSlider;