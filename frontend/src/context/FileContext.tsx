import { createContext,ReactNode, useState } from "react";

interface file{
    _id:string;
    name:string;
    team:object;
    updatedAt: string;
    createdBy: object;
}

const FileContext = createContext<null | file>(null);

export const FileProvider = ({ children }: { children: ReactNode }) => {
    
    const [editorData, setEditorData] = useState({})

    const addEditorData = (data: object) => {
        setEditorData(data)
    }

    const [canvasData, setCanvasData] = useState([])
    
    const addCanvasData = (data: object) => {
        setCanvasData(data)
    }

    const [file, setFile] = useState({})
    
    const addFile = (data: object) => {
        setFile(data)
    }

    return (
        <FileContext.Provider value={{editorData,addEditorData,canvasData,addCanvasData,file,addFile}}>
            {children}
        </FileContext.Provider>
    );
};

export default FileContext;