import React from "react";

const AboutPage: React.FC = () => {
  return (
    <>
      {/*HERO SECTION  */}
      <section className="relative isolate overflow-hidden h-[50vh] flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/from-to-destroyed.jpg"
            alt="from lush to no tree"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
          <h1 className="text-5xl font-bold text-[#95a42eeb] sm:text-5xl mb-5">
            About TerraSustain
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-body leading-relaxed">
            We are empowering NGOs, Government Authorities to get access to real time information about how the environment is being protected 
            <span className="font-semibold text-[#cca730f3]"> Be more than sure of your contribution to the environment</span>.
          </p>
        </div>
      </section>

      {/*OUR MISSION SECTION*/}
      <section className="py-16 md:py-20 bg-[#efffe79e]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Main Image */}
          <div className="relative flex justify-center md:order-2 order-1">
            <img
              src="/images/person-planting-trees.png"
              alt="person planting trees"
              className="w-full max-w-sm rounded-2xl shadow-2xl object-cover z-10"
            />
            <img
              src="/images/community-together.png"
              alt="people working hand in hand for sustainability"
              className="hidden md:block w-full max-w-xs rounded-2xl shadow-lg object-cover absolute top-3/4 left-2/3 translate-x-1/2-translate-y-full opacity-90 z-0"
            />
          </div>
          {/* Mission Text*/}
          <div className="space-y-6 text-left md:order-1 order-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#806612f3] font-subheadings">
              Our Mission
            </h2>
            <p className="text-2xl md:text-xl text-textColor font-serif leading-relaxed">
              In this modern era Sustainability is being focused on due to the increase in human activities which continues to pose the question of what is going to keep happening.
              Yet, too many people don't get a platform to get into action or some lack real time information about where land is being destroyed and logging is carried out on a large scale,
              while others need yet some motivation to begin taking "action"
              <strong> TerraSustain </strong>bridges this gap — connecting environment activists like <span className="font-semibold">NGOs, Citizens and government authorities</span> in charge through a community with a wide available information
            </p>
          </div>
        </div>
      </section>
      {/* vision */}
      <section className="py-16 md:py-20 bg-[#fbfff8e4]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl text-center md:text-4xl font-semibold text-[#806612f3] font-subheadings mb-4">
              Our Vision
            </h2>
            <p className="justify-center text-lg md:text-xl text-textColor font-body max-w-5xl mx-auto">
              To empower every human being a guardian of our earth's precious landscapes, our platform harnesses community-driven reporting, AI-powered insights,
               and gamified engagement to combat deforestation and soil erosion, fostering a resilient, green future where collective action restores 
               and preserves our environment for generations to come.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* expected future environment */}
            <div className="p-6 rounded-none hover:shadow-md transition-shadow text-center border-none">
                <img
                  src="/images/beautiful-environment.png"
                  alt="Farmer proudly holding fresh cabbage"
                  className="w-full h-full object-cover rounded-sm"
                />
            </div>
            <div className="flex">
              <h4 className="text-xl mt-32 text-centercfont-semibold text-[#1E6E0A]">
                  <i>"An environment where every organism in considered and their habitats are protected".</i>
                </h4>
            </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;