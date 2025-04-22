import { useNavigate } from "react-router-dom";
import FileSection from "../components/dashboard/FileSection";
import Sidebar from "../components/dashboard/Sidebar";
import useGetDashboardData from "../hook/useGetDashbordData";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handelData, handelCurrentTeam, currentTeam } =
    useContext(DataContext);
  const { loading, userData } = useGetDashboardData();

  if (!userData) return;

  handelData(userData);

  if (userData.teams.length < 1) {
    navigate("/team/create");
  }
  if ((userData && userData.teams.length > 1) || !currentTeam) {
    const current = currentTeam ? currentTeam : userData.teams[0];
    handelCurrentTeam(current);
  }

  return (
    <div className="w-full bg-[#171717] text-[#ffffff] h-screen font-Quicksand ">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-full h-full flex items-center justify-between">
          <Sidebar />
          <FileSection />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
