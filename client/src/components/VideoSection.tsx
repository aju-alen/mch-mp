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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
          Gallery <span className="font-extrabold">TITLE HERE</span>. Main
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
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
  );
};

export default VideoSection;
