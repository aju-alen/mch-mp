const SocialLinks = () => {
  const socialLinks = [
    {
      id: 'truth',
      name: 'Truth Social',
      icon: 'https://ext.same-assets.com/697774200/1261798764.png',
      url: 'https://truthsocial.com/@realDonaldTrump'
    },
    {
      id: 'rumble',
      name: 'Rumble',
      icon: 'https://ext.same-assets.com/697774200/537585103.png',
      url: 'https://rumble.com/c/DonaldTrump'
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: 'https://ext.same-assets.com/697774200/2180659290.png',
      url: 'https://twitter.com/TrumpWarRoom'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'https://ext.same-assets.com/1716151995/2585614386.png',
      url: '#'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'https://ext.same-assets.com/697774200/1290627856.png',
      url: '#'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'https://ext.same-assets.com/697774200/29643769.png',
      url: '#'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'https://ext.same-assets.com/697774200/1477589357.png',
      url: '#'
    }
  ];

  return (
    <section className="py-10 bg-white border-t border-gray-200 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-8 md:gap-12">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="transform transition-transform hover:scale-110"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="h-8 w-auto"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-trump-light-accent mt-6"></div>
    </section>
  );
};

export default SocialLinks;
