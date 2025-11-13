import React from "react";

const AboutPage: React.FC = () => {
  return (
    <>
      {/*HERO SECTION  */}
      <section className="relative isolate overflow-hidden h-[50vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/growing-crops.jpg"
            alt="Happy farmer holding fresh produce in a lush field"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-5">
            About Nta Loss
          </h1>
          <p className="text-xl md:text-2xl text-white font-body leading-relaxed">
            We are empowering farmers, hotels, and logistics partners to build a
            sustainable food ecosystem — one that leaves no one behind and
            delivers <span className="font-semibold text-white">more than 4x return on investment</span>.
          </p>
        </div>
      </section>

      {/*OUR MISSION SECTION*/}
      <section className="py-16 md:py-20 bg-[#efffe79e]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Mission Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#114f01e2] font-subheadings">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-textColor font-body leading-relaxed">
              In the land of a thousand hills, agriculture remains the heartbeat of life.
              Yet, too many farmers and cooperatives lose out due to limited market access,
              outdated pricing, and exploitative middlemen.{" "}
              <strong>Nta Loss bridges this gap</strong> — connecting growers directly with
              buyers and logistics partners to ensure fair trade, transparency, and
              maximum value from every harvest.
            </p>
          </div>

          {/* Mission Image */}
          <div className="flex justify-center">
            <img
              src="/images/developing-farmers.jpg"
              alt="Farmers working together in a cooperative field"
              className="w-full max-w-md rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#fbfff8e4]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#114f01e2] font-subheadings mb-4">
              Our Target Clients
            </h2>
            <p className="text-lg md:text-xl text-textColor font-body max-w-3xl mx-auto">
              We’re committed to reducing post-harvest losses and growing investments{" "}
              <strong>at least 3x</strong> across the supply chain.
            </p>
          </div>

          {/* Client Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Farmers */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center border border-gray-100">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-green-50 p-3">
                <img
                  src="/images/person-holding-cabbage.jpg"
                  alt="Farmer proudly holding fresh cabbage"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1E6E0A] mb-2">
                Farmers & Cooperatives
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Direct market access, fair pricing, digital visibility, and real-time demand insights.
              </p>
            </div>

            {/* Card 2 - Hotels */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-50 rounded-full p-3 flex items-center justify-center">
                <img
                  src="/images/hotel food.jpg"
                  alt="Fresh hotel buffet with local produce"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1E6E0A] mb-2">
                Hotels & Restaurants
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Premium, traceable, farm-fresh produce delivered on time — sustainably sourced.
              </p>
            </div>

            {/* Card 3 - Logistics */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center border border-gray-100">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full p-3">
                <img
                  src="https://img.icons8.com/ios-filled/100/27ab0f/delivery.png"
                  alt="Delivery truck icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1E6E0A] mb-2">
                Logistics Providers
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Reliable routes, real-time tracking, and efficient delivery for perishable goods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;