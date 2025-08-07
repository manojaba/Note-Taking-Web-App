import { RequestHandler } from "express";
import noteModel from "../models/note.model";
import { NoteIdParams, NoteInput } from "../types/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../utils/assertisDefined";


export const getNotes: RequestHandler = async (req,res,next) => {
    const authenticatedUserId = req.session.userId;
    try{
        assertIsDefined(authenticatedUserId);

        
       
        const response = await noteModel.find({userId:authenticatedUserId}).exec();
        res.status(200).json(response)
        // res.status(200).json([]);

    }catch(error){
       next(error)
    }
}


export const getNote : RequestHandler = async (req,res,next) => {
const noteId = req.params.noteId;
const authenticatedUserId = req.session.userId;

try{
    assertIsDefined(authenticatedUserId)
    if(!mongoose.isValidObjectId(noteId)){
    throw createHttpError(404,"invalid id value");
}
const requestedNote = await noteModel.findById(noteId).exec();
if(!requestedNote){
    throw createHttpError(404,"Note not found")
};

if(!requestedNote.userId.equals(authenticatedUserId)){
    throw createHttpError (401,'you cannot access this note');
}
res.status(200).json(requestedNote)
} catch(error){
    next(error)
}

}

export const getArchivedNotes: RequestHandler = async (req,res,next) => {
    const authenticatedUserId = req.session.userId;
    try{
         assertIsDefined(authenticatedUserId)
        const archivedNotes = await noteModel.find({userId:authenticatedUserId,archived:true}).exec();
        
        res.status(200).json(archivedNotes);

    }catch(error){
        next(error);
    }
}



export const createNotes: RequestHandler<unknown,unknown,NoteInput,unknown> = async (req,res,next) => {
    const title = req.body.title;
    const text = req.body.text;
    const tags = req.body.tags;
    const archived = req.body.archived;
    const authenticatedUserId = req.session.userId;
    console.log("UserId in session:", req.session.userId);

    try{
        assertIsDefined(authenticatedUserId)
        if(!title){
            throw createHttpError(400,'Note must have a title')
        }

        const newNote = await noteModel.create({
            userId:authenticatedUserId,
            title:title,
            text:text,
            tags:tags,
            archived:archived,
        })

        res.status(201).json(newNote);

    }catch(error){
        next(error)
    }
}

export const updateNote: RequestHandler<NoteIdParams,unknown,NoteInput,unknown> =  async (req,res,next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newTags = req.body.tags;
    const newArchived = req.body.archived;
        const authenticatedUserId = req.session.userId;


    try{
                assertIsDefined(authenticatedUserId);

        if(!newTitle ){
            throw createHttpError(404, "invalid input data")
        }
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(404,"invalid note id")
        }
        if(!newTitle){
            throw createHttpError(404,'Note must have a title')
        }
        const note =await noteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(404,'Note not found')
        }

        if(!note.userId.equals(authenticatedUserId)){
    throw createHttpError (401,'you cannot access this note');};

        note.title = newTitle;
        note.text = newText ?? '';
        note.tags = newTags ?? [];
        note.archived = newArchived ?? false;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote)

    }catch(error){
        next(error)
    }
    
}

export const deleteNote:RequestHandler<NoteIdParams,unknown,unknown,unknown> = async(req,res,next) => {
    const noteId = req.params.noteId;
            const authenticatedUserId = req.session.userId;

    try{
                        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,'not a valid id')
        }
        const note = await noteModel.findById(noteId).exec();
        if(!note){
            throw createHttpError(400,'Note doesnt exist')
        }
  if(!note.userId.equals(authenticatedUserId)){
    throw createHttpError (401,'you cannot access this note');};

        await note.deleteOne();
        res.sendStatus(204);

    }catch(error){
        next(error)
    }
}
