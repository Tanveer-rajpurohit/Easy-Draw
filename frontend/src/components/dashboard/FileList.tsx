import { useContext, useState } from 'react'
import { FileX2, MoreHorizontal } from 'lucide-react'
import DataContext from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'

const FileList = () => {
  const navigate = useNavigate()
  const [activeRow, setActiveRow] = useState(0)
  const { currentTeam } = useContext(DataContext)
  const [deleteOption, setDeleteOption] = useState<{ [key: string]: boolean }>({})

  if (!currentTeam) {
    return <div className="text-center text-gray-400">No files available</div>
  }

  const handleFileClick = (id: string) => {
    navigate(`/workspace/${id}`)
  }

  const handleDeleteClick = async(fileId: string) => {
    console.log(fileId)

    const response = await fetch('http://localhost:8000/file/delete',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ fileId }),
    })

    if(response.ok){
      const data = await response.json();
      console.log(data);
      window.location.reload(); 
      
    }else{
      const data = await response.json();
      console.log(data);
      
      if(data.message === 'Not authorized, token failed'){
        navigate('/login')
      }
      console.error('Error fetching dashboard data');
    }
  }

  return (
    <div className="w-full overflow-hidden"> {/* Add overflow-hidden to prevent any unwanted horizontal scroll */}
      <table className="w-full text-sm text-center">
        <thead className="text-xs uppercase text-gray-400 border-b border-[#2A2B2B]">
          <tr>
            <th scope="col" className="w-[200px] px-6 py-4 text-center">
              NAME
            </th>
            <th scope="col" className="w-[150px] px-6 py-4 text-center">
              EDITED
            </th>
            <th scope="col" className="w-[100px] px-6 py-4 text-left">
              AUTHOR
            </th>
            <th scope="col" className="w-[50px] px-6 py-4 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {currentTeam.files.map((file, index) => (
            <tr
              key={index}
              onMouseEnter={() => setActiveRow(index)}
              className={`border-b border-[#2A2B2B] transition-colors duration-200 ${
                activeRow === index ? 'bg-[#2A2B2B]' : 'bg-[#171717]'
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleFileClick(file._id)
              }}
            >
              <td className="w-[200px] px-6 py-4 font-medium whitespace-nowrap">
                {file.name}
              </td>
              <td className="w-[150px] px-6 py-4 text-gray-400 whitespace-nowrap">
                {file?.updatedAt}
              </td>
              <td className="w-[100px] px-6 py-4">
                <div className="flex items-center justify-start">
                  <div className="w-6 h-6 overflow-hidden rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-medium">
                    <img
                      src={file.createdBy.profilePicture}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </td>
              <td className="w-[50px] px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setDeleteOption((prev) => ({
                      ...prev,
                      [file._id]: !prev[file._id],
                    }))
                  }}
                  className={`transition-opacity duration-200 ${
                    activeRow === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
                {deleteOption[file._id] && (
                  <div className="absolute w-32 rounded-md border border-[#303030] bg-[#171717] px-4 shadow-md shadow-[#111] z-10">
                    <div className="flex items-center justify-start gap-3">
                      <FileX2 className="w-4 h-4 text-gray-400" />
                      <h4
                        className="text-sm cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClick(file._id)
                        }}
                      >
                        Delete
                      </h4>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileList
