import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardData {
    _id: string;
    googleId: string; 
    name: string;
    email: string;
    profilePicture?: string;
    teams: string[];
}

const useGetDashboardData = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:8000/user/dashboard/', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data: DashboardData = await response.json();
            setUserData(data);
          } else {
            const data = await response.json();
            console.log(data);
            
            if(data.message === 'Not authorized, token failed'){
              navigate('/login')
            }
            console.error('Error fetching dashboard data');
          }
        } catch (error) {
          console.error('Failed to fetch data', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No token found');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate,token]);

  return { loading, userData };
};

export default useGetDashboardData;
