
interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const VideoCard = ({ id, title, description, imageUrl }: VideoCardProps) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow-md">
      <div className="relative pb-[56.25%] h-0">
        <img
          src={imageUrl}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        {/* <h3 className="text-xl font-bold mb-2 text-trump-light-navy">{title}</h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{description}</p> */}

        <div className="flex items-center gap-3 border-t border-gray-200 pt-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-trump-light-blue transition-colors"
            aria-label="Share on Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
          </a>
          <a
            href={`http://twitter.com/share?url=${encodeURIComponent(imageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-trump-light-blue transition-colors"
            aria-label="Share on Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;