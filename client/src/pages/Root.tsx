import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Root = () => {
    return (
        <div className="bg-gray-100/60">
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default Root