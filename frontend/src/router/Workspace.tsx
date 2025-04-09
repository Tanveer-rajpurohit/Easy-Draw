import { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import FileContext from "../context/FileContext";
import { useParams } from "react-router-dom";
import useGetFileData from "../hook/useGetFileData";
import { FilePenLine } from "lucide-react";
import Editor from "../components/workspace/Editor";
import Canvas from "../components/workspace/Canvas";

const Workspace = () => {
  const [activeSection, setActiveSection] = useState<"document" | "both" | "canvas">("both");
  const { addEditorData, canvasData, addFile } = useContext(FileContext);
  
  const editorRef = useRef<EditorJS | null>(null);

  const { id } = useParams<{ id: string }>();
  const { loading, fileData } = useGetFileData({ id: id || "" });

  
  useEffect(() => {
    if (fileData) {
      addFile(fileData.file); 
    }
    if( fileData &&  fileData?.file?.editorData){
      addEditorData(fileData?.file?.editorData)
    }
  }, [fileData, addFile, addEditorData]);

  if (!id) return <div className="text-center">Invalid Workspace ID</div>;

  if (loading) return <div className="text-center">Loading...</div>;

  const saveDocument = async () => {
    let editData;
    if (editorRef.current) {
      editData = await editorRef.current.save();
      addEditorData(editData);
    }

    const response = await fetch('http://localhost:8000/file/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        fileId: id,
        canvasData: canvasData,
        editorData: editData,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      if (data.message === 'Not authorized, token failed') {
        alert('Session expired, please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      if(data.message === "jwt expired"){
        alert('Session expired, please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  return (
    <div className="w-full bg-[#171717] text-[#ffffff] h-screen font-Quicksand">
      <nav className="w-full h-[6.704%] border-b border-[#383939ee] flex items-center justify-between px-6">
        <div className="flex items-center justify-center gap-2">
          <FilePenLine className="w-4 h-4 text-[#E3E3E3]" />
          <h2 className="text-base">Easy-Draw</h2>
        </div>
        <div className="border border-[#4B4B4B] flex items-center justify-center rounded-md">
          <div
            onClick={() => setActiveSection("document")}
            className={`w-[5.5rem] py-0.5 text-center border-r border-[#4B4B4B] cursor-pointer ${
              activeSection === "document" ? "bg-[#2A2B2B]" : ""
            }`}
          >
            Document
          </div>

          <div
            onClick={() => setActiveSection("both")}
            className={`w-[5.5rem] py-0.5 text-center border-r border-[#4B4B4B] cursor-pointer ${
              activeSection === "both" ? "bg-[#2A2B2B]" : ""
            } lg:block hidden`}
          >
            Both
          </div>

          <div
            onClick={() => setActiveSection("canvas")}
            className={`w-[5.5rem] py-0.5 text-center cursor-pointer ${
              activeSection === "canvas" ? "bg-[#2A2B2B]" : ""
            }`}
          >
            Canvas
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={saveDocument}
            className="px-2 py-1.5 bg-[#94dbff] text-[#171717] font-semibold rounded-md hover:bg-[#7ac8f0] transition-colors duration-300 shadow-lg text-sm flex items-center justify-center gap-2"
          >
            Save Document
          </button>
        </div>
      </nav>

      <div className="w-full h-[93.296%] flex items-start justify-between">
        <div
          className={`${
            activeSection === "document" || activeSection === "both"
              ? "w-full"
              : "hidden"
          } border-r border-[#383939ee] h-full`}
        >
          <Editor editorRef={editorRef}  />
        </div>

        <div
          className={`${
            activeSection === "canvas" || activeSection === "both"
              ? "w-full"
              : "hidden"
          } border-r border-[#383939ee] h-full`}
        >
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
