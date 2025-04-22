/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {  useContext, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-expect-error
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";

// @ts-expect-error
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";

// @ts-expect-error
import LinkTool from "@editorjs/link";
import FileContext from "../../context/FileContext";

interface EditorProps {
  editorRef: React.RefObject<EditorJS | null>;
  
}


const Editor: React.FC<EditorProps> = ({ editorRef }) => {

  const {file} = useContext(FileContext)

  useEffect(() => {
    if(file.editorData ){
      initEditor();

    }
  }, [file.editorData]);

  const initEditor = ()=>{
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
        },
        warning: {
          class: Warning,
          config: {
            titlePlaceholder: "Warning Title",
            messagePlaceholder: "Warning Message",
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              twitter: true,
            },
          },
        },
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Author",
          },
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "/api/link", // Replace with your endpoint if required
          },
        },
      },
      placeholder: "Start typing...",
      data: file.editorData ,
    });

    editorRef.current = editor;

  }

  return (
    <div className="w-full h-full   text-white flex flex-col items-start justify-start">
      <div id="editorjs" className=" p-4  px-10 h-[90%] overflow-y-auto w-full"></div>
    </div>
  );
};

export default Editor;
