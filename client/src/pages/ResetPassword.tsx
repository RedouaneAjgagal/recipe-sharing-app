import { useQuery } from '@tanstack/react-query';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
    const authQury = useQuery(["authentication"]);

    const navigate = useNavigate();
    useEffect(() => {
        if (authQury.isSuccess) {
            navigate("/", { replace: true });
        }
    }, [authQury.isSuccess]);

    return (
        authQury.isError ?
            <ResetPasswordForm for='reset-password' />
            :
            null
    )
}

export default ResetPassword;