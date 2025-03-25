const Hero = () => {
  return (
    <section
      id="main"
      className="relative bg-cover bg-center pt-32 pb-44 md:pt-40 md:pb-56 lg:pt-80 lg:pb-64"
      style={{
        backgroundImage: "url('https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" ></div>
      <div className=" container  md:bottom-12 md:right-16 relative z-10 ">
        <div className="max-w-2xl ">
          <h1 className="text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-6xl font-extrabold text-white leading-tight mb-4 uppercase">
            "A NEW FUTURE FOR FUNYULA BEGINS<br/>RIGHT NOW."
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-white mb-8">
          MICHAEL H. MUGENYA, incoming Member of Parliament for Funyula Constituency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
            // insert link
              // href="https://secure.winred.com/trump-national-committee-jfc/lp-website-contribute-button-victory"
              className="btn-primary w-full sm:w-auto text-center"
              target="_blank"
              rel="noopener noreferrer"
          >
              SUPPORT THE CAUSE 
            </a>
            <a
              href="/join"
              className="border-2 border-white text-white hover:bg-white hover:text-trump-light-navy font-bold py-3 px-8 uppercase tracking-wider transition-all duration-200 w-full sm:w-auto text-center"
            >
              VOLUNTEER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
