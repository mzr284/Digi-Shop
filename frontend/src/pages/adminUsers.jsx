import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import NotifContext from '../components/notifContext'
import Notification from '../components/notification'
import AddUser from '../components/addUser'
import "../styles/homeAdminResponsive.css"

export default function AdminUsers(){
    let { setNotifData } = useContext(NotifContext)
    let [users, setUsers] = useState([])
    let [editingId, setEditingId] = useState(null)
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [isAdmin, setIsAdmin] = useState()
    let [isActive, setIsActive] = useState()
    let [activeState, setActiveState] = useState(false)
    let [permissionState, setPermissionState] = useState(false)
    let [isChanged, setIsChanged] = useState(false)
    let [isAddUser, setIsAddUser] = useState(false)
    //////// For Search /////////

    let [usernameSearch, setUsernameSearch] = useState('')
    let [emailSearch, setEmailSearch] = useState('')
    let [isAdminSearch, setIsAdminSearch] = useState(null)
    let [isActiveSearch, setIsActiveSearch] = useState(null)
    let [roelSerach, setRoleSearch] = useState(null)
    let [statusSearch, setStatusSearch] = useState(null)
    let usersFilter = users.filter((user) => 
        user.username.toLowerCase().includes(usernameSearch.toLowerCase()) &&
        user.email.toLowerCase().includes(emailSearch.toLowerCase()) &&
        (user.isAdmin === isAdminSearch || isAdminSearch === null) &&
        (user.isActive === isActiveSearch || isActiveSearch === null)
    )
    const checkRole = (ch) => {
        setRoleSearch(ch)
        if(ch === "admin"){          
            setIsAdminSearch(true)
        }
        if(ch === "general"){
            setIsAdminSearch(false)
        }   
    }
    const checkStatus = (st) => {
        setStatusSearch(st)
        if(st === "active"){
            setIsActiveSearch(true)
        }
        if(st === "inactive"){
            setIsActiveSearch(false)
        }
    }
    //////////////////////////////////

    const PermissionButton = () => {
        setPermissionState(!permissionState)
        setActiveState(false)
    }
    const ActiveButton = () => {
        setActiveState(!activeState)
        setPermissionState(false)
    }

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const res = await axios.get("http://localhost:5000/users")
                setUsers(res.data.users)
            } catch(err){
               console.log(err.response)
            }
        }
        getUsers();
    }, [])

    const Delete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:5000/delete-user/${id}`)
            setNotifData({status: "active", code: res.status, msg: res.data.message, description: res.data.description})
            setUsers(users.filter( user => user._id !== id))
        } catch (err){
            console.log(err)
            setNotifData({status: "active", code: err.response.status, msg: err.response.data.message, description: err.response.data.description})
        }
        setTimeout(()=>{
            setNotifData({status: "un-active", code: null, msg: null, description: null})
        }, 2000)
    }

    const Update = async(user) =>{
        setEditingId(null)
        if(isChanged){
            try{
                if(!username || !email){
                    setNotifData({status: "active", code: 400, msg: "Warning!", description: "Please fill the username and email field"})
                } else{
                    const res = await axios.patch(`http://localhost:5000/update-user/${user._id}`, {username: username, email: email, isAdmin: isAdmin, isActive: isActive})
                    UpdateUsers(user)
                    setNotifData({status: "active", code: res.status, msg: res.data.message, description: res.data.description})
                }
            } catch(err){
                setNotifData({status: "active", code: err.response.status, msg:err.response.data.message, description: err.response.data.description})
            }
            setTimeout(()=>{
                setNotifData({status: "un-active", code: null, msg: null, description: null})
            }, 2000)
            setIsChanged(false)
        }
    }

    const UpdateUsers = (userTarget)=>{
        users.forEach(user => {
            if(user._id == userTarget._id){
                user.username = username;
                user.email = email;
                user.isAdmin = isAdmin;
                user.isActive = isActive;
            }
        })
    }

    const SetUpdateMode = (user) => {
        setEditingId(user._id)
        setUsername(user.username)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsActive(user.isActive)
    }
    const ChangeUsername = (text) => {
        setIsChanged(true)
        setUsername(text)
    }
    const ChangeEmail = (text) => {
        setIsChanged(true)
        setEmail(text)
    }
    const ChangeIsAdmin = (bool) => {
        setIsChanged(true)
        setIsAdmin(bool)
    }
    const ChangeIsActive = (bool) => {
        setIsChanged(true)
        setIsActive(bool)
    }

    return(
        <div className='users-container flex flex-col justify-between'>
            {isAddUser ?
            <div className='z-1001 flex'>
                <div className='fixed w-[164vh] h-170 bg-gray-900 opacity-65 z-1000 flex items-center justify-center'>          
                </div>
                <AddUser st={setIsAddUser}/>
            </div>
            :
            ''
            }

            <div className='filter-add'>
                <div className='filter translate-y-11 z-100'>
                    <h2 className='font-medium mb-3 text-[18px] text-blue-950 border-b border-b-pink-400 w-18'>Search</h2>
                    <div className='filter flex items-center justify-between gap-14 bg-gradient-to-r from-pink-400 to-pink-500 py-2 px-4'>
                        <input className='bg-white py-1 px-2 rounded-sm' placeholder='username' onChange={(e) => setUsernameSearch(e.target.value)}/>
                        <input className='bg-white py-1 px-2 rounded-sm' placeholder='email' onChange={(e) => setEmailSearch(e.target.value)}/>
                        <label className='flex items-center gap-4 text-blue-950 text-[17px] font-medium px-3 py-1 bg-white rounded-sm'>
                            <div className='flex gap-1.5 hover:text-green-500 transition-all'><input className='cursor-pointer' type='radio' name='role' value="admin" checked={roelSerach === "admin"} onChange={e => checkRole(e.target.value)}/>admin</div>
                            <div className='flex gap-1.5 hover:text-yellow-500 transition-all'><input className='cursor-pointer' type='radio' name='role' value="general" checked={roelSerach === "general"} onChange={e => checkRole(e.target.value)}/> general </div>
                        </label>
                        <label className='flex items-center gap-4 text-blue-950 text-[17px] font-medium px-3 py-1 bg-white rounded-sm'>
                            <div className='flex gap-1.5 hover:text-green-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='active' checked={statusSearch === "active"} onChange={e => checkStatus(e.target.value)}/> active </div>
                            <div className='flex gap-1.5 hover:text-red-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='inactive' checked={statusSearch === "inactive"} onChange={e => checkStatus(e.target.value)}/> inactive </div>
                        </label>
                    </div>
                </div>
                <div className='mt-13 flex gap-1'>
                    <h2 className='font-medium text-green-900'>Add user</h2>
                    <i onClick={() => setIsAddUser(true)} className='fa fa-plus p-1 bg-green-500 text-white rounded-full cursor-pointer'></i>
                </div>
            </div>
            <div className='show-users flex flex-col mt-3 items-center'>
            <div className='-translate-y-60 -translate-x-50 z-1001'><Notification/></div>
            <div className='w-full translate-y-2 bg-gray-100 p-2 rounded-[10px]'>
                <div className='mb-5 border-b border-b-gray-300 pb-2'>
                    <div className='w-full px-2'>
                        <div className='flex justify-between gap-8'>
                            <span>Username</span>
                            <span>E-mail</span>
                            <span className='translate-x-24'>Permissions</span>
                            <span className='translate-x-15'>Status</span>
                            <span>Edit & Delete</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-0.5'>
                    {
                        usersFilter.map((user, idx)=>(                        
                            <div className='flex justify-between items-center bg-gray-50 py-0.5' key={idx}>
                                <div className='flex items-center gap-2'>
                                    <img src='data:image/jpeg;base64,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'
                                    className='w-10 rounded-full'/>
                                    {
                                        editingId === user._id ?
                                        <input className='w-25 font-medium p-1 border border-gray-400 shadow rounded-[5px] bg-gray-100' onChange={(e)=>ChangeUsername(e.target.value)} value={username}/>
                                        :
                                        <span className='w-25 font-medium'>{user.username}</span>
                                    }
                                </div>
                                {
                                    editingId === user._id ?
                                    <input className='w-50 font-medium p-1 border border-gray-400 shadow rounded-[5px] bg-gray-100' onChange={(e)=>ChangeEmail(e.target.value)} value={email}/>
                                    :
                                    <span className='w-50'>{user.email}</span>
                                }
                                <div className='flex flex-col item-center'>
                                {
                                    editingId === user._id ?
                                    <div><span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 ${isAdmin ? 'bg-green-200' : 'bg-yellow-200'}`}>{isAdmin ? "Admin" : "General"}</span><i className='
                                    fa fa-chevron-down text-sm text-green-900 cursor-pointer' onClick={PermissionButton}></i></div>
                                    :
                                    <span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 ${user.isAdmin ? 'bg-green-200' : 'bg-yellow-200'}`}>{user.isAdmin ? "Admin" : "General"}</span>
                                }
                                {  editingId === user._id ? permissionState ?
                                    <div className='z-1000 absolute translate-y-9 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-sm'>
                                        <ul className='z-500 flex flex-col gap-2 py-1 px-2'>
                                            <button onClick={() => ChangeIsAdmin(true)}><li className='cursor-pointer border-b border-transparent hover:border-b-gray-500 rounded transition'>Admin</li></button>
                                            <button onClick={() => ChangeIsAdmin(false)}><li className='cursor-pointer border-b border-transparent hover:border-b-gray-500 rounded transition'>General</li></button>
                                        </ul>
                                    </div> : '' : ''}
                                </div>
                                <div>
                                {
                                    editingId === user._id ?
                                    <div><span className={`px-2 py-1 text-black rounded-[5px] opacity-85 ${isActive? 'bg-green-400': 'bg-red-400'}`}>{isActive ? "Active": "Inactive"}</span><i className='fa fa-chevron-down cursor-pointer text-sm
                                    text-green-900' onClick={ActiveButton}></i></div>
                                    :
                                    <span className={`px-2 py-1  text-black rounded-[5px] opacity-80 ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`}>{user.isActive ? "Active": "Inactive"}</span>
                                }
                                {
                                    editingId === user._id ? activeState ?
                                    <div className='z-1000 absolute translate-y-3 text-center text-gray-700 bg-gray-100 border border-gray-300 rounded-sm'>
                                        <ul className='flex flex-col gap-2 py-1 px-2'>
                                            <button onClick={() => ChangeIsActive(true)}><li className='cursor-pointer border-b border-transparent hover:border-b-gray-500 rounded transition'>Active</li></button>
                                            <button onClick={() => ChangeIsActive(false)}><li className='cursor-pointer border-b border-transparent hover:border-b-gray-500 rounded transition'>Inactive</li></button>
                                        </ul>
                                    </div> : '' : ''
                                }
                                </div>
                                <div className='flex gap-3'>
                                    <button onClick={()=>Delete(user._id)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-red-500 text-white'><i className='fa fa-trash'></i></button>
                                    {
                                        editingId === user._id ?
                                        <button onClick={() => Update(user)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-violet-500 text-white'><i className='fa fa-save'></i></button>
                                        :
                                        <button onClick={()=> SetUpdateMode(user)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-violet-500 text-white'><i className='fa fa-pen'></i></button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
        </div>
    )
}