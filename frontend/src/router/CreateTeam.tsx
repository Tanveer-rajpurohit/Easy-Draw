import { FilePenLine, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {

  const navigate = useNavigate()
  const [teamName, setTeamName] = useState("Tanveer's Team");
  const [teamDescription, setTeamDescription] = useState("Team Description");

  const handleCreateTeam = async() => {
      const token  = localStorage.getItem('authToken');

      try {
        const response = await fetch('http://localhost:8000/team/create',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: teamName,
            description: teamDescription,
          }),
        })

        const data = await response.json();

        if (!response.ok) {

          if(data.message === 'Not authorized, token failed'){
            alert('Session expired, please log in again.');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
          }

          if(data.message === 'Team already exists'){
            alert('Team already exists with the same name.');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        

        console.log("Team created:", data);
        navigate('/dashboard')

      } catch (error) {
        console.error("Error creating team:", error);
      }
  };

  return (
    <>
      <div className="w-full bg-[#171717] text-[#E3E3E3] h-screen font-Quicksand py-8 px-6">
        <nav className="w-full flex justify-between items-baseline px-5 py-1">
          <div className="flex items-center justify-center gap-2 ">
            <FilePenLine className="w-5 h-5 text-[#E3E3E3]" />
            <h2 className="text-lg ">Easy-Draw</h2>
          </div>
        </nav>

        <div className="w-full h-[85vh] flex flex-col items-center justify-center ">
          <div className="px-3 -space-y-0.5 py-1.5 border-t border-[#6FCF97] bg-[#304A36] flex items-center justify-center gap-2 rounded-xl">
            <Users className="w-4 h-4 fill-[#6FCF97] text-[#6FCF97]" />
            <h3 className="text-sm text-[#6FCF97]">Team Name</h3>
          </div>

          <h2 className="text-2xl">What should we call your team?</h2>
          <p className="text-sm">
            You can always change this later from settings.
          </p>

          <div className="mt-7">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTeam();
              }}
            >
              <div>
                <label htmlFor="name" className="text-base font-semibold">
                  Team Name
                </label>
                <br />
                <input
                  onChange={(e) => setTeamName(e.target.value)}
                  type="text"
                  name="name"
                  className="w-96 mt-1 px-3 py-2 rounded-md text-sm bg-[#242424] border border-[#666666] focus:outline-none text-white"
                  value={teamName}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="Description" className="text-base font-semibold">
                  Description
                </label>
                <br />
                <input
                  onChange={(e) => setTeamDescription(e.target.value)}
                  type="text"
                  name="Description"
                  className="w-96 mt-1 px-3 py-2 rounded-md text-sm bg-[#242424] border border-[#666666] focus:outline-none text-white"
                  value={teamDescription}
                />
              </div>

              <div className="mt-7 text-center">
                <button
                  type="submit"
                  className="w-[80%] px-4 py-3.5 bg-[#2866DF] rounded-md hover:bg-[#2355BE] transition-colors text-sm font-semibold"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTeam;
