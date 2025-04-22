import {  FileText, LibraryBig, Search, Send } from "lucide-react";
import { BsDiagram2, BsPlusLg } from "react-icons/bs";
import FileList from "./FileList";

const FileSection = () => {
  return (
    <div className="h-full w-[82.112%] flex-shrink-0 relative border-r border-[#2A2B2B] py-10 text-white overflow-auto">
      <div className="nav px-20 flex items-center justify-between">
        <div className="flex items-center justify-center gap-1">
          {/* <div className="bg-[#242424] border border-[#3A3A3A] px-2.5 py-0.5 rounded-md">
            <h3 className="font-bold text-sm">All</h3>
          </div>
          <div className="px-2.5 py-0.5 rounded-md text-[#787878] hover:text-[#ffffff]">
            <h3 className="font-bold text-sm">Recents</h3>
          </div>
          <div className="px-2.5 py-0.5 rounded-md text-[#787878] hover:text-[#ffffff]">
            <h3 className="font-bold text-sm">Created by Me</h3>
          </div> */}
          <div className="px-2.5 py-0.5 rounded-md text-[#787878] border border-[#3A3A3A]  hover:text-[#ffffff]">
            <h3 className="font-bold text-sm">All Files</h3>
        </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          {/* <div className="serach flex-shrink-0 border border-[#666666] rounded-md w-56 py-1 flex items-center justify-between px-3">
            <Search className="w-4 h-4 text-[#E8E8E8]" />
            <input
              type="text"
              placeholder="Serach"
              className="bg-transparent text-sm focus:outline-none"
            />
            <p className="text-sm">/</p>
          </div> */}

          {/* <button className="w-full px-3 py-[0.28rem] bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg text-sm flex items-center justify-center gap-2">
            <Send className="w-[0.85rem] h-[0.85rem]" />
            Invite
          </button> */}
        </div>
      </div>



      <div className="mt-16 px-16 flex items-center justify-center gap-[20px]">
        <div className="border border-[#4B4B4B] bg-[#242424] w-[16.875rem] h-[9.375rem] rounded-md flex items-center justify-center flex-col gap-5 text-[#c0c0c0] hover:bg-[#2A2B2B] hover:text-white hover:border-[#A5A5A5]">
            <BsPlusLg className="w-16 h-16" />
            <h5 className="text-sm">Create a Black File</h5>
        </div>
        
        <div className="border border-[#4B4B4B] bg-[#242424] w-[16.875rem] h-[9.375rem] rounded-md flex items-center justify-center flex-col gap-5 text-[#c0c0c0] hover:bg-[#2A2B2B] hover:text-white hover:border-[#A5A5A5]">
            <FileText className="w-16 h-16" />
            <h5 className="text-sm">Generate an AI outline</h5>
        </div>

        <div className="border border-[#4B4B4B] bg-[#242424] w-[16.875rem] h-[9.375rem] rounded-md flex items-center justify-center flex-col gap-5 text-[#c0c0c0] hover:bg-[#2A2B2B] hover:text-white hover:border-[#A5A5A5]">
            <LibraryBig className="w-16 h-16" />
            <h5 className="text-sm">Browse Diagram Catalog</h5>
        </div>

        <div className="border border-[#4B4B4B] bg-[#242424] w-[16.875rem] h-[9.375rem] rounded-md flex items-center justify-center flex-col gap-5 text-[#c0c0c0] hover:bg-[#2A2B2B] hover:text-white hover:border-[#A5A5A5]">
            <BsDiagram2 className="w-16 h-16" />
            <h5 className="text-sm">(Example) User Data Model</h5>
        </div>

      </div>

      <div className="mt-12 w-full">
        <FileList />
      </div>
    </div>
  );
};
export default FileSection;
