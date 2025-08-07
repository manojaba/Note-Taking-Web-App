import express from 'express';
import { createNotes, deleteNote, getArchivedNotes, getNote, getNotes, updateNote } from '../controllers/note.controllers';

const router = express.Router();

router.get('/',getNotes);
router.get('/archived',getArchivedNotes);
router.get('/:noteId',getNote);

router.post('/',createNotes);

router.patch('/:noteId',updateNote);
router.delete('/:noteId',deleteNote);


export default router;