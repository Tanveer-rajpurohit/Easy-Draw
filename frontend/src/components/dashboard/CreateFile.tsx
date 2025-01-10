import { X } from "lucide-react";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateFile({ isOpen, onClose }: Props) {
  const [fileName, setFileName] = useState("Untitled File");
  const {currentTeam} = useContext(DataContext)
  if (!isOpen) return null;

  const handleCreateFile = async () => {
    const token  = localStorage.getItem('authToken');
      try {
        const response = await fetch('http://localhost:8000/file/create',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: fileName,
            team: currentTeam._id,
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
          console.log(data);
          
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("File created successfully:", data);
        onClose();
      window.location.reload(); 


      } catch (error) {
        console.error("Error creating file:", error);
      }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center w-full h-screen">
      <div className=" bg-[#171717] text-white rounded-lg shadow-xl overflow-hidden min-h-52 w-[29.9rem] border-2 border-[#302121] p-2">
        <div className="w-full flex items-center justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 b rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="pb-6 px-8">
          <h2 className="text-xl font-semibold">Create File</h2>

          <div className="mt-5">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateFile();
              }}
            >
              <div>
                <label htmlFor="name" className="text-base font-semibold">
                  File Name
                </label>
                <br />
                <input
                  onChange={(e) => setFileName(e.target.value)}
                  type="text"
                  name="name"
                  className="w-96 mt-1 px-3 py-2 rounded-md text-sm bg-[#242424] border border-[#666666] focus:outline-none text-white"
                  value={fileName}
                />
              </div>

              <div className="mt-7 text-center">
                <button
                  type="submit"
                  className="w-[80%] px-4 py-3.5 bg-[#2866DF] rounded-md hover:bg-[#2355BE] transition-colors text-sm font-semibold"
                >
                  Create File
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
