import React, { useState } from "react";
import { CloseButton } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const RoleSelector:React.FC<{ isOpen:boolean; onClose: () =>void}> =({isOpen, onClose})=>{
    const [selectedRole,setselectedRole] =useState<string | null>(null);
    const navigate = useNavigate();
    const handleRoleChange = (role:string) =>{
        setselectedRole(role);
    };
    const handleContinue = ()=>{
    if(selectedRole){
        navigate(`/register?role=${selectedRole.toUpperCase()}`);
    };
};
if(!isOpen) return null;
return(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-[#eafbece9] rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-3xl font-semibold text-center mb-2 mt-3 text-primary/95">Select your User Type</h2>
        <p className="text-center text-lg mb-6 font-medium">To create an account, please select your account type and continue to TerraSustain</p>
        <div className="space-y-4">
        <CloseButton
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
            <span className="text-2xl">&times;</span>
        </CloseButton>

          {/* <label className="flex items-center text-lg font-sans font-medium">
            <input
              type="radio"
              name="role"
              value="GOVERNMENT_PERSONAL"
              checked={selectedRole === 'GOVERNMENT_PERSONAL'}
              onChange={() => handleRoleChange('GOVERNMENT_PERSONAL')}
              className="mr-2"
            />
            Gov
          </label> */}
          <label className="flex items-center text-lg  font-sans font-medium">
            <input
              type="radio"
              name="role"
              value="citizen"
              checked={selectedRole === 'citizen'}
              onChange={() => handleRoleChange('citizen')}
              className="mr-2"
            />
            Citizen
          </label>
          {/* <label className="flex items-center text-lg  font-sans font-medium">
            <input
              type="radio"
              name="role"
              value="ngo"
              checked={selectedRole === 'ngo'}
              onChange={() => handleRoleChange('ngo')}
              className="mr-2"
            />
            NGO worker
          </label> */}
        </div>        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-primary/90 text-white px-4 py-2 rounded-md disabled:bg-primary/20"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
);
};
export default RoleSelector;