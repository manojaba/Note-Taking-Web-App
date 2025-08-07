import { logout } from "../network/notes.api";
import type { User } from "../types/user"

interface NavbarLoggedInViewProps {
    user:User,
    onLogoutSuccessfull:() => void
}

export default function NavbarLoggedInView({user,onLogoutSuccessfull}:NavbarLoggedInViewProps){

    async function navLogout(){
        try{
            await logout();
            onLogoutSuccessfull();

        }catch(error){
            alert(error);
            console.error(error)
        }
    }

    return(
        <>
        <p>Signed in as: {user.email}</p>
        <button onClick={navLogout}>Logout</button>
        </>


    )
}