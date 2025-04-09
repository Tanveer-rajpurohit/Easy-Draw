import { BookOpen, FolderOpen, Layers } from "lucide-react";
import Dropdown_wrapper from "./Dropdown_wrapper";
import { IoGrid } from "react-icons/io5";
import CreateFile from "./CreateFile";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";

const Sidebar = () => {

  const {currentTeam,data} = useContext(DataContext)

  if(!currentTeam && !data) return null;



  const width:number = (currentTeam?.files.length / 5) * 100;
  
  
  
  const [showCreateFile, setShowCreateFile] = useState(false);

  const toggleCreateFile = () => {
    setShowCreateFile(!showCreateFile);
  };

  return (
    <>
      <div className="h-full w-[17.888%] flex-shrink-0 relative border-r border-[#2A2B2B] py-10 px-5 shadow-sm shadow-[#ffffff06] text-white">
        <div className="w-full  ">
          <Dropdown_wrapper  />
        </div>

        <div className="mt-8">
          <div className="px-4 flex rounded-lg border border-[#4B4B4B] bg-[#2A2B2B] items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <IoGrid className="w-3 h-3" />
              <h3 className="text-sm">All Files</h3>
            </div>
            <h4 className="text-sm text-gray-200">A</h4>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center flex-col">
          
          <div className=" w-full px-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase">TEAM FOLDERS</h2>
            <FolderOpen className="w-4 h-4 " />
          </div>

          <div className="mt-6 border border-[#3A3A3A] rounded-lg w-[98%] h-56 py-3 px-6">
            <h3 className="text-sm font-medium capitalize">
              Easy Draw Limited Free Trial
            </h3>
            <div className="mt-3 progress">
              <div className=" w-full bg-[#4b4b4be4] rounded-full">
                <div className={`progress-bar bg-[#94dbff]  h-2 rounded-lg`} 
                  style={{ width: `${width}%` }}></div>
              </div> 
              <p className="mt-2 text-xs font-semibold">{`${currentTeam?.files.length} of 5 files.`}</p>
            </div>

            <div className="mt-6">
              <p className="text-xs">
                Upgrade your plan for unlimited files & more features.
              </p>

              <div className="mt-4">
                <button className="w-full py-1 bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-3 flex flex-col justify-start items-start mt-8 gap-1">
            
            <div className="w-full rounded-md hover:bg-[#292929] px-3 py-1.5 flex items-center justify-between ">
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-3 h-3" />
                    <h4 className="text-xs font-bold">AI References</h4>
                  </div>
                  <h4 className="text-xs text-gray-200">A</h4>
            </div>

            <div className="w-full rounded-md hover:bg-[#292929] px-3 py-1.5 flex items-center justify-between ">
                  <div className="flex items-center justify-center gap-2">
                    <Layers className="w-3 h-3" />
                    <h4 className="text-xs font-bold">Team Templates</h4>
                  </div>
                  <h4 className="text-xs text-gray-200">T</h4>
            </div>

          </div>
        </div>

        <div className="mt-3">
                <button
                onClick={(e)=>{
                  e.preventDefault()
                  toggleCreateFile()
                }}
                className="w-full py-2 bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg">
                  Create File
                </button>
              </div>
      </div>

      <CreateFile
       isOpen={showCreateFile}
       onClose={() => setShowCreateFile(false)}
      />
    </>
  );
};
export default Sidebar;
