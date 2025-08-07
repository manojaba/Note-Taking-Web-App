import type { User } from "../types/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";

interface NavbarProps{
    headingTag:string;
    loggedInUser: User | null;
    onSignupClicked:() => void;
    onLoginClicked:() => void;
    onLogoutSuccessfull:() => void;
    setSearchInput:() => void;
}

export default function Navbar({headingTag,loggedInUser,onSignupClicked,onLoginClicked,onLogoutSuccessfull,setSearchInput}: NavbarProps){
    return(
        <div className="flex p-4 justify-between">
            <h1>{headingTag}</h1>
            <input type="text" placeholder="Search by title,content,or tags..." className="border-1  p-2"></input>
            {
                loggedInUser ? <NavbarLoggedInView user={loggedInUser} onLogoutSuccessfull={onLogoutSuccessfull}></NavbarLoggedInView> : <NavbarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignupClicked}></NavbarLoggedOutView>
            }

        </div>
    )
}