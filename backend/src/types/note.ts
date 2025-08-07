// export interface Note {
//     _id:string;
//     title?:string;
//     text?:string;
//     archived?:boolean;
//     tags?:[string];
//     createdAt:string;
//     updatedAt:string;
// }

export interface NoteInput {
    title?:string;
    text?:string;
    tags?:[string];
    archived?:boolean;
}

export interface NoteIdParams {
    noteId:string;
}