export interface Note {
    _id:string;
    title:string;
    text:string;
    archived:boolean;
    tags:string[];
    createdAt:string;
    updatedAt:string;
}

export interface NoteFormInputs {
title:string;
text:string;
archived?:boolean;
tags:string;


}

export interface CreateNoteInput {
    title:string,
    text:string,
    archived?:boolean,
    tags:string[]
}
