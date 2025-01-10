
import { useContext, useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import DataContext from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'

const FileList = () => {
  const navigate = useNavigate()
  const [activeRow, setActiveRow] = useState(0) // Default active state for first row
  const { currentTeam } = useContext(DataContext);

  if (!currentTeam) {
    return <div className="text-center text-gray-400">No files available</div>
  }

  if(!currentTeam) return null;
  const handelFileClick = (id:string)=>{
    navigate(`/workspace/${id}`)
  }

  return (
    <div className="w-full">
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
            <th scope="col" className="w-[50px] px-6 py-4 text-center">
              
            </th>
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
              onClick={(e)=>{
                e.preventDefault()
                handelFileClick(file._id);
              }}
            >
              <td className="w-[200px] px-6 py-4 font-medium  whitespace-nowrap">
                {file.name}
              </td>
            
              <td className="w-[150px] px-6 py-4 text-gray-400 whitespace-nowrap">
                {file?.updatedAt}
              </td>
           
              <td className="w-[100px] px-6 py-4">
                <div className="flex items-center justify-start">
                  <div className="w-6 h-6 overflow-hidden rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-medium">
                    <img src={file.createdBy.profilePicture} alt=""
                    className='w-full h-full object-cover' />
                  </div>
                </div>
              </td>
              <td className="w-[50px] px-6 py-4">
                <button className={`transition-opacity duration-200 ${
                  activeRow === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileList

