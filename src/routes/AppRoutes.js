import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ManageLibraryStaff from "../components/manageUser/manageLibraryStaff/manageLibraryStaff";
import { Routes, Route } from "react-router-dom"
import NotFound from "./NotFound";
import ManageReader from "../components/manageUser/manageReader/manageReader";
import ManageBook from "../components/ManageBooks/manageBook";
import ManageRequest from "../components/ManageRequest/manageRequest";

const AppRoutes = () => {
    return (<>
        <Routes>

            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manageUser/libraryStaff" element={<ManageLibraryStaff />} />
            <Route path="/manageUser/reader" element={<ManageReader />} />
            <Route path="/manageBook" element={<ManageBook />} />
            <Route path="/manageRequest" element={<ManageRequest />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    </>);
}

export default AppRoutes;