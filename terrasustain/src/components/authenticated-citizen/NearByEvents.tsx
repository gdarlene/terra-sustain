import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";
const CommunityEvents:React.FC = () =>{
    return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        {/* view and browse community events */}
        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 font-subheading mb-4">
            View and Browse Community Events
          </h2>
          <p className="text-lg text-[#607866] font-semibold font-body mb-6">
            View, attend global and local events with like minded individuals and discuss mindful events about sustainability
          </p>
          <img src="/images/coming-soon.png" className="w-[70%] align-middle lg:ml-40" alt="feature coming soon alert" />
        </section>
        </div>
      </main>
    </div>
  );
}

export default CommunityEvents