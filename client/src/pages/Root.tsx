import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import isAuthenticated from "../fetchers/isAuthenticated";
import logout from "../fetchers/logout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export interface UUser {
    _id: string;
    name: string;
    picture: string;
}

const Root = (() => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("exp");
            queryClient.invalidateQueries(["authentication"]);
        }
    });

    const authenticationQuery = useQuery({
        queryKey: ["authentication"],
        queryFn: isAuthenticated,
        retry: 0
    })

    useEffect(() => {
        const expiresTime = localStorage.getItem("exp");
        if (!authenticationQuery.data) {
            return;
        }
        if (!expiresTime) {
            logoutMutation.mutate();
            return;
        }
        const getLeftTime = new Date(expiresTime).getTime() - new Date().getTime();
        if (getLeftTime < 0) {
            logoutMutation.mutate();
        }

    }, [location])

    return (
        <div>
            <Navbar isSuccess={authenticationQuery.isSuccess} userInfo={authenticationQuery.data?.user} />
            <main>
                <Outlet />
            </main>
        </div>
    );
})

export default Root;

