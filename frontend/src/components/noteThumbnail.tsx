import type { Note } from "../types/note";

interface NoteProp {
    note:Note;
    onClick:(note:Note) => void;
    isSelected:boolean
}

export default function NoteThumbnail({note,onClick,isSelected}:NoteProp){
    return(
        <div
           className={`cursor-pointer  my-1 p-2 hover:rounded-[6px] hover:border-b-f-neutral-100 dark:hover:border-b-f-neutral-800   ${isSelected ? 'bg-f-neutral-100 dark:bg-f-neutral-800 border-b-f-neutral-100 dark:border-b-f-neutral-800  rounded-[6px] ' : 'bg-white dark:bg-f-neutral-950 hover:bg-f-neutral-100 dark:hover:bg-f-neutral-800'}`}
           onClick={() => onClick(note)}>
            <h1 className="text-preset-3 text-f-neutral-950 dark:text-white pb-[12px] break-words whitespace-normal  ">{note.title.split(' ').map((each) => each[0].toUpperCase() + each.slice(1)).join(' ')}</h1>
            { 
            
                
                    (note.tags.length > 0) ? 

                   <div className="pb-[12px]">{ 
                    note.tags.map((each,index:number) => {
                        return(
                            <div key={index} className="bg-f-neutral-200 dark:bg-f-neutral-600 rounded w-fit px-[6px] py-[2px] ">
                            <p className="text-preset-6 text-f-neutral-950 dark:text-white">{each[0].toUpperCase() + each.slice(1)}</p>
                        </div>
                        )
                    } )}
                </div>
                 : 
                    null
                
            }
            <p className="text-preset-6 pb-2 text-f-neutral-700 dark:text-f-neutral-300">{new Date(note.createdAt).toLocaleDateString('en-GB',{
                day:'2-digit',
                month:'short',
                year:'numeric',
            })}</p>
        </div>
    )
}