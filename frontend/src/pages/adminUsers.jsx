import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import NotifContext from '../components/notifContext'

export default function AdminUsers(){
    let { setNotifData } = useContext(NotifContext)
    let [users, setUsers] = useState([])

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const res = await axios.get("http://localhost:5000/users")
                setUsers(res.data.users)
            } catch(err){
               console.log(err.response)
            //    setNotifData({status: "active", code: err.response.status, msg: err.response.data.message, description: err.response.data.description})
            }
        }
        getUsers();
    }, [])

    return(
        <div className='w-full translate-y-15 bg-gray-100 p-2 rounded-[10px]'>
            <div className='mb-5 border-b border-b-gray-300 pb-2'>
                <div className='w-full px-2'>
                    <div className='flex justify-between gap-8'>
                        <span>Username</span>
                        <span>E-mail</span>
                        <spna className='translate-x-24'>Permissions</spna>
                        <spna className='translate-x-15'>Status</spna>
                        <spna>Edit & Delete</spna>
                    </div>
                </div>
            </div>
            <div className='w-240 flex flex-col gap-0.5'>
                {
                    users.map((user, idx)=>(
                        <div className='flex justify-between items-center bg-gray-50 font-medium py-0.5' key={idx}>
                            <div className='flex items-center gap-2'>
                                <img src='data:image/jpeg;base64,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'
                                className='w-10 rounded-full'/>
                                <span className='w-25 text-[18px]'>{user.username}</span>
                            </div>
                            <span className='w-50'>{user.email}</span>
                            <span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 ${user.isAdmin ? 'bg-green-200' : 'bg-yellow-200'}`}>{user.isAdmin ? "Admin" : "General"}</span>
                            <span className='px-2 py-1 text-green-900 rounded-[5px] opacity-85 bg-green-500'>Active</span>
                            <div className='flex gap-3'>
                                <button className='shadow p-1 w-7 cursor-pointer rounded-full bg-red-500 text-white'><i className='fa fa-trash'></i></button>
                                <button className='shadow p-1 w-7 cursor-pointer rounded-full bg-violet-500 text-white'><i className='fa fa-pen'></i></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}