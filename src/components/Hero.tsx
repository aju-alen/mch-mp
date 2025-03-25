const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-[url('https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container relative z-10 
        md:absolute 
        md:bottom-72
        bottom 
        md:right-18
        xl:px-4 
        2xl:px-0


      ">
        <div className="max-w-2xl 
          mx-auto 
          xl:mx-0 
          px-4 
          xl:px-0
        ">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl 
            font-extrabold 
            text-white 
            leading-tight 
            mb-4 
            uppercase 
            text-center 
            xl:text-left
          ">
            "A NEW FUTURE FOR FUNYULA BEGINS<br/>RIGHT NOW."
          </h1>

          <p className="text-xl md:text-2xl 
            font-semibold 
            text-white 
            mb-8 
            text-center 
            xl:text-left
          ">
            MICHAEL H. MUGENYA, incoming Member of Parliament for Funyula Constituency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 
            justify-center 
            xl:justify-start
          ">
            <a
              className="btn-primary 
                w-full 
                sm:w-auto 
                text-center 
                max-w-[300px] 
                mx-auto 
                xl:mx-0
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              SUPPORT THE CAUSE 
            </a>
            <a
              href="/join"
              className="border-2 
                border-white 
                text-white 
                hover:bg-white 
                hover:text-trump-light-navy 
                font-bold 
                py-3 
                px-8 
                uppercase 
                tracking-wider 
                transition-all 
                duration-200 
                w-full 
                sm:w-auto 
                text-center 
                max-w-[300px] 
                mx-auto 
                xl:mx-0
              "
            >
              VOLUNTEER
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;