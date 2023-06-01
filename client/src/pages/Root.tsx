import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import isAuthenticated from "../fetchers/isAuthenticated";
import { useEffect } from "react";

export interface UUser {
    _id: string;
    name: string;
    picture: string;
}

const Root = (() => {

    const logoutMutation = useMutation({ mutationKey: ["logout"] });
    const queryClient = useQueryClient();
    queryClient.setQueryDefaults(["authentication"], { queryFn: isAuthenticated, retry: 0 })
    const authenticationQuery = useQuery(["authentication"])
    const data = authenticationQuery.data as { user: UUser } | undefined

    useEffect(() => {
        const expiresTime = localStorage.getItem("exp");
        if (!authenticationQuery.data) {
            return;
        }
        if (!expiresTime) {
            logoutMutation.mutate();
            authenticationQuery.remove()
            return;
        }
        const getLeftTime = new Date(expiresTime).getTime() - new Date().getTime();
        if (getLeftTime < 0) {
            logoutMutation.mutate();
            authenticationQuery.remove();
            return;
        }

    }, [authenticationQuery])

    return (
        <div>
            <Navbar isSuccess={authenticationQuery.isSuccess} userInfo={data?.user} />
            <main>
                <Outlet />
            </main>
        </div>
    );
})

export default Root;

