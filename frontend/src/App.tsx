import { FilePenLine } from "lucide-react";
import HeroSection from "./components/home/HeroSection";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate()
  const handelnavigate = ()=>{
    const token = localStorage.getItem('authToken');
    if(token){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  }
  return (
    <>
      <div className="w-full bg-[#060606] text-[#E3E3E3] min-h-screen font-Quicksand py-8 px-6">
        <nav className="w-full flex justify-between items-baseline px-5 py-1">
          <div className="flex items-center justify-center gap-2 ">
            <FilePenLine className="w-5 h-5 text-[#E3E3E3]" />
            <h2 className="text-lg ">Easy-Draw</h2>
          </div>
          <div
          onClick={(e)=> {
            e.preventDefault()
            handelnavigate()
          }}
          className="">
            <button className="px-6 py-3 bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg">
              Try Easy-Draw
            </button>
          </div>
        </nav>
        <HeroSection />
      </div>
    </>
  );
};
export default App;
