import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    DATABASE_CONNECTION:str(),
    PORT:port(),
    SESSION_SECRET:str(),
})