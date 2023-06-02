import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useQueryClient } from "@tanstack/react-query";
import isAuthenticated from "../fetchers/isAuthenticated";

export interface UUser {
    _id: string;
    name: string;
    picture: string;
}

const Root = (() => {

    const queryClient = useQueryClient();
    queryClient.setQueryDefaults(["authentication"], { queryFn: isAuthenticated, retry: 0 });

    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
})

export default Root;

