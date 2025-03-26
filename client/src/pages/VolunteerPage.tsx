import React, { useState } from 'react';


const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    city: '',
    state: '',
    message: '',
    interests: [],
    privacyPolicy: false
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'privacyPolicy') {
        setFormData({ ...formData, [name]: checked });
      } else {
        // Handle interest checkboxes
        const updatedInterests = checked
          ? [...formData.interests, name]
          : formData.interests.filter(interest => interest !== name);
        setFormData({ ...formData, interests: updatedInterests });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Handle form submission - replace with your integration logic
    console.log(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Main content */}
      <div className="flex-1">
        {/* Background hero image with overlay text */}
        <div className="relative">
          <img
            src="https://i.postimg.cc/Fs2D7G20/112-1-15-2.jpg"
            alt="Trump campaign"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-[#d61936] text-white px-6 py-4 text-center w-full max-w-4xl mx-auto mt-32">
              <h1 className="text-4xl font-bold mb-2">SIGN UP TO VOLUNTEER!</h1>
              <h2 className="text-2xl font-semibold">HELP PRESIDENT TRUMP MAKE AMERICA GREAT AGAIN!</h2>
            </div>
          </div>
        </div>

        {/* Volunteer form section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-[#263a66] mb-6">
            The forgotten men and women are the heart and soul of our incredible movement to Make America Great Again. The only force strong enough to defeat the massive corruption we are up against is you, the American People. In order to restore the fabric of our glorious nation, we need every patriot to support our campaign and make your voices heard.
          </p>

          <form onSubmit={(e) => handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="FIRST NAME *"
                className="border border-gray-300 p-3 w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="LAST NAME *"
                className="border border-gray-300 p-3 w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL *"
                className="border border-gray-300 p-3 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="PHONE *"
                className="border border-gray-300 p-3 w-full"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP *"
                className="border border-gray-300 p-3 w-full"
                value={formData.zip}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="CITY *"
                className="border border-gray-300 p-3 w-full"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <select
                name="state"
                className="border border-gray-300 p-3 w-full bg-white"
                value={formData.state}
                onChange={()=>handleChange}
                required
              >
                <option value="">STATE *</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                {/* Add all states here */}
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">I'm Interested In</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="targetedOutreach"
                    name="targetedOutreach"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="targetedOutreach">Targeted Voter Outreach in my Neighborhood</label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="calling"
                    name="calling"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="calling">Calling Targeted Voters</label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="pollWatching"
                    name="pollWatching"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="pollWatching">Poll Watching</label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="trumpCaptain"
                    name="trumpCaptain"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="trumpCaptain" className="flex items-start">
                    <span>Be a Trump Captain!</span>
                    <img
                      src="https://ext.same-assets.com/697774200/610408731.png"
                      alt="Trump Captain"
                      className="h-5 ml-2"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  Trump Captains will be responsible for turning out targeted voters from a list provided by to them. They are vital to victory in November.
                </p>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="yardSigns"
                    name="yardSigns"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="yardSigns">Deliver Yard Signs to my Neighbors</label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="houseParty"
                    name="houseParty"
                    className="mt-1 mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="houseParty">Host a House Party</label>
                </div>
              </div>
            </div>

            <textarea
              name="message"
              placeholder="MESSAGE"
              rows={5}
              className="w-full border border-gray-300 p-3"
              value={formData.message}
              onChange={()=>handleChange}
            ></textarea>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                className="mt-1 mr-2"
                onChange={handleChange}
                required
              />
              <label htmlFor="privacyPolicy" className="text-sm">
                By providing this information you are acknowledging and agreeing to the <span className="text-[#d61936]">Privacy Policy</span>
              </label>
            </div>

            {/* reCAPTCHA placeholder */}
            <div className="border border-gray-300 p-4 w-80">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>I'm not a robot</span>
                <img
                  src="https://ext.same-assets.com/17751892/916436847.png"
                  alt="reCAPTCHA"
                  className="h-12 ml-auto"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d61936] text-white py-4 font-semibold text-lg flex justify-center items-center"
            >
              SUBMIT
              {/* <FaArrowRight className="ml-2" /> */}
            </button>

            <p className="text-center text-[#d61936] font-medium">
              Don't want to fill out the form? Text "Volunteer" to 88022
            </p>

            <p className="text-sm text-gray-600">
              By providing your phone number, you are consenting to receive calls and recurring SMS/MMS messages, including autodialed and automated calls and texts, to that number from each of the participating committees in Trump National Committee JFC, Inc. ("TNC"), a joint fundraising committee composed of and authorized by Donald J. Trump for President 2024, Inc. ("DJTFP"), the principal campaign committee of Donald J. Trump, and the Republican National Committee ("RNC"). Msg & data rates may apply. Terms & conditions/privacy policy apply. <a href="http://txtterms.co/88022-2" className="text-[#d61936]">txtterms.co/88022-2</a>
            </p>
          </form>
        </div>

        {/* Donate section */}
        <div className="bg-[#263a66] py-12 text-center">
          <a href="#" className="inline-block">
            <h2 className="text-4xl text-white font-bold">Donate</h2>
            <div className="w-20 h-1 bg-[#d61936] mx-auto mt-2"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
