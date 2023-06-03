import { useQuery } from '@tanstack/react-query';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const ForgetPassword = () => {
    const authQury = useQuery(["authentication"]);

    const navigate = useNavigate();
    useEffect(() => {
        if (authQury.isSuccess) {
            navigate("/");
        }
    }, [authQury.isSuccess]);

    return (
        authQury.isError ?
            <ResetPasswordForm for='forget-password' />
            :
            null
    )
}

export default ForgetPassword