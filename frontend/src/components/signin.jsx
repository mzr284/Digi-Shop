import axios from "axios";
import { useContext, useState } from "react"
import NotifContext from "./notifContext";
import "../styles/enterResponsive.css"

export default function Signin({colStatus}){
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let { setNotifData } = useContext(NotifContext);

    const SignIn = async ()=>{
        setEmail(""); setPassword("")
        try {
            const res = await axios.post("http://localhost:5000/signin", {email: email, password: password})
            setNotifData({status: "active", code: res.status, msg: res.data.message, description: res.data.description})
            localStorage.setItem("user", JSON.stringify(res.data.user))
        } catch(err){
            setNotifData({status: "active", code: err.response.status, msg: err.response.data.message, description: err.response.data.description})
        }
        setTimeout(()=>{
            setNotifData({status: "un-active", code: null, msg: null, description: null})
        }, 2000)
    }
    
    return(
        <div className={`signin bg-white flex flex-col items-center px-3 py-5 gap-8 w-full rounded-l-2xl shadow text-center transition-transform duration-700
         ${colStatus ? '-translate-y-118' : 'translate-y-0'}`}>
            <h1 className="font-semibold text-3xl text-gray-800">Sign in</h1>
            <ul className="flex gap-2">
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-google"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-linkedin"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-github"></i></li>
            </ul>
            <p className="text-sm text-[16px]">Or signin using E-mail address</p>
            <form className="flex flex-col gap-3 w-full px-2">
                <input className="bg-gray-200 p-2 rounded-[10px]" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="E-mail"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="password"/>
            </form>
            <p className="-translate-y-3 cursor-pointer border-b pb-1 border-b-blue-950">Forget your password?</p>
            <button onClick={SignIn} className="-translate-y-5 text-white border-2 bg-pink-600 rounded-[10px] py-2 px-10 shadow
            cursor-pointer font-semibold hover:border-pink-600 hover:text-pink-600 hover:bg-white transition">Sign in</button>
        </div>
    )
}