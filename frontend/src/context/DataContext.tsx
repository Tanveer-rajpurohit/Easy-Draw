
import { createContext,useState,ReactNode } from "react";
interface DashboardData {
    _id: string;
    googleId: string; 
    name: string;
    email: string;
    profilePicture?: string;
    teams: string[];
}

const DataContext = createContext<null | DashboardData>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setdata] = useState<null | DashboardData >(null)

    const handelData = (data:DashboardData) =>{
        setdata(data)
    }

    const [currentTeam,setCurrentTeam] = useState();
    
    const handelCurrentTeam = (data)=>{
        setCurrentTeam(data)
    }

    return (
        <DataContext.Provider value={{ data , handelData,currentTeam,handelCurrentTeam }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;