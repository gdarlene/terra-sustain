import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

const Performance: React.FC = ()=>{
return(
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />
    </div>
)
}

export default Performance;