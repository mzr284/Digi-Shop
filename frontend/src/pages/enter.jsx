import { useState } from "react"
import Signin from "../components/signin";
import Signup from "../components/signup";

export default function Enter(){
    let [status, setStatus] = useState("signin");
    return(
        <div className="w-full flex items-center justify-center h-170 bg-pink-50">
            <div className="mx-5 w-180 flex justify-between mt-10">
                    { 
                        status === "signin" ?
                        <div className="text-blue-950 flex flex-col gap-10 items-center justify-center shadow translate-x-full w-90 bg-pink-500 rounded-r-2xl">
                            <h2 className="font-bold text-4xl">Create Acount</h2>
                            <p className="font-bold text-[19px]">Sign up if you din't have any account</p>
                            <button className="font-medium border to-blue-950 py-1 px-6 rounded-2xl
                            cursor-pointer shadow-2xl hover:bg-blue-950 hover:border-blue-950 hover:text-pink-300 transition">Sign Up</button>
                        </div>
                        :
                        2
                    }
                    {
                        status === "signin" ?
                        <div className="-translate-x-full w-90">
                            <Signin/>
                        </div>
                        :
                        <div>
                            <Signup/>
                        </div>
                        
                    }
                
            </div>
        </div>
    )
}