import { useNavigate } from "react-router-dom";

const HeroSection = () => {

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
    <div className="w-full min-h-screen relative  overflow-hidden">
      <div className="w-full h-full flex items-center justify-center py-20 px-4">
        <div className="text-center relative z-20 max-w-4xl mx-auto">
          <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <h2 className="text-[#94dbff] drop-shadow-[0_2px_4px_rgba(148,219,255,0.4)]">
              Make technical
            </h2>
            <h2 className="text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
              design & documentation easy
            </h2>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl text-[#BEC0C3] font-medium mt-7 drop-shadow-[0_1px_2px_rgba(190,192,195,0.4)]">
            Deliver accurate, consistent designs faster
          </p>
          <div
           onClick={(e)=> {
            e.preventDefault()
            handelnavigate()
          }}
           className="mt-12">
            <button className="px-6 py-3 bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-[5%] z-10 opacity-50 hover:opacity-40 transition-opacity duration-300">
        <img
          src="https://cdn.prod.website-files.com/62d58a323cbc396f06a780aa/651593780abfac438bc37155_Shapes.svg"
          alt="Decorative shape 1"
          width={200}
          height={200}
          className="w-full h-auto max-w-[200px]"
        />
      </div>
      <div className="absolute top-1/4 left-[10%] z-10 opacity-50 hover:opacity-40 transition-opacity duration-300">
        <img
          src="https://cdn.prod.website-files.com/62d58a323cbc396f06a780aa/6528593a2397720159ddaeee_Shapes%20(8).svg"
          alt="Decorative shape 2"
          width={150}
          height={150}
          className="w-full h-auto max-w-[150px]"
        />
      </div>
      <div className="absolute top-1/3 right-[5%] z-10 opacity-50 hover:opacity-40 transition-opacity duration-300">
        <img
          src="https://cdn.prod.website-files.com/62d58a323cbc396f06a780aa/651593780abfac438bc37153_Shapes%20(2).svg"
          alt="Decorative shape 3"
          width={180}
          height={180}
          className="w-full h-auto max-w-[180px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;

