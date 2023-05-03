import { Link } from "react-router-dom";
import PrimaryBtn from "../UI/PrimaryBtn";


const Navbar = () => {

    const loginHandler = () => {
        console.log("login");
    }
    const signUpHandler = () => {
        console.log("sign up");
    }

    return (
        <nav className="flex items-center justify-between px-4 py-6 border-b-[1px]">
            <Link to={"/"} className="text-gray-800 text-lg font-bold ">Sharing Recipe</Link>
            <div className="flex gap-2">
                <PrimaryBtn onClick={loginHandler} style="white" >Log In</PrimaryBtn>
                <PrimaryBtn onClick={signUpHandler} style="orange" >Sign Up</PrimaryBtn>
            </div>
        </nav>
    )
}

export default Navbar