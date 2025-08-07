import {  ArchiveRestore,  House, Search, SettingsIcon, Tag } from "lucide-react"


type NoteView = "all" | "archived" |"settings"|"search"| string;
interface MenubarProps{
    currentView:string;
    setCurrentView:(value:NoteView)=>void;
}

function Menubar({currentView,setCurrentView}:MenubarProps) {
  return (
    <div className=' lg:hidden  flex bg-white dark:bg-f-neutral-950 dark:bg- justify-between py-3 px-8  w-full border-t-2 border-f-neutral-200 dark:border-f-neutral-800 drop-shadow-lg '>
       
         <div className={`flex flex-col items-center gap-2 hover:bg-f-neutral-50 dark:hover:bg-f-neutral-700 px-7 py-1  rounded-[4px] cursor-pointer ${currentView === 'all' ? 'bg-f-blue-50 dark:bg-f-neutral-700': ''}`} onClick={() => setCurrentView('all')}>
            <House className={`w-[20px] h-[20px]  ${currentView === 'all' ? 'text-f-blue-500 ': 'text-f-neutral-600'} `} />
            <p className={`text-preset-6  ${currentView === 'all' ? 'text-f-blue-500': 'text-f-neutral-600'}`}>Home</p>
       
       </div>
        <div className={`flex flex-col items-center gap-2 hover:bg-f-neutral-50 dark:hover:bg-f-neutral-700  px-7 py-1 rounded-[4px] cursor-pointer ${currentView === 'search' ? 'bg-f-blue-50 dark:bg-f-neutral-700': ''}`} onClick={() => setCurrentView('search')}>
            <Search className={`w-[20px] h-[20px]  ${currentView === 'search' ? 'text-f-blue-500 ': 'text-f-neutral-600'} `}/> 
            <p className={`text-preset-6  ${currentView === 'search' ? 'text-f-blue-500': 'text-f-neutral-600'}`}>Search</p>
        </div>
        <div className={`flex flex-col items-center gap-2 hover:bg-f-neutral-50 dark:hover:bg-f-neutral-700  px-7 py-1 rounded-[4px] cursor-pointer ${currentView === 'archived' ? 'bg-f-blue-50 dark:bg-f-neutral-700': ''}`} onClick={() => setCurrentView('archived')}>
            <ArchiveRestore className={`w-[20px] h-[20px]  ${currentView === 'archived' ? 'text-f-blue-500 ': 'text-f-neutral-600'} `}/>
            <p className={`text-preset-6  ${currentView === 'archived' ? 'text-f-blue-500': 'text-f-neutral-600'}`}>Archived</p>
        </div>
        <div className={`flex flex-col items-center gap-2 hover:bg-f-neutral-50 dark:hover:bg-f-neutral-700  px-7 py-1 rounded-[4px] cursor-pointer ${currentView === 'tags' ? 'bg-f-blue-50 dark:bg-f-neutral-700': ''}`} onClick={() => setCurrentView('tags')}>
            <Tag className={`w-[20px] h-[20px]  ${currentView === 'tags' ? 'text-f-blue-500 ': 'text-f-neutral-600'} `} />
            <p className={`text-preset-6  ${currentView === 'tags' ? 'text-f-blue-500': 'text-f-neutral-600'}`}>Tags</p>
        </div>
        <div className={`flex flex-col items-center gap-2 hover:bg-f-neutral-50 dark:hover:bg-f-neutral-700  px-7 py-1 rounded-[4px] cursor-pointer ${currentView === 'settings' ? 'bg-f-blue-50 dark:bg-f-neutral-700': ''}`} onClick={() => setCurrentView('settings')}>
            <SettingsIcon className={`w-[20px] h-[20px]  ${currentView === 'settings' ? 'text-f-blue-500 ': 'text-f-neutral-600'} `} />
            <p className={`text-preset-6  ${currentView === 'settings' ? 'text-f-blue-500': 'text-f-neutral-600'}`}>Settings</p>
        </div>

    </div>


  )
}

export default Menubar