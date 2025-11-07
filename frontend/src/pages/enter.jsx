import { useState } from "react"
import Signin from "../components/signin";
import Signup from "../components/signup";

export default function Enter(){
    let [status, setStatus] = useState("signup");
    return(
        <div className="w-full flex items-center justify-center h-170 bg-pink-50">
            <div className="mx-5 w-180 flex justify-between mt-10">
                    { 
                        status === "signin" ?
                        <div className="text-blue-950 flex flex-col gap-10 items-center justify-center shadow translate-x-full w-90
                        bg-pink-500 rounded-r-2xl h-118 transition-transform duration-500 z-100">
                            <h2 className="font-bold text-4xl">Create Acount</h2>
                            <p className="font-bold text-[19px]">Sign up if you din't have any account</p>
                            <button className="font-medium border to-blue-950 py-1 px-6 rounded-2xl
                            cursor-pointer shadow-2xl hover:bg-blue-950 hover:border-blue-950 hover:text-pink-300 transition" onClick={()=>setStatus("signup")}>SIGN UP</button>
                        </div>
                        :
                        <div className="text-blue-950 flex flex-col gap-10 items-center justify-center shadow w-90 bg-pink-500
                         rounded-l-2xl h-118 transition-transform duration-500 z-100">
                            <h2 className="font-bold text-4xl">Welcome Back!</h2>
                            <p className="font-bold text-[19px] text-center px-3">To keep connected with us plaese login with your info</p>
                            <button className="font-medium border to-blue-950 py-1 px-6 rounded-2xl
                            cursor-pointer shadow-2xl hover:bg-blue-950 hover:border-blue-950 hover:text-pink-300 transition"  onClick={()=>setStatus("signin")}>SIGN IN</button>
                        </div>
                    }
                    {
                        status === "signin" ?
                        <div className="-translate-x-full w-90  transition-transform duration-500">
                            <Signin/>
                        </div>
                        :
                        <div className="w-90 h-118  transition-transform duration-500">
                            <Signup/>
                        </div>
                        
                    }
                
            </div>
        </div>
    )
}