import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

const CommunityEvents: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">

          {/* View and browse community events */}
          <section className="mt-12 mb-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 font-subheadings mb-4">
              View and Browse Community Events
            </h2>
            <p className="text-base sm:text-lg text-[#607866] font-semibold font-body mb-6 max-w-2xl">
              View, attend global and local events with like-minded individuals and discuss mindful events about sustainability.
            </p>
            <img
              src="/images/coming-soon.png"
              className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 object-contain"
              alt="feature coming soon alert"
            />
          </section>

        </div>
      </main>
    </div>
  );
}

export default CommunityEvents;