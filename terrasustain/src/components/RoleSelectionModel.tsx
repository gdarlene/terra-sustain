import React, { useState } from "react";
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
      <div className="bg-lime-200 rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Select your User Type</h2>
        <p className="text-center mb-6">Please select your account type to continue to TerraSustain</p>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="gov"
              checked={selectedRole === 'gov'}
              onChange={() => handleRoleChange('gov')}
              className="mr-2"
            />
            Gov
          </label>
          <label className="flex items-center">
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
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="ngo"
              checked={selectedRole === 'ngo'}
              onChange={() => handleRoleChange('ngo')}
              className="mr-2"
            />
            NGO worker
          </label>
        </div>
        {selectedRole && (
          <p className="text-center mt-4 font-semibold">Role: {selectedRole.toUpperCase()}</p>
        )}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ×
        </button>
      </div>
    </div>
);
};
export default RoleSelector;