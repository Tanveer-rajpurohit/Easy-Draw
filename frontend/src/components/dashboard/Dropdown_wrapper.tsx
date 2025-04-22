/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { FilePenLine, LogOut, Settings, Users } from "lucide-react";
import {  useContext, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import SettingsComponent from "./Settings";
import JoinTeam from "./JoinTeam";
import DataContext from "../../context/DataContext";

const Dropdown_wrapper = () => {
 
  const {handelCurrentTeam,currentTeam,data} = useContext(DataContext)

  if(!currentTeam & data){
    return null;
  }

  const [dropIsOpen, setDropIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  useEffect(() => {
    if (dropIsOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [dropIsOpen]);

  const toggleDrop = () => {
    setDropIsOpen(!dropIsOpen);
  };

  const openSettings = () => {
    setDropIsOpen(false);
    setIsSettingsOpen(true);
  };

  const openCreateTeam = () => {
    setDropIsOpen(false);
    setIsCreateTeamOpen(true);
  };
  
 
  const chnageCurrentTeam = (team:any) => {
    
    handelCurrentTeam(team);
};

  return (
    <>
      <button
        onClick={toggleDrop}
        className={`flex items-center gap-2 rounded-lg px-4 py-1.5 hover:bg-[#2A2B2B] transition-colors duration-300
        ${dropIsOpen && "bg-[#2A2B2B]"}`}
      >
        <FilePenLine className="w-5 h-5 text-[#E3E3E3] " />
        <div className="flex items-baseline justify-center gap-1">
          <h2 className="font-semibold text-lg">{currentTeam?.name}</h2>
          <FaCaretDown
            className={`w-3 h-3 text-[#E3E3E3] fill-slate-50 transition-transform duration-300 ${
              dropIsOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`absolute top-[13.3%] bg-[#171717] w-[90%] border-[1px] border-[#2A2B2B] rounded-lg text-[#ffffff] transition-all duration-300 ease-in-out overflow-hidden ${
          isVisible ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
        }`}
      >
        <div className="w-full h-full flex flex-col items-start justify-start">
          <div className="border-b border-[#2A2B2B] min-h-16 max-h-36 w-full p-2 overflow-y-auto flex items-center justify-center flex-col gap-1">
           
            {
              data.teams.map((team: any, index:number) => {
                return (
                  <div
                    key={index}
                    onClick={(e)=>{
                      e.preventDefault();
                      chnageCurrentTeam(team)
                      
                    }}
                    className={`w-full flex items-center justify-start gap-3  py-1 px-4 rounded-md  ${team?._id === currentTeam?._id ? 'hover:bg-[#2866DF] bg-[#2866DF]': 'hover:bg-[#2A2B2B]'}`}
                  >
                    <h4 className="text-sm font-bold">{team.name}</h4>
                  </div>
                );
              })}
          </div>

          <div className="border-b-[1.5px] border-[#2A2B2B] flex-shrink-0 p-2 w-full h-32 flex items-center justify-center flex-col gap-[0.30rem]">
            <button
              onClick={openCreateTeam}
              className="w-full flex items-center justify-start gap-3 hover:bg-[#2A2B2B] py-1 px-4 rounded-md"
            >
              <Users className="w-[0.90rem] h-[0.90rem]" />
              <h4 className="text-sm font-bold">Join or Create Team</h4>
            </button>

            <button
              onClick={openSettings}
              className="w-full flex items-center justify-start gap-3 hover:bg-[#2A2B2B] py-1 px-4 rounded-md"
            >
              <Settings className="w-[0.90rem] h-[0.90rem]" />
              <h4 className="text-sm font-bold">Setting</h4>
            </button>
            <div className="w-full flex items-center justify-start gap-3 hover:bg-[#2A2B2B] py-1 px-4 rounded-md">
              <LogOut className="w-[0.90rem] h-[0.90rem]" />
              <h4 className="text-sm font-bold">Logout</h4>
            </div>
          </div>

          <div className="flex-shrink-0 p-2 h-[4.9rem] w-full flex items-center justify-center gap-2 overflow-x-auto">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="">
              <h4 className="text-sm font-bold">Tanveer Singh</h4>
              <h5 className="text-[0.66rem] font-light">
                tanveerrajpurohit6811@gmail.com
              </h5>
            </div>
          </div>
        </div>
      </div>

      <SettingsComponent
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <JoinTeam
        isOpen={isCreateTeamOpen}
        onClose={() => setIsCreateTeamOpen(false)}
      />
    </>
  );
};

export default Dropdown_wrapper;
