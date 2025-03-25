const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Dark MAGA Hat',
      image: 'https://ext.same-assets.com/1716151995/2446411747.png',
      url: 'https://secure.winred.com/trump-national-committee-jfc/storefront/'
    },
    {
      id: 2,
      name: 'Dark MAGA Flag',
      image: 'https://ext.same-assets.com/1716151995/1569177669.jpeg',
      url: 'https://secure.winred.com/trump-national-committee-jfc/storefront/'
    },
    {
      id: 3,
      name: 'MAGA 45-47 Red Hat',
      image: 'https://ext.same-assets.com/1716151995/2778658143.jpeg',
      url: 'https://secure.winred.com/trump-national-committee-jfc/storefront/'
    }
  ];

  return (
    <section className="py-16 bg-trump-light-secondary relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.url}
              className="flex flex-col items-center group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-full h-48 bg-white rounded mb-3 flex justify-center items-center p-4 shadow-sm transition-transform group-hover:scale-105">
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

        <div className="flex justify-center mt-10">
          <a
            href="https://secure.winred.com/trump-national-committee-jfc/storefront/"
            className="inline-flex items-center bg-trump-light-accent text-white hover:bg-trump-light-accent/90 px-6 py-3 font-medium uppercase transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>SHOP NOW</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Red banner */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-trump-light-accent"></div>
    </section>
  );
};

export default ProductsSection;
