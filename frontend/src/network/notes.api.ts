import type {  Note, CreateNoteInput } from "../types/note";
import type { User } from "../types/user";

async function fetchData (input:RequestInfo, init?:RequestInit){
    const response = await fetch(input,init);
    if(response.ok){
        return response
    }else {
        const errorBody = await response.json();
        const errorMessage = errorBody.theErrorIs;
        throw Error(errorMessage)
    }
}


export async function getCors():Promise<string>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/test-cors',{
        method:'GET',
        credentials:'include'
    })

    return response.json();
}


export async function getLoggedINUser():Promise<User>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/user',{
        method:'GET',
        credentials:'include'
    })
    return response.json();
}

export interface SignupCredentials {
    email:string;
    password:string;
}

export async function signup(credentials:SignupCredentials):Promise<User>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/user/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials),
        // credentials:'include',
    })

    return response.json();
}

export interface LoginCredentials {
    email:string;
    password:string;
}

export async function login(credentials:LoginCredentials):Promise<User>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/user/login',{
        method:'POST',
          headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials),
        credentials:'include',

    })
    return response.json()
}

interface ChangePasswordBody{
    oldPassword?:string;
    newPassword?:string;
}

export async function changePassword(passwords:ChangePasswordBody):Promise<User>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/user/change',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(passwords),
        credentials:'include'
    })
    return response.json();
}

export async function logout(){
    await fetchData('https://note-taking-web-app-29w9.onrender.com/api/user/logout',{
        method:'POST',
        credentials:'include',
    })
}

export async function fetchNotes(): Promise<Note[]>  {
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/notes',{
        method:'GET',
        headers:{
            "Accept":"application/json",
        },
        credentials:'include',
    })

    return response.json();
}

export async function fetchArchived():Promise<Note[]> {
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/notes/archived',{
        method:'GET',
        headers:{
            "Accept":"application/json",
        },
        credentials:'include',
    })

    return response.json();
}

export async function createNote(input:CreateNoteInput):Promise<Note>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/notes',{
        method:'POST',
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify(input),
        credentials:'include',
    });

    return response.json()
}

export async function updateNote(noteId:string, input:CreateNoteInput):Promise<Note>{
    const response = await fetchData('https://note-taking-web-app-29w9.onrender.com/api/notes/'+noteId,{
        method:'PATCH',
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify(input),
        credentials:'include',
    });

    return response.json();
}

export async function deleteNote(noteId:string){
    await fetchData('https://note-taking-web-app-29w9.onrender.com/api/notes/'+noteId,{
        method:'DELETE',
        credentials:'include',
        
    })
}