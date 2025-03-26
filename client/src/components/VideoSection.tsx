import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  description: string;
}

const VideoSection = () => {
  const videos: Video[] = [
    {
      id: 'v262p3m',
      title: 'President Trump Will Stop China From Owning America',
      description: 'I will ensure America\'s future remains firmly in America\'s hands!'
    },
    {
      id: 'v240yku',
      title: 'President Donald J. Trump Declares War on Cartels',
      description: 'Joe Biden prepares to make his first-ever trip to the southern border that he deliberately erased, President Trump announced that when he is president again, it will be the official policy of the United States to take down the drug cartels just as we took down ISIS.'
    },
    {
      id: 'v20tpmc',
      title: 'President Donald J. Trump - Free Speech Policy Initiative',
      description: 'President Donald J. Trump announced a new policy initiative aimed to dismantle the censorship cartel and restore free speech.'
    },
    {
      id: 'v2isx4l',
      title: 'Agenda47: Ending the Nightmare of the Homeless, Drug Addicts, and Dangerously Deranged',
      description: 'For a small fraction of what we spend upon Ukraine, we could take care of every homeless veteran in America. Our veterans are being treated horribly.'
    }
  ];

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
          I AM <span className="font-extrabold">YOUR VOICE</span>. AMERICA FIRST!
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              description={video.description}
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
