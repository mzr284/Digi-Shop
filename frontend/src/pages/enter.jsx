import { useEffect, useState } from "react"
import Signin from "../components/signin";
import Signup from "../components/signup";
import Notification from "../components/notification";
import "../styles/enterResponsive.css"

export default function Enter(){
    let [status, setStatus] = useState("signin");
    let [colStatus, setColStatus] = useState(false)
    useEffect(()=>{
        const y = 0 - window.pageYOffset;
        window.scrollTo({
           top: y,
        })
    }, [])
    return(
        <div className="w-full flex flex-col items-center justify-center h-170 bg-pink-50">

            <div className="mx-5 w-180 flex justify-center mt-15">
                    { 
                        status === "signin" ?
                        <div className="signup-container text-blue-950 flex flex-col gap-10 items-center justify-center shadow translate-x-full w-90
                        bg-pink-500 rounded-r-2xl h-118 transition-transform duration-500 z-100">
                            <h2 className="font-bold text-4xl">Create Acount</h2>
                            <p className="font-bold text-[19px]">Sign up if you din't have any account</p>
                            <button className="font-medium border to-blue-950 py-1 px-6 rounded-2xl
                            cursor-pointer shadow-2xl hover:bg-blue-950 hover:border-blue-950 hover:text-pink-300 transition" onClick={()=>setStatus("signup")}>SIGN UP</button>
                        </div>
                        :
                        <div className="signin-container text-blue-950 flex flex-col gap-10 items-center justify-center shadow w-90 bg-pink-500
                         rounded-l-2xl h-118 transition-transform duration-500 z-100">
                            <h2 className="font-bold text-4xl">Welcome Back!</h2>
                            <p className="font-bold text-[19px] text-center px-3">To keep connected with us plaese login with your info</p>
                            <button className="font-medium border to-blue-950 py-1 px-6 rounded-2xl
                            cursor-pointer shadow-2xl hover:bg-blue-950 hover:border-blue-950 hover:text-pink-300 transition"  onClick={()=>setStatus("signin")}>SIGN IN</button>
                        </div>
                    }
                    {                        
                        status === "signin" ?
                        <div className="signin-form overflow-hidden -translate-x-full w-90 h-118 transition-transform duration-500">
                            <button onClick={()=>setColStatus(!colStatus)} className="bt-change-form hidden absolute cursor-pointer top-3 right-5 z-1000">
                                <i className="fa fa-exchange hover:text-pink-500 transition-all"></i></button>
                            <Signin colStatus={colStatus}/>
                            <Signup colStatus={colStatus}/>
                        </div>
                        :
                        <div className="signup-form overflow-hidden w-90 h-118  transition-transform duration-500">
                            <button onClick={()=>setColStatus(!colStatus)} className="bt-change-form hidden absolute cursor-pointer top-3 right-5 z-1000">
                                <i className="fa fa-exchange hover:text-pink-500 transition-all"></i></button>
                            <Signup colStatus={colStatus}/>
                            <Signin colStatus={colStatus}/>
                        </div>
                    }        
            </div>
        </div>
    )
}