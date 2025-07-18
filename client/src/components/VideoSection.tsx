import VideoCard from './VideoCard';
import {videos} from '../static-content/Image-meta-data.ts'
interface Video {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const VideoSection = () => {
  return (

    <div className="">
<div className="relative h-screen flex items-center justify-center bg-[url('https://d177n02wywg7h2.cloudfront.net/funyula-images/20250420_081646000_iOS.jpg')]  bg-cover bg-center bg-no-repeat">
        <div className="absolute bg-black/60 inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 mb-2 sm:mb-4">Gallery</h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 mb-2 sm:mb-4">On The Campaign Trail</h1>
        </div>
      </div>
    
    <section
      className="py-20 bg-trump-light-blue relative"
      style={{
        backgroundImage: "url('https://ext.same-assets.com/1716151995/943659152.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light',
        opacity: 0.95
      }}
      >
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
          Gallery <span className="font-extrabold">TITLE HERE</span>. Main
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            description={video.description}
            imageUrl={video.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Red divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-trump-light-accent"></div>
    </section>
          </div>
  );
};

export default VideoSection;
