import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Header from "../Components/layouts/Header"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogged } from "../redux/slices/authSlice"
import { verifyTokenApi } from "../api/authService"


const Layout = () => {





    return (
        <div className="layout">
            <Header />
            <Outlet />
        </div>
    )
}


export default Layout