import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, required:true},
    title:{type:String,required:true},
    text:{
        type:String,
        default:'',
    },
    tags:{
        type:[String],
        default:[],
        lowercase:true,
    },
    archived:{
        type:Boolean,
        default:false,
    }

},{
    timestamps:true,
});

type Note = InferSchemaType<typeof noteSchema>

export default model<Note>('Note',noteSchema);