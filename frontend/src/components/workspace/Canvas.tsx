import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useContext, useEffect, useState } from "react";
import FileContext from "../../context/FileContext";

const Canvas = () => {
  const [initData, setInitData] = useState<any>([]);
  const { addCanvasData, file } = useContext(FileContext);
  
  useEffect(() => {
    if (file?.canvasData) {
      addCanvasData(file.canvasData); 
      setInitData(file.canvasData)
    }
  }, [file]); 

   
  

  return (
    <>
      <div className="w-full h-full text-white">
        <Excalidraw
          theme="dark"
          onChange={(elements) => {
            addCanvasData(elements);
          }}
          initialData={{
            elements: initData
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.SaveAsImage />
          </MainMenu>

          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.HelpHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      </div>
    </>
  );
};
export default Canvas;
