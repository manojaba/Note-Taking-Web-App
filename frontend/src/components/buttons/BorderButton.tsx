interface PrimaryButtonProps{
    children:React.ReactNode;
    className?:string;
    onClick?:() => void;
    type?:'button' | 'submit' | 'reset';
    disabled?:boolean;
    
    
}


export default function BorderButton({children,className='',onClick, type='button',disabled=false}:PrimaryButtonProps){
    return(
        <button
        type={type}
className={`px-4 py-3 text-preset-4 text-f-neutral-950 dark:text-white rounded-[8px] bg-f-white dark:bg-f-neutral-950 border-1 border-f-neutral-300 dark:border-f-neutral-600 hover:bg-f-neutral-100 dark:hover:bg-f-neutral-800 hover:text-f-neutral-600  cursor-pointer disabled:bg-f-neutral-50 disabled:text-f-neutral-300  focus:outline-none focus:border-1 focus:border-f-neutral-950 focus:ring-2 focus:ring-f-neutral-400 focus:ring-offset-2 focus:ring-offset-white transition-all ${className}`}
onClick={onClick}
disabled={disabled}
        >{children}</button>
    )
};