import { useContext, useState } from "react"
import NotifContext from "./notifContext"

export default function Notification(){
    let { notifData } = useContext(NotifContext)
    let { status, code, msg, description } = notifData;
    return(
        <div className={`flex justify-start items-center gap-4 py-1 pl-3 w-90 absolute
        ${code !== 200 ? 'bg-red-50 border-red-200 border-l-red-400': 'bg-green-50 border-green-200 border-l-green-400'}
        z-200 h-18 border-l-5 border rounded-r-xl top-0 
        ${status !== 'active' ? 'translate-y-0' : 'translate-y-30'} transition-transform duration-700`}>
            {
                code === 200 ?
                <i className="fa fa-check text-white rounded-full text-2xl p-3 bg-green-400"></i>
                :
                <i className="fas fa-times text-white rounded-full text-2xl p-3 bg-red-400"></i>
            }
            <div>
                <p className="text-gray-800 font-serif te text-left text-[18px]">{msg}</p>
                <p className="font-normal text-sm">{description}</p>
            </div>
        </div>
    )
}