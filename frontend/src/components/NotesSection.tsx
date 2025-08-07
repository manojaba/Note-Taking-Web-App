
import NoteForm from "./form/NoteForm";
import NoteThumbnail from "./noteThumbnail";
import type { Note } from "../types/note";
import PrimaryButton from "./buttons/PrimaryButton";

import { Plus, PlusIcon, Search } from "lucide-react";


type NoteView = "all" | "archived" |"settings"|"search"| string;

interface NotesSectionProps {
  headingTag:React.ReactNode;
    rawNotes:Note[];
    setRawNotes:(notes:Note[]) => void;
    setCurrentView:(view:string) => void;
    currentView:NoteView;
    setActiveTag:(tag:string) => void;
    selectedNote:Note | null;
    setSelectedNote:(note:Note | null) => void;
    showForm:boolean;
    setShowForm:(show:boolean) => void;
    setSearchInput:(value:string) => void;
   
    searchInput:string;

}

export default function NotesSection({
  headingTag,
rawNotes,
  setRawNotes,
  setCurrentView,
  currentView,
  setActiveTag,
  selectedNote,
  setSelectedNote,
  showForm,
  setShowForm,
  setSearchInput,
  searchInput,
}: NotesSectionProps) 
{
  

     function handleNoteClick(note: Note) {
    setSelectedNote(note);
    setShowForm(true);
    // setCurrentView("all");
    setActiveTag("");
  }

  function handleNoteSaved(savedNote: Note) {
    const existingNoteIndex = rawNotes.findIndex(
      (note) => note._id === savedNote._id
    );
    if (existingNoteIndex !== -1) {
      //update existing note
      const updatedNotes = [...rawNotes];
      updatedNotes[existingNoteIndex] = savedNote;
      setRawNotes(updatedNotes);
    } else {
      //add a new note
      setRawNotes([...rawNotes, savedNote]);
    }
    setSelectedNote(null);
    setShowForm(false);
    setCurrentView(currentView);
    setActiveTag("");
  }

  function handleCreateNewNoteClicked() {
    setSelectedNote(null);
    setShowForm(true);

    // setCurrentView("all");
    setActiveTag("");
    console.log('a new note')
  }

  function onNoteDeleted(deletedNote: Note) {
    const filteredNotes = rawNotes.filter(
      (note) => note._id !== deletedNote._id
    );
    setRawNotes(filteredNotes);
  }

  function goBackHandler(){
    setCurrentView(currentView)
  }
    return(
    
        <div className="flex  w-full h-full ">
              <div className={`relative  flex-col gap-4 lg:border-r-2 border-f-neutral-200 dark:border-f-neutral-800 lg:pl-[32px] lg:pr-[16px] lg:pt-[20px] lg:pb-[20px] w-full lg:w-[290px] flex-shrink-0  overflow-y-auto ${showForm ? 'hidden' :'flex'} lg:flex  `}>
               {currentView !== 'search' && <h1 className="lg:hidden text-preset-1 text-f-neutral-950">{headingTag}</h1> }
               {
                    currentView === 'search' && (
                      <>
                      <h1 className="text-preset-1 pl-2 dark:text-white">Search</h1>
                      <div className="flex gap-2 w-full pl-[18px] py-[13px] pr-[16px] border-1 bg-f-neutral-50 dark:bg-f-neutral-950 border-f-neutral-300 dark:border-f-neutral-600 rounded-[8px]">
                                <Search className="w-[20px] h-[20px] text-f-neutral-500 " />
                                <input type="text" placeholder="Search by title, content, or tags..." className="w-full text-preset-5 text-shadow-f-neutral-950 dark:text-white dark:placeholder:text-f-neutral-500 focus:outline-none" value={searchInput} onChange={(e) => {
                                  setSearchInput(e.target.value)
                                  console.log(e.target.value)
                                  setCurrentView('search')
                                  
                                }}></input>
                              </div>
                              {searchInput && <p className="text-preset-5 text-f-neutral-800 dark:text-white">All notes matching '{searchInput}' are displayed here</p>}
                      </>
                    )
                   }
               <div className="hidden lg:block">
                 <PrimaryButton
                  className="bg-blue-400 p-2 w-full rounded flex  gap-1 items-center justify-center "
                  onClick={handleCreateNewNoteClicked}
                >
                 <PlusIcon className="h-3 w-3"/> Create New Note

                </PrimaryButton>
               </div>

                {
                  currentView === 'archived' && (
                    <p className="max-w-fit text-preset-5 text-f-neutral-700 dark:text-f-neutral-200">All your archived notes are stored here. You can restore or delete them anytime.</p>
                  )
                }
                

                <div className=" divide-y-2 divide-f-neutral-200 dark:divide-f-neutral-800  overflow-y-auto no-scrollbar   h-full ">
                  {rawNotes.length > 0 ? (
                    rawNotes.map((note, index: number) => (
                      <NoteThumbnail
                        key={index}
                        note={note}
                        onClick={() => handleNoteClick(note)}
                        isSelected={selectedNote?._id === note._id}
                      ></NoteThumbnail>
                    ))
                  ) : (
                    <p className="p-2 border-f-neutral-200  dark:border-f-neutral-700 bg-f-neutral-100 dark:bg-f-neutral-800 rounded dark:text-white">
                      You don't have any notes yest.Start a new note to capture
                      your thoughts and ideas
                    </p>
                  )}
                </div>
                <div className="flex justify-end  lg:hidden">
                 <PrimaryButton
                  className="bg-blue-400 p-2 w-[64px] h-[64px] flex items-center justify-center rounded-full "
                  onClick={handleCreateNewNoteClicked}
                >
                  <Plus />

                </PrimaryButton>
               </div>
              </div>
              <div className={` lg:block w-full overflow-y-auto ${showForm ? 'block' : 'hidden'} `}>
               
                {showForm && (
                  <NoteForm
                    handleBack = {goBackHandler}
                    onNoteSaved={handleNoteSaved}
                    noteToEdit={selectedNote}
                    setShowForm={setShowForm}
                    setSelectedNote={setSelectedNote}
                    onNoteDeleted={onNoteDeleted}
                  ></NoteForm>
                )}
              </div>
              
             
            </div>
           

     
        
    )
}