import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TeamsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinTeam({ isOpen, onClose }: TeamsProps) {
  const [inviteCode, setInviteCode] = useState<string>('')
  const navigate = useNavigate();

  if (!isOpen) return null;

  const addToTeam = async () =>{
   try{
    inviteCode.trim();
    const response = await fetch('http://localhost:8000/team/join',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        inviteLink: inviteCode,
      }),
    })

    if (response.ok) {
      const data = await response.json();
      console.log('success join', data);
      
    } else {
      const data = await response.json();
      console.log(data);
      
      if(data.message === 'Not authorized, token failed'){
        navigate('/login')
      }
      console.error('Error fetching dashboard data');
    }
   } catch{
    console.error('Failed to add to team');
   }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center w-full h-screen">
      <div className=" bg-[#171717] text-white rounded-lg shadow-xl overflow-hidden h-52 w-[29.9rem] border-2 border-[#302121] py-6 px-10">
        <h2 className="text-xl font-semibold">Join Team</h2>

        <div className="w-full flex  mt-6 gap-4 mb-6">
          <input
            type="email"
            placeholder="Invite Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="flex-1 px-4 py-2 bg-transparent rounded-md border border-[#4B4B4B] focus:outline-none focus:border-[#2866DF]"
          />
        </div>

        <div className="mt-5 w-full text-end flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 border border-[#302121] hover:bg-[#2A2B2B] rounded-md transition-colors"
          >
            Close
          </button>
          <button
            onClick={(e)=>{
              e.preventDefault();
              addToTeam();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2  bg-[#1F3E7B] rounded-md transition-colors"
          >
            Join Team
          </button>
          <button
            onClick={(e)=>{
              e.preventDefault();
              navigate("/team/create")
            }}
            className="flex items-center gap-2 px-4 py-2  bg-[#1F3E7B] rounded-md transition-colors"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
