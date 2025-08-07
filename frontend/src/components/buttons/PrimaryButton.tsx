interface PrimaryButtonProps{
    children:React.ReactNode;
    className?:string;
    onClick?:() => void;
    type?:'button' | 'submit' | 'reset';
    disabled?:boolean;
    
    
}


export default function PrimaryButton({children,className='',onClick, type='button',disabled=false}:PrimaryButtonProps){
    return(
        <button
        type={type}
className={`px-4 py-3 text-preset-4 text-white rounded-[8px] bg-f-blue-500 hover:bg-f-blue-700 cursor-pointer disabled:bg-f-neutral-100 disabled:text-f-neutral-300  focus:outline-none focus:ring-2 focus:ring-f-neutral-400 focus:ring-offset-2 focus:ring-offset-white transition-all ${className}`}
onClick={onClick}
disabled={disabled}
        >{children}</button>
    )
};