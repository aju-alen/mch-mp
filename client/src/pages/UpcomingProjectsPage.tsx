import React, { useState } from 'react';


const Upcomingprojectspage = () => {
  const [page, setPage] = useState(1);

  // This would typically come from an API, but for demonstration purposes, we'll hardcode it
  const upcomingProjects = [
    // {
    //   id: 1,
    //   date: 'January 17, 2025',
    //   title: 'Road to 47 - January 17, 2025',
    //   link: '/news/c23d0b34-9098-4c68-a60f-5fa6f1284417'
    // },
    // {
    //   id: 2,
    //   date: 'January 16, 2025',
    //   title: 'Scott Bessent Impresses At Senate Confirmation Hearing',
    //   link: '/news/d5bd0d9d-0940-488f-9d28-1749d953ee1b'
    // },
    // {
    //   id: 3,
    //   date: 'January 16, 2025',
    //   title: 'FACT CHECK: President Trump\'s Economic Record',
    //   link: '/news/2e9d20dc-75fd-48a8-ba64-a13a1d8b8cbc'
    // },
    // {
    //   id: 4,
    //   date: 'January 16, 2025',
    //   title: 'Official Portraits Released — And They Go Hard ????',
    //   link: '/news/07024bed-769c-482f-a243-5c5ee1682e9e'
    // },
    // {
    //   id: 5,
    //   date: 'January 15, 2025',
    //   title: 'President Trump Secures Gaza Ceasefire Deal',
    //   link: '/news/317cca41-35a2-483b-9db1-8e9bcb73b0cf'
    // },
    // {
    //   id: 6,
    //   date: 'January 15, 2025',
    //   title: 'Pam Bondi Hits Home Run At Confirmation Hearing',
    //   link: '/news/64f91675-1b75-4829-bd77-26c86e6ddbf5'
    // },
    // {
    //   id: 7,
    //   date: 'January 15, 2025',
    //   title: 'ICYMI: Big Support For Pam Bondi As Attorney General',
    //   link: '/news/15194ebe-0a00-46d5-8267-8a29f63b3a7c'
    // },
    // {
    //   id: 8,
    //   date: 'January 14, 2025',
    //   title: 'Wide Praise For Defense Secretary Nominee Pete Hegseth',
    //   link: '/news/afad1848-613f-4e79-8d3e-d788ab5466be'
    // },
    // {
    //   id: 9,
    //   date: 'January 14, 2025',
    //   title: 'Road to 47 - January 14, 2025',
    //   link: '/news/383bd577-b6f9-432b-a4ad-6b833e924f50'
    // },
    // {
    //   id: 10,
    //   date: 'January 14, 2025',
    //   title: 'Pete Hegseth\'s Qualifications On Full Display At Senate Hearing',
    //   link: '/news/ec87471b-0f7e-4e9f-afbd-6297dd54773c'
    // },
    // {
    //   id: 11,
    //   date: 'January 14, 2025',
    //   title: 'Pete Hegseth Will Return "Warrior Ethos" To Pentagon',
    //   link: '/news/b86c4bb3-c872-42b6-9a33-09e433ba8b6b'
    // },
    // {
    //   id: 12,
    //   date: 'January 10, 2025',
    //   title: 'Road to 47 - January 10, 2025',
    //   link: '/news/917c19bf-0e4e-4d94-8550-05f4a6d1c0da'
    // },
    // {
    //   id: 13,
    //   date: 'January 9, 2025',
    //   title: 'ICYMI: Support Pours In For Pam Bondi As Attorney General',
    //   link: '/news/3f0c1287-e71c-402f-a2de-5ac7ce655167'
    // },
    // {
    //   id: 14,
    //   date: 'January 9, 2025',
    //   title: 'PHOTOS: President Trump Visits Capitol Hill',
    //   link: '/news/9035953a-0022-43d1-80cf-56b9db7aa6f5'
    // },
    // {
    //   id: 15,
    //   date: 'January 8, 2025',
    //   title: 'Debunking Crooked Joe Biden\'s Exit Interview',
    //   link: '/news/b9e219ed-d5ea-4434-8b9d-84b45ecd5d75'
    // },
    // {
    //   id: 16,
    //   date: 'January 7, 2025',
    //   title: 'Road to 47 - January 7, 2025',
    //   link: '/news/82626301-5031-409f-932f-9381f66bfbaf'
    // },
    // {
    //   id: 17,
    //   date: 'January 7, 2025',
    //   title: 'President Trump is Right',
    //   link: '/news/e85ebba0-bf0c-4c71-b1fc-945fd3783b20'
    // },
    // {
    //   id: 18,
    //   date: 'January 7, 2025',
    //   title: 'ANOTHER WIN: President Trump Announces $20 Billion Investment In U.S.',
    //   link: '/news/93f01f4f-bca5-481f-802c-6a36f7a12ec9'
    // },
    // {
    //   id: 19,
    //   date: 'January 6, 2025',
    //   title: 'Biden Burns It All Down As He Nears Exit',
    //   link: '/news/8e3a45b1-f830-44ba-98d2-bc98e26a5e29'
    // },
    // {
    //   id: 20,
    //   date: 'January 3, 2025',
    //   title: 'Road To 47 - January 3, 2025',
    //   link: '/news/377cbd3e-058a-414e-a790-33e494b92851'
    // }
  ];

  const totalPages = 50; // Example value

  return (
    <div className="flex flex-col min-h-screen bg-white">
<div className="flex-1">
<div className="relative h-screen flex items-center justify-center bg-[url('https://dubaianalytica.com/wp-content/uploads/2025/03/89_1.47.1.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 mb-2 sm:mb-4">Upcoming Projects</h1>
        </div>
      </div>

        {/* Search bar */}
        {/* <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 pr-10 rounded"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch />
            </div>
          </div>
        </div> */}

        {/* Recent news header */}
        <div className="max-w-6xl mx-auto px-4 flex justify-center border-b-4 border-trump-maingreen  py-8 mb-6">
          <h2 className="text-xl 2xl:text-xl font-semibold uppercase  ">
            Upcoming Projects
          </h2>
        </div>

        {/* News items list */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="space-y-6">
            {upcomingProjects.map(item => (
              <a
                key={item.id}
                href={item.link}
                className="block border-b border-gray-200 pb-6 hover:bg-gray-50 transition duration-150"
              >
                <div className="text-sm text-gray-600">{item.date}</div>
                <h3 className="text-xl font-bold text-[#263a66]">{item.title}</h3>
              </a>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              className={`w-8 h-8 flex items-center justify-center border ${page === 1 ? 'border-gray-300 text-gray-400' : 'border-gray-300 hover:bg-gray-100'}`}
              disabled={page === 1}
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
            >
              &lt;
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-[#263a66] text-white"
              onClick={() => setPage(1)}
            >
              1
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
              onClick={() => setPage(2)}
            >
              2
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
              onClick={() => setPage(3)}
            >
              3
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            >
              &gt;
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
              onClick={() => setPage(totalPages)}
            >
              &raquo;
            </button>
          </div> */}

          {/* <div className="text-center text-sm text-gray-500 mt-2">
            Showing 1 - 20 of 999
          </div> */}
        </div>

        {/* Social Media Links */}
        {/* <div className="bg-gray-100 py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center space-x-6">
              <a href="https://truthsocial.com/@realDonaldTrump" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/1261798764.png"
                  alt="Truth Social"
                  className="h-8"
                />
              </a>
              <a href="https://rumble.com/c/DonaldTrump" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/537585103.png"
                  alt="Rumble"
                  className="h-8"
                />
              </a>
              <a href="https://twitter.com/TrumpWarRoom" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/2180659290.png"
                  alt="X"
                  className="h-8"
                />
              </a>
              <a href="https://www.tiktok.com/@realdonaldtrump" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/1716151995/2585614386.png"
                  alt="TikTok"
                  className="h-8"
                />
              </a>
              <a href="https://www.facebook.com/DonaldTrump/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/1290627856.png"
                  alt="Facebook"
                  className="h-8"
                />
              </a>
              <a href="https://www.instagram.com/realdonaldtrump/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/29643769.png"
                  alt="Instagram"
                  className="h-8"
                />
              </a>
              <a href="https://www.youtube.com/channel/UCAql2DyGU2un1Ei2nMYsqOA" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://ext.same-assets.com/697774200/1477589357.png"
                  alt="YouTube"
                  className="h-8"
                />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Upcomingprojectspage;
