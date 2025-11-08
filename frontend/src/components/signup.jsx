import axios from "axios"
import { useContext, useState } from "react"
import NotifContext from "./context"

export default function Signup(){
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [password2, setPassword2] = useState("")
    let { notifData, setNotifData } = useContext(NotifContext);
    const Signup = async ()=>{
        setUsername(""); setEmail(""); setPassword(""); setPassword2("");
        try{
            const res = await axios.post("http://localhost:5000/signup", {username: username, email: email, password: password, password2: password2})
            setNotifData({status: 'active', code: res.status, msg: res.data.message})
        } catch(err){
            setNotifData({status: 'active', code: err.response.status, msg: err.response.data.message})
        }
        setTimeout(()=>{
            setNotifData({status: 'un-active', code: null, msg: null})
        }, 2000)
    }
    return(
        <div className="h-full w-full flex flex-col items-center justify-center bg-white text-center px-3 py-5 gap-5 rounded-r-2xl">
            <h1 className="font-semibold text-3xl text-gray-800">Sign up</h1>
            <ul className="flex gap-2">
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-google"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-linkedin"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-github"></i></li>
            </ul>
            <p className="text-sm text-[16px]">Or use your info for sign up</p>
            <form className="flex flex-col gap-3 w-full px-2">
                <input className="bg-gray-200 p-2 rounded-[10px]" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="confrim password"/>
            </form>
            <button onClick={Signup} className="text-white border-2 bg-pink-600 rounded-[10px] py-2 px-10 shadow
            cursor-pointer font-semibold hover:border-pink-600 hover:text-pink-600 hover:bg-white transition">Sign up</button>
        </div>
    )
}