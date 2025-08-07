interface PrimaryButtonProps{
    children:React.ReactNode;
    className?:string;
    onClick?:() => void;
    type?:'button' | 'submit' | 'reset';
    disabled?:boolean;
    
    
}


export default function SecondaryButton({children,className='',onClick, type='button',disabled=false}:PrimaryButtonProps){
    return(
        <button
        type={type}
className={`px-4 py-3 text-preset-4 text-f-neutral-600 rounded-[8px] bg-f-neutral-100 dark:bg-f-neutral-800 dark:text-f-neutral-400 hover:bg-f-white dark:hover:bg-f-neutral-600 hover:text-f-neutral-950 cursor-pointer disabled:bg-f-neutral-50 disabled:text-f-neutral-300  focus:outline-none focus:border-1 focus:border-f-neutral-950 focus:ring-2 focus:ring-f-neutral-400 focus:ring-offset-2 focus:ring-offset-white transition-all ${className}`}
onClick={onClick}
disabled={disabled}
        >{children}</button>
    )
};