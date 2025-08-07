import { useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { ChevronLeft } from "lucide-react";

const colorThemes = [
    {name:'Light Mode',description:'Pick a clean and classic light theme',value:"light",image:"/images/icon-sun.svg"},
    {name:'Dark Mode',description:'Select a sleek and modern dark theme',value:'dark',image:"/images/icon-moon.svg"},
    {name:'System',description:"Adapts to your device's theme",value:'system',image:"/images/icon-system-theme.svg"},
];

interface ThemeToggleProps {
    onApplyChanges:() => void;
}

export default function ThemeToggle({onApplyChanges}:ThemeToggleProps){

  const [themeSetting, setThemeSetting] = useState<string>(() => {
  return localStorage.getItem('theme') || 'system';
});

    useEffect(() => {
  const root = document.documentElement;
  const resolvedTheme =
    themeSetting === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : themeSetting;

  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  localStorage.setItem('theme', themeSetting);
}, [themeSetting]);

    return(
        <div>
          <button className="flex items-center gap-2 lg:hidden text-preset-4 text-f-neutral-600 dark:text-white pb-3 cursor-pointer" onClick={() => onApplyChanges()}><ChevronLeft className=""/> Settings</button>
          <h1 className=" block lg:hidden text-preset-1  text-f-neutral-950 dark:text-white pb-1 lg:pb-0 ">Color Theme</h1>
                    <h1 className="hidden lg:block  text-preset-3 text-f-neutral-950 dark:text-white ">Color Theme</h1>
                    <p className="text-preset-5 text-f-neutral-700 dark:text-f-neutral-300 pb-[24px] pt-1">Choose your font theme:</p>
                    <div className="space-y-4 pb-[24px]">
                        {
                      
        
                        colorThemes.map((colorTheme) => (
                            <div
                            key={colorTheme.name}
                            onClick={() => setThemeSetting(colorTheme.value)}
                             className={`flex justify-between p-4 border-1 border-f-neutral-200 rounded-[12px] lg:max-w-[528px] hover:bg-f-neutral-100 dark:hover:dark:bg-f-neutral-800 cursor-pointer ${themeSetting === colorTheme.value ? 'bg-f-neutral-100 dark:bg-f-neutral-800 dark:border-f-neutral-700' : '  dark:border-f-neutral-800  '}`}>
                                <div className="flex gap-4 items-center">
                                    <div className="p-2 bg-white dark:bg-f-neutral-950  max-w-[40px] max-h-[40px] rounded-[12px] border-1 border-f-neutral-200 dark:border-f-neutral-700 "><img src={colorTheme.image} alt={colorTheme.name} className="filter dark:invert"></img></div>
                                <div>
                                    <h3 className="text-preset-4 text-f-neutral-950 dark:text-white">{colorTheme.name}</h3>
                                    <p className="text-preset-6 text-f-neutral-700 dark:text-f-neutral-300">{colorTheme.description}</p>
                                </div>
                                </div>
                               <input
  type="radio"
  value={colorTheme.value}
  onChange={() => setThemeSetting(colorTheme.value)}
  checked={themeSetting === colorTheme.value}
/>
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