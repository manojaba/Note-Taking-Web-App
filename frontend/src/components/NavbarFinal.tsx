import { Search, Settings } from "lucide-react";
import type React from "react";


type NoteView = "all" | "archived" |"settings"|"search"| string;

interface NavbarFinalProps{
    headingTag:React.ReactNode;
    onClicked:() => void;
    setSearchInput:(value:string) => void;
    setCurrentView:(value:NoteView) => void;
    searchInput:string

    
}

function NavbarFinal({headingTag,onClicked,setSearchInput,setCurrentView,searchInput}:NavbarFinalProps) {
  return (
    <div className="flex justify-between items-center py-[18.5px] px-[32px] border-b-2 border-f-neutral-200 dark:border-f-neutral-800 ">
      <h1 className=" text-preset-1 text-f-neutral-950 dark:text-white">{headingTag}</h1>
        
        <div className="flex gap-[28px] items-center">
          <div className="flex gap-2 w-[300px] pl-[18px] py-[13px] pr-[16px] border-1 border-f-neutral-300 dark:border-f-neutral-600 rounded-[8px]">
          <Search className="w-[20px] h-[20px] text-f-neutral-500 " />
          <input type="text" placeholder="Search by title, content, or tags..." className="w-full text-preset-5 text-f-neutral-500 dark:text-white dark:placeholder:text-f-neutral-500 focus:outline-none" value={searchInput} onChange={(e) => {
            setSearchInput(e.target.value)
            console.log(e.target.value)
            setCurrentView('search')
            
          }}></input>
        </div>
        <Settings onClick={onClicked} className="w-[20px] h-[20px] text-f-neutral-500 dark:text-f-neutral-400 cursor-pointer hover:text-f-blue-500"/>
        </div>
    </div>
  )
}

export default NavbarFinal