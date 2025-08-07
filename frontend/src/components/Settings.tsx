import { useState } from "react"
import { logout } from "../network/notes.api";
import FontToggle from "./settings/FontToggle";
import ThemeToggle from "./settings/ThemeToggle";
import { ChevronRight, Lock, LogOut, SunMedium, Type } from "lucide-react";
import ForgotPassword from "./settings/ChangePassword";
import ChangePassword from "./settings/ChangePassword";

interface SettingsProps {
    onLogoutSuccessfull:() => void;
}

type settingsView = 'all'|'color'|'font' | 'password'

export default function Settings({onLogoutSuccessfull}:SettingsProps){

    const [selectedSettings,setSelectedSettings] = useState<settingsView>('all');
    const currentSettings = selectedSettings;

     
    return(
        <div className=" h-full ">
            <div className="w-full h-full hidden lg:flex">
            <div className="h-full border-r-2 border-f-neutral-200 dark:border-f-neutral-800  pt-[20px] pl-[32px] pr-[16px]">
            <div className=" space-y-2 pb-2 ">
                <button  className={`flex items-center p-2 gap-2 lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-700 dark:text-f-neutral-200 cursor-pointer  ${selectedSettings === 'color' ? 'bg-f-neutral-100 dark:bg-f-neutral-800 text-f-neutral-950 dark:text-white' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('color')}>
                    <SunMedium  className={`h-[20px] w-[20px]   ${selectedSettings === 'color' ? 'text-f-blue-500' : 'text-f-neutral-700 dark:text-white'}`}/>Color Theme{selectedSettings === 'color' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
                <button className={`flex items-center p-2 gap-2 lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer  ${selectedSettings === 'font' ? 'bg-f-neutral-100 dark:bg-f-neutral-800' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('font')}> 
                    <Type className={`h-[20px] w-[20px] ${selectedSettings === 'font' ? 'text-f-blue-500' : ''}`}/>Font Theme{selectedSettings === 'font' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
                <button className={`flex items-center p-2 gap-2 lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer  ${selectedSettings === 'password' ? 'bg-f-neutral-100 dark:bg-f-neutral-800' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('password')}>
                    <Lock className={`h-[20px] w-[20px] ${selectedSettings === 'password' ? 'text-f-blue-500' : ''}`} />Change password{selectedSettings === 'password' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
            </div>
            <div className="space-y-2 border-t-2 border-f-neutral-200 dark:border-f-neutral-800  pt-2">
                <button className="flex items-center p-2 gap-2 lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800 group" onClick={onLogoutSuccessfull}><LogOut className="h-[20px] w-[20px] dark:text-white group-hover:text-f-blue-500" />Logout</button>
            </div>
            </div>
            <div className="w-3/4  p-8">
            {
                selectedSettings === 'color' && (
                    <ThemeToggle onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }
            {
                selectedSettings === 'font' && (
                    <FontToggle onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }
            {
                currentSettings === 'password' && (
                    <ChangePassword onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }
            </div>

        </div>
        {/* for mobile view */}
        <div className=" overflow-hidden ">
            {
                currentSettings === 'all' && (
                     <div className="h-full   ">
                        <h1 className="block lg:hidden text-preset-1 text-f-neutral-950 pb-4 pl-2">Settings</h1>
            <div className=" space-y-2 pb-2 ">
                <button  className={`flex items-center p-2 gap-2 w-full lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-700 dark:text-f-neutral-200 cursor-pointer  ${selectedSettings === 'color' ? 'bg-f-neutral-100 dark:bg-f-neutral-800 text-f-neutral-950 dark:text-white' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('color')}>
                    <SunMedium  className={`h-[20px] w-[20px]   ${selectedSettings === 'color' ? 'text-f-blue-500' : 'text-f-neutral-700 dark:text-white'}`}/>Color Theme{selectedSettings === 'color' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
                <button className={`flex items-center p-2 gap-2 w-full  lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer  ${selectedSettings === 'font' ? 'bg-f-neutral-100 dark:bg-f-neutral-800' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('font')}> 
                    <Type className={`h-[20px] w-[20px] ${selectedSettings === 'font' ? 'text-f-blue-500' : ''}`}/>Font Theme{selectedSettings === 'font' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
                <button className={`flex items-center p-2 gap-2 w-full  lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer  ${selectedSettings === 'password' ? 'bg-f-neutral-100 dark:bg-f-neutral-800' : ' hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800'}`} onClick={() => setSelectedSettings('password')}>
                    <Lock className={`h-[20px] w-[20px] ${selectedSettings === 'password' ? 'text-f-blue-500' : ''}`} />Change password{selectedSettings === 'password' ? <ChevronRight className="ml-auto h-[16px]" /> : ''}</button>
            </div>
            <div className="space-y-2 border-t-2 border-f-neutral-200 dark:border-f-neutral-800  pt-2">
                <button className="flex items-center p-2 gap-2 w-full  lg:w-[210px] rounded-[6px] text-preset-4 text-f-neutral-950 dark:text-white cursor-pointer hover:bg-f-neutral-100 hover:dark:bg-f-neutral-800 group" onClick={onLogoutSuccessfull}><LogOut className="h-[20px] w-[20px] dark:text-white group-hover:text-f-blue-500" />Logout</button>
            </div>
            </div>
                )
            }
            {
                currentSettings === 'color' && (
                    <ThemeToggle onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }
             {
                currentSettings === 'font' && (
                    <FontToggle onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }

            {
                currentSettings === 'password' && (
                    <ChangePassword onApplyChanges={() => setSelectedSettings('all')}/>
                )
            }

        </div>
        </div>
    )
}