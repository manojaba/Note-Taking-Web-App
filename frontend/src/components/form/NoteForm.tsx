import { useForm } from "react-hook-form"
import type { NoteFormInputs, Note,  } from "../../types/note"
import { createNote, deleteNote, updateNote } from "../../network/notes.api"
import { useEffect } from "react";
import { ArchiveRestore, ChevronLeft, Clock, RotateCcw, Tag, Trash, Trash2 } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import BorderButton from "../buttons/BorderButton";

interface FormInputType {
    handleBack:() => void
    onNoteSaved:(note:Note) => void;
    noteToEdit:Note  | null  ;
    setShowForm:(value:boolean) => void;
    setSelectedNote:(value:null) => void;
    onNoteDeleted:(note:Note) => void;

}
    

export default function NoteForm({handleBack,onNoteSaved,noteToEdit,setShowForm,setSelectedNote,onNoteDeleted}:FormInputType){




    const{register,handleSubmit,reset,setValue,watch,formState:{errors,isSubmitting}} = useForm<NoteFormInputs>();
    const currentArchivedState = watch('archived');

    useEffect(() => {
       if(noteToEdit){
        reset({
            title:noteToEdit.title,
            text:noteToEdit.text,
            tags:noteToEdit.tags ? noteToEdit.tags.join(', ') : '',
            archived:noteToEdit.archived,

        })
       } else {
        reset({
            title:'',
            text:'',
            tags:'',
            archived:false,
        });
       }
    },[noteToEdit,reset])

    async function onSubmit(input:NoteFormInputs){
      
       try{
        const tagsArray = input.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        const noteData ={
            title:input.title,
            text:input.text,
            tags:tagsArray,
            archived:input.archived
        }
        let savedNote:Note
        if(noteToEdit){
            savedNote = await updateNote(noteToEdit._id,noteData);
            console.log('updated:',savedNote)
        }else {
            savedNote = await createNote(noteData)
        }
        onNoteSaved(savedNote);
        

       }catch(error){
        console.error('Failed to save note:',error)
       }

    }


   async function handleDelete(noteToEdit:Note){
        await deleteNote(noteToEdit._id);
    onNoteDeleted(noteToEdit)
        setShowForm(false);
    }

    function handleCancelClick(){
        setSelectedNote(null);
        setShowForm(false) 
    }

    return(
        <div className="flex  w-full h-full lg:h-full  ">
            <form className="space-y-4 flex  flex-col lg:h-full  flex-1 lg:border-r-2 border-f-neutral-200 dark:border-f-neutral-800 lg:px-[24px] lg:py-[20px]" onSubmit={(handleSubmit(onSubmit))} >
                <div className="flex lg:hidden justify-between  border-b-2 border-f-neutral-200 pb-4">
                   {noteToEdit ?  <button className="flex items-center cursor-pointer group"  onClick={() => handleBack()}><ChevronLeft className="text-f-neutral-600 hover:text-f-blue-500 " /> <p className="text-f-neutral-600 text-preset-5 hover:text-f-blue-500 ">Go Back</p></button> :  <button className="flex items-center" type="button" onClick={handleCancelClick}><ChevronLeft className="text-f-neutral-600" /> <p className="text-f-neutral-600 text-preset-5">Go Back</p></button>}
                    <div className="flex items-center gap-[16px] ">
                        {
                            noteToEdit && 
                            <div className="flex gap-[16px] text-f-neutral-600 ">
                                {currentArchivedState ? <RotateCcw className="h-[18px] w-[18px] cursor-pointer hover:text-f-blue-500" />: <ArchiveRestore className="h-[18px] w-[18px] cursor-pointer hover:text-f-blue-500" />}
                                {noteToEdit && <Trash2 className="h-[18px] w-[18px] cursor-pointer hover:text-f-blue-500"/> }
                            </div>
                        }
                        <button type="button"  className='text-preset-5 text-f-neutral-600 cursor-pointer hover:text-f-blue-500'  onClick={handleCancelClick}>Cancel</button>
                        <button type="submit" className='text-preset-5 text-f-blue-500 cursor-pointer'> Save Note</button>
                    </div>
                </div>
               <div className="border-b-2  border-f-neutral-200 dark:border-f-neutral-800">
                 <input type="text" placeholder="Enter a title..." className="w-full focus:outline-none text-preset-1 dark:text-white placeholder:font-bold text-[24px] leading-1.2 tracking-[-0.5px] placeholder:text-f-neutral-950 dark:placeholder:text-white pb-[16px]"  {...register('title',{required:"Required"})}></input>
                 {
                    errors.title && <p className="text-red-400  text-sm">{errors.title.message}</p>
                 }
                <div className="flex gap-[8px] dark:text-f-neutral-300">
                    <p className="flex items-center text-preset-5 gap-[6px] min-w-[115px] "><Tag className="w-[12px] h-[12px] "/>Tags</p>
                    <input type="text" placeholder="Add tags seperated by commas (e.g. Work, Planning)" className="w-full focus:outline-2 focus:outline-f-neutral-500 focus:rounded-[4px] dark:text-f-neutral-300 dark:placeholder:text-f-neutral-300 " {...register('tags')}></input>
                </div>
                <div className="flex gap-[6px] pt-2 pb-4 dark:text-f-neutral-300">
                    <p className="flex items-center text-preset-5 gap-[6px] min-w-[115px] "><Clock className="w-[12px] h-[12px]"/>Last edited</p>
                    <p className="text-gray-400" >
                        {noteToEdit ? new Date(noteToEdit.createdAt).toLocaleDateString('en-GB',{
                day:'2-digit',
                month:'short',
                year:'numeric',
            }) : 'Not yet saved'}</p>
                </div>
               </div>
               
                <textarea  rows={16} placeholder="Start typing your note here..."  className="w-full  focus:outline-none flex-1 overflow-y-auto border-b-0  lg:border-b-2 lg:border-f-neutral-200 dark:border-f-neutral-800 no-scrollbar resize-none dark:text-f-neutral-100 " {...register('text')}></textarea>
               
               {/* <div>
                <input type='checkbox' id="archived" {...register('archived')}></input>
                <label htmlFor="archived">Archived</label>
               </div> */}
               <div className="hidden lg:flex gap-4">
                <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Note"}</PrimaryButton>
                <SecondaryButton type="button" onClick={handleCancelClick}>Cancel</SecondaryButton>
                

               </div>
            </form>

           
              <div className=" hidden  lg:block lg:w-[290px] ">{
                noteToEdit &&
               <div className="flex flex-col py-[20px] pl-[16px] pr-[32px] gap-3">
              
          {currentArchivedState ? (<BorderButton className="flex items-center gap-2" onClick={() => {setValue('archived',false,{shouldDirty:true})}}><RotateCcw className="w-[18px] h-[18px]"/>Restore Note</BorderButton>) : (<BorderButton className="flex items-center gap-2" onClick={() => {setValue('archived',true,{shouldDirty:false})}}><ArchiveRestore className="w-[18px] h-[18px]" />Archive Note</BorderButton>)}
          {noteToEdit && <BorderButton className="flex items-center gap-2" onClick={() => handleDelete(noteToEdit)}><Trash className="w-[18px] h-[18px]" />Delete Note</BorderButton>}
               </div>
              }
          
        </div>
        
           
        </div>
    )
}