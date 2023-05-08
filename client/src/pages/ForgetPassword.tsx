import ResetPassword from '../components/auth/ResetPassword'
import { ActionFunction } from 'react-router-dom'

const ForgetPassword = () => {
    return (
        <ResetPassword />
    )
}

export default ForgetPassword


export const action: ActionFunction = ({ request }) => {
    return null
}