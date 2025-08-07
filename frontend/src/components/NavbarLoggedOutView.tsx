

interface NavbarLoggetOutViewProps{
    onSignUpClicked :() => void;
    onLoginClicked:() => void;
}

function NavbarLoggedOutView({onSignUpClicked,onLoginClicked}:NavbarLoggetOutViewProps) {
  return (
    <>
    <button onClick={onSignUpClicked}>Signup</button>
    <button onClick={onLoginClicked}>Login</button>
    </>
  )
}

export default NavbarLoggedOutView