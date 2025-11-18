import { Link, useNavigate } from "react-router-dom";
import "../styles/headerResponsive.css"
import UserContext from "./userContext";
import { useContext } from "react";
import NotifContext from "./notifContext";
import Notification from "./notification";

export default function Header(){
    const user = JSON.parse(localStorage.getItem("user"))
    const { setNotifData } = useContext(NotifContext);
    const navigate = useNavigate();

    const Logout = async ()=>{
        localStorage.removeItem("user")
        setNotifData({ status: "active", code: 200, msg: "Logout Successfully! See you later" })
        navigate('/')
        setTimeout(()=>{
            setNotifData({ status: "un-active", code:null, msg: null });
        }, 2000)
    }
    return(
        <div>
        <div className="header z-1010 fixed w-full bg-gray-200 flex justify-between py-2 px-8 items-center shadow">
            <div>
                <Link to='/'><img className="w-20 rounded-2xl" src="data:image/png;base64,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"/></Link>
            </div>
            <div>
                <i className="cursor-pointer text-white fa fa-search bg-black py-[7px] rounded-l-2xl px-2"></i>
                <input  className="bg-white py-1 px-2 w-60 text-[15px] rounded-r-2xl" placeholder="search your product"/>
            </div>
            {
                user != null && user.isAdmin ?
                <Link to='/admin'><button className="item-container shadow cursor-pointer bg-black border-1  text-white py-0.5 px-4 rounded-2xl
                    hover:bg-transparent hover:border-black hover:text-black transition-all">Admin Page</button></Link>
                :
                ''
            }
            {
                user != null ?
                <div className="item-container flex gap-3 items-center">
                    <Link to='/cart'><i className="fa fa-cart-shopping text-xl cursor-pointer hover:bg-black hover:text-gray-200 transition-all hover:shadow p-2 rounded-full"></i></Link>
                    <button className="shadow cursor-pointer bg-black border-1  text-white py-0.5 px-4 rounded-2xl
                    hover:bg-transparent hover:border-black hover:text-black transition-all"
                    onClick={Logout}>Logout your account</button>
                </div>
                :
                <div className="item-container">
                    <Link to='/enter'><button className="shadow cursor-pointer bg-black border-1  text-white py-0.5 px-4 rounded-2xl
                    hover:bg-transparent hover:border-black hover:text-black transition-all">Enter your account</button></Link>
                </div>
            }
            <div className="icon-bars hidden">
            <button className="fa fa-bars text-xl border-transparent p-2 rounded-full transition hover:bg-gray-800 hover:text-gray-200 
            cursor-pointer hove:shadow-2xl">
            </button>
            </div>
        </div>
        <div className="absolute z-1001 left-150"><Notification/></div>
        </div>
    )
}