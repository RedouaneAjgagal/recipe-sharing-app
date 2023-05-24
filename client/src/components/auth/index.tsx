import Form from './Form'
import { Link } from 'react-router-dom'

interface Props {
    for: "login" | "register"
}

const Auth = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="flex flex-col min-h-[75vh] justify-center items-center p-4">
            <Form for={props.for} />
            {props.for === "login" ?
                <p className="mt-4 text-black">You dont have an account yet? <Link to={"/register"} className="text-amber-700 font-medium">Join now</Link></p>
                :
                <p className="mt-4 text-black">You already have an account? <Link to={"/login"} className="text-amber-700 font-medium">Login now</Link></p>
            }
        </div>
    )
}

export default Auth