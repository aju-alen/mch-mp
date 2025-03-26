import React from 'react';

const PlatformPage = () => {
  // Array of 20 platform items
  const platformItems = [
    "REVIVE OUR ECONOMY by empowering farmers, livestock keepers, and fishermen, creating industries, and driving local wealth.",
    "FIX OUR ROADS AND MARKETS through tarmacking, proper drainage, and market center lighting to boost trade and accessibility.",
    "UPGRADE OUR SCHOOLS AND UNIVERSITIES by building institutions, training teachers, improving grades, and ensuring every child gets a fair chance at success.",
    "REBUILD OUR HEALTHCARE SYSTEM by upgrading hospitals, stocking medicine, promoting preventive care, and restoring Holy Family Hospital, Nangina.",
    "CREATE JOBS AND EMPOWER YOUTH through local industries, vocational training, and securing both national and international job opportunities.",
    "END THE WATER CRISIS by constructing dams, drilling boreholes, and ensuring every village has access to clean, sustainable water.",
    "POWER EVERY HOME by expanding electricity connections, investing in solar and wind energy, and reducing electricity costs.",
    "STRENGTHEN SECURITY by upgrading police infrastructure, supporting local law enforcement, and enforcing community safety measures.",
    "ENSURE FAIR BURSARY DISTRIBUTION by prioritizing needy children, increasing scholarships, and eliminating corruption in education funding.",
  ];

  // Social media icons
  const socialIcons = [
    { name: "Truth Social", icon: "https://ext.same-assets.com/697774200/1261798764.png" },
    { name: "Rumble", icon: "https://ext.same-assets.com/697774200/537585103.png" },
    { name: "X", icon: "https://ext.same-assets.com/697774200/2180659290.png" },
    { name: "TikTok", icon: "https://ext.same-assets.com/1716151995/2585614386.png" },
    { name: "Facebook", icon: "https://ext.same-assets.com/697774200/1290627856.png" },
    { name: "Instagram", icon: "https://ext.same-assets.com/697774200/29643769.png" },
    { name: "YouTube", icon: "https://ext.same-assets.com/697774200/1477589357.png" }
  ];

  const footerSocialIcons = [
    { name: "Truth Social", icon: "https://ext.same-assets.com/697774200/1261798764.png" },
    { name: "Rumble", icon: "https://ext.same-assets.com/697774200/537585103.png" },
    { name: "X", icon: "https://ext.same-assets.com/697774200/2180659290.png" }
  ];

  return (
    <div className="font-montserrat text-trump-blue">

      {/* Hero Section */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[400px] bg-cover bg-center" style={{
        backgroundImage: `url('https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg')`
      }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 mb-2 sm:mb-4">VISION 2027</h1>
        </div>
      </div>

      {/* Red Box Call-to-Action */}
      <div className="bg-trump-red text-white py-6 px-4 text-center w-3/5 mx-auto z-20">
        <h4 className="text-lg md:text-2xl font-bold">READ THE OFFICIAL 2027 FUTURE-PROOF FUNYULA PLATFORM <a href="#" className="underline">HERE</a></h4>
        <h4 className="text-xl md:text-3xl font-bold mt-4">
        Hon. Mugenya’s 9 FOCUS POINTS 
        </h4>
        <h4 className="text-xl md:text-2xl font-bold mt-4">
         TO RESTORE THE GLORY OF SAMIA!
        </h4>
      </div>

      {/* Platform Items List */}
      <div className="max-w-4xl mx-auto pt-24 px-4 ">
        {platformItems.map((item, index) => (
          <div key={index} className="flex mb-6">
            <div className="bg-trump-blue text-white font-bold w-10 h-10 flex justify-center items-center flex-shrink-0">
              {index + 1}
            </div>
            <div className="ml-4 flex items-center">
              <p className="text-sm md:text-base font-semibold uppercase">{item}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Read More Button */}
      <div className="max-w-4xl mx-auto pb-12 px-4 pt-8">
        <a href="#" className="bg-trump-red text-white py-3 md:py-4 px-4 md:px-8 font-bold flex items-center justify-center w-full md:w-[600px] mx-auto">
          <span>Read more about the 2027 Future-Proof Funyula Platform</span>
          <span className="ml-4">→</span>
        </a>
      </div>

      {/* Social Media Bar */}
      <div className="bg-white py-8 md:py-12">
        {/* <div className="max-w-4xl mx-auto flex justify-center flex-wrap md:flex-nowrap gap-6 md:space-x-8 px-4">
          {socialIcons.map((icon, index) => (
            <a key={index} href="#" className="transform hover:scale-110 transition-transform">
              <img src={icon.icon} alt={icon.name} className="h-8 w-8 md:h-10 md:w-10" />
            </a>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default PlatformPage;
