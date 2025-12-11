import axios from "axios"
import { use, useContext, useState } from "react"
import NotifContext from "./notifContext"

export default function AddUser({st}){
    let { setNotifData } = useContext(NotifContext)
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [password2, setPass2] = useState('')
    let [roleState, setRoleState] = useState('')

    const AddUser = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/signup", {username, email, password, password2, roleState})
            setNotifData({status: "active", code: res.status, msg: res.data.message, description: res.data.description})
        } catch(err){
            setNotifData({status: 'active', code: err.response.status, msg: err.response.data.message, description: err.response.data.description})  
            console.log(err.response.data)
        }
        setTimeout(()=>{
            setNotifData({status: "un-active", code: null, msg: null, description: null})
        }, 2000)
        setUsername(''); setEmail(''); setPassword(''); setPass2(''); setRoleState('')
    }
    return(
        <div className="add-user-ly z-1300 fixed top-0 translate-y-10 left-1/2 transform">
            <form className="z-1300 flex flex-col bg-indigo-100 px-4 py-1.5 text-center
            font-medium text-[17px] rounded-[10px] text-blue-950 items-center" onSubmit={(e) => AddUser(e)}>
                <div className="w-full flex justify-end"><i className="fa fa-times z-1301 cursor-pointer" onClick={() => st(false)}></i></div>
                <div className="flex flex-col gap-2 items-center">
                    <div>
                        <h3>Username</h3>
                        <input className="bg-white shadow rounded-sm px-2 py-1" value={username} onChange={(e => setUsername(e.target.value))}/>
                    </div>
                    <div>
                        <h3>E-mail</h3>
                        <input  className="bg-white shadow  rounded-sm px-2 py-1" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password</h3>
                        <input  className="bg-white shadow  rounded-sm px-2 py-1" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Conf Password</h3>
                        <input  className="bg-white shadow  rounded-sm px-2 py-1" value={password2} onChange={e => setPass2(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Permission</h3>
                        <label className='flex items-center shadow justify-center gap-4 text-blue-950 text-[17px] font-medium px-3 py-1 bg-white rounded-sm'>
                            <div className='flex gap-1.5 hover:text-green-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='admin'
                            onChange={(e) => setRoleState(e.target.value)}/>Admin </div>
                            <div className='flex gap-1.5 hover:text-yellow-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='general'
                            onChange={(e) => setRoleState(e.target.value)}/>General </div>
                        </label>
                    </div>
                    <button className="text-white mt-3 mb-1 cursor-pointer w-3/5 bg-blue-950 rounded-sm border transition hover:bg-white hover:text-blue-900
                    ">Add</button>
                </div>
            </form>
        </div>
    )
}