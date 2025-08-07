import { useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { ChevronLeft } from "lucide-react";

const fonts = [
    {name:'Sans-serif',description:'Clean and modern,easy to read.',value:"var(--font-inter)",image:"/images/icon-font-sans-serif.svg"},
    {name:'Serif',description:'Classic and elegant for a timeless feel.',value:'var(--font-noto-serif)',image:"/images/icon-font-serif.svg"},
    {name:'Monospace',description:'Code-like,great for a technical vibe.',value:'var(--font-source-code-pro)',image:"/images/icon-font-monospace.svg"},
];

interface FontToggleProps{
    onApplyChanges:() => void;
}


export default function FontToggle({onApplyChanges}:FontToggleProps){
    const[selectedFont,setSelectedFont] = useState(fonts[0].value);

    useEffect(() => {
        document.documentElement.style.setProperty("--active-app-font",selectedFont);
    },[selectedFont])
    return(
        <div>
         <button className="flex items-center gap-2 lg:hidden text-preset-4 text-f-neutral-600 dark:text-white pb-3 cursor-pointer" onClick={() => onApplyChanges()}><ChevronLeft className=""/> Settings</button>

            <h1 className=" block lg:hidden text-preset-1  text-f-neutral-950 dark:text-white pb-1 lg:pb-0 ">Font Theme</h1>
                    <h1 className="hidden lg:block  text-preset-3 text-f-neutral-950 dark:text-white ">Font Theme</h1>
            <p className="text-preset-5 text-f-neutral-700 dark:text-f-neutral-300 pb-[24px] pt-1">Choose your font theme:</p>
            <div className="space-y-4 pb-[24px]">
                {
                // fonts.map((font) => (
                //     <button
                //       key={font.name}
                //         onClick={() => setSelectedFont(font.value)}
                //     >
                //       {font.name}
                //     </button>
                // ))

                fonts.map((font) => (
                    <div
                    key={font.name}
                    onClick={() => setSelectedFont(font.value)}

                     className={`flex justify-between p-4 border-1 border-f-neutral-200 rounded-[12px] lg:max-w-[528px] hover:bg-f-neutral-100 dark:hover:dark:bg-f-neutral-800 cursor-pointer  ${selectedFont === font.value ? 'bg-f-neutral-100 dark:bg-f-neutral-800 dark:border-f-neutral-700' : '  dark:border-f-neutral-800  '}`}>
                        <div className="flex gap-4 items-center">
                            <div className="p-2 bg-white dark:bg-f-neutral-950 max-w-[40px] max-h-[40px] rounded-[12px] border-1 border-f-neutral-200 dark:border-f-neutral-700"><img src={font.image} alt={font.name} className="filter dark:invert"></img></div>
                        <div>
                            <h3 className="text-preset-4 text-f-neutral-950 dark:text-white">{font.name}</h3>
                            <p className="text-preset-6 text-f-neutral-700 dark:text-f-neutral-300">{font.description}</p>
                        </div>
                        </div>
                        <input
                         type="radio"
                          value={font.value}
                          onChange={() => setSelectedFont(font.value)} 
                          checked={selectedFont === font.value}
                          
                          ></input>
                    </div>
                ))
            }
           
            </div>
             <div className="flex justify-end lg:max-w-[528px]">
                <PrimaryButton onClick={onApplyChanges} className=""    >Apply Changes</PrimaryButton>
            </div>
            

        </div>
    )
}