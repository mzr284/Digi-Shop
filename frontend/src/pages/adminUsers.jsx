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
    let [isOpenSeaech, setIsOpenSearch] = useState(false)
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
    let colors = {
        'fa-facebook': 'bg-blue-500',
        'fa-instagram': 'bg-green-500',
        'fa-x-twitter': 'bg-red-500',
        'fa-github': 'bg-gray-700',
        'fa-linkedin': 'bg-yellow-500',
        'fa-telegram': 'bg-violet-600',
        'fa-youtube': 'bg-pink-500',
    }
    let shadows = {
        'fa-facebook': 'shadow-blue-400',
        'fa-instagram': 'shadow-green-400',
        'fa-x-twitter': 'shadow-red-400',
        'fa-github': 'shadow-gray-500',
        'fa-linkedin': 'shadow-yellow-400',
        'fa-telegram': 'shadow-violet-400',
        'fa-youtube': 'shadow-pink-400',
    }
    const generateSocialMediaIcon = () => {
        let socialMediaIcon = ['fa-facebook', 'fa-instagram', 'fa-x-twitter', 'fa-github', 'fa-linkedin', 'fa-telegram', 'fa-youtube']
        let arrIcons = []
        for(let i = 0; i < 3; i++){
            let randomIndex = Math.floor(Math.random() * socialMediaIcon.length)
            arrIcons.push(socialMediaIcon[randomIndex]);
            socialMediaIcon.splice(randomIndex, 1)
        }
        return arrIcons;
    }
    const makeShortText = (text, limit) => {
        return text.length <= limit ? text : text.slice(0, limit) + '...'
    }
    const handleMouseHoverOnButtom = () => {
        if(isOpenSeaech){
            setTimeout(()=>{
                setIsOpenSearch(false)
            }, 1500)
        }else{
            setIsOpenSearch(true)
        }
    }
    const clearSearchFields = () => {
        setIsAdminSearch(null); setUsernameSearch('')
        setIsActiveSearch(null); setEmailSearch('')
        setRoleSearch(null); setStatusSearch(null)
    }
    return(
        <div className='admin-users-container w-full flex justify-center items-center ml-30 px-15 mb-20'>
        {isAddUser ?
            <div className='overflow-hidden'>
                <div className='inset-0 backdrop-2 fixed w-full h-full z-1000 flex items-center justify-center opacity-40'>          
                </div>
                <AddUser st={setIsAddUser}/>
            </div>
            :
            ''
        }
        <div className='users-container flex flex-col justify-between relative pb-10 w-4/5'>
            <div className='filter-add'>
                <div className='filter z-100'>
                    <div className='w-full flex justify-between items-center'>
                        <h2 className='search-title font-medium mb-3 text-[18px] text-pink-600 border-b-2 border-b-pink-400 w-23 mt-4 flex items-center gap-1.5'><i className='fa fa-search'></i>Search</h2>
                        <h1 className='font-medium pb-0.5 text-xl text-gray-900 border-b border-b-gray-800 flex items-center gap-2'>
                            <i className='fa fa-users text-gray-700'></i>
                            Users
                        </h1>
                        <div className='add-user flex gap-1'>
                            <i onClick={() => setIsAddUser(true)} className='fa fa-plus p-1 bg-pink-500 text-white rounded-full cursor-pointer hover:text-pink-500
                            hover:bg-white shadow shadow-pink-300 transition'></i>
                            <h2 className='font-medium text-pink-600 text-shadow-2xs text-shadow-pink-300'>Add user</h2>
                        </div>
                    </div>
                    <div id='filter-fields' className='filter flex items-center justify-between gap-14 bg-gray-200 rounded-[7px] shadow py-2 px-4'>
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
            </div>
            <div className='show-users flex flex-col mt-3 items-center'>
            <div className='group relative -left-1/2'>
                <div className='search-section hidden absolute -left-2 top-5 -translate-x-full group cursor-pointer flex-col items-center gap-2 bg-green-500
                text-white py-2 rounded-[7px] shadow shadow-green-300 z-500' onMouseEnter={handleMouseHoverOnButtom} onMouseLeave={handleMouseHoverOnButtom}>
                    <span className='z-600 search-text-rotate text-[18px]'>search</span>
                    <i className='z-600 fa fa-search text-[18px]'></i>
                    <div className={`absolute z-0 opacity-0 flex group-hover:opacity-100 group-hover:z-500 flex-col cursor-pointer left-10 transition-opacity bg-violet-200 gap-5 duration-700 py-5 px-2 rounded-[7px] shadow-md
                    shadow-violet-300 ${isOpenSeaech ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                        <div className='flex flex-col gap-2'>
                            <h5 className='font-medium text-shadow-md'>username</h5>
                            <input value={usernameSearch} className='bg-white py-1 px-2 rounded-sm text-indigo-600 text-shadow-2xs text-shadow-indigo-100' onChange={(e) => setUsernameSearch(e.target.value)}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h5 className='font-medium text-shadow-md'>email</h5>
                            <input value={emailSearch} className='bg-white py-1 px-2 rounded-sm text-indigo-600 text-shadow-2xs text-shadow-indigo-100' onChange={(e) => setEmailSearch(e.target.value)}/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h5 className='font-medium text-shadow-md'>permission</h5>
                            <label className='flex items-center gap-4 text-blue-950 text-[17px] font-medium px-3 py-1 bg-white rounded-sm'>
                                <div className='flex gap-1.5 hover:text-green-500 transition-all'><input className='cursor-pointer' type='radio' name='role' value="admin" checked={roelSerach === "admin"} onChange={e => checkRole(e.target.value)}/>admin</div>
                                <div className='flex gap-1.5 hover:text-yellow-500 transition-all'><input className='cursor-pointer' type='radio' name='role' value="general" checked={roelSerach === "general"} onChange={e => checkRole(e.target.value)}/> general </div>
                            </label>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h5 className='font-medium text-shadow-md'>Activity</h5>
                            <label className='flex items-center gap-4 text-blue-950 text-[17px] font-medium px-3 py-1 bg-white rounded-sm'>
                                <div className='flex gap-1.5 hover:text-green-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='active' checked={statusSearch === "active"} onChange={e => checkStatus(e.target.value)}/> active </div>
                                <div className='flex gap-1.5 hover:text-red-500 transition-all'><input className='cursor-pointer' type='radio' name='status' value='inactive' checked={statusSearch === "inactive"} onChange={e => checkStatus(e.target.value)}/> inactive </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='reset-filter z-0 absolute bg-green-500 hidden flex-col items-center gap-1 py-1 rounded-[7px] transition-transform duration-500 group-hover:opacity-100 group-hover:translate-y-31 -translate-x-8.5 translate-y-6
                text-white cursor-pointer' onClick={clearSearchFields}>
                    <span className='search-text-rotate text-[17px]'>reset</span>
                    <i className='fa fa-rotate-left text-[17px]'></i>
                </div>
            </div>
            <div className='w-full translate-y-2 bg-gray-200 p-2 rounded-[10px]'>
                <div className='header-table-users mb-2 border-b border-b-gray-400 pb-2'>
                    <div className='w-full px-2 font-medium text-gray-800'>
                        <div className='flex justify-between gap-8'>
                            <span>Username</span>
                            <span>E-mail</span>
                            <span className='translate-x-29'>Permissions</span>
                            <span className='translate-x-17'>Status</span>
                            <span>Edit & Delete</span>
                        </div>
                    </div>
                </div>
                <div className='users-card-laptop flex flex-col gap-2'>
                    {
                        usersFilter.map((user, idx)=>(                        
                            <div className='user-row flex justify-between items-center bg-gray-50 py-0.5 px-1 rounded-[7px] shadow ' key={idx}>
                                <div className='flex items-center gap-2'>
                                    <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUQEBAVEBAPEBUVFRUVEA8QEBYPFRUWFxUVFRUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFw8QGC0dHx8rLS0tLS0tLS0rLS0rLS0tLS0tLS0tLS0tLSstLS0tLS0rLS0tLS0tLS0tLS0tLS0rLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQQFAgMGBwj/xABFEAABAwIEAgcEBwYEBQUAAAABAAIRAwQFEiExQVEGEyJhcYGRMqGxwQcjM0Jy0fAUUmKCkuEWorLxNHSzwtIkRFNjc//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgQDBf/EACMRAQEAAgICAgIDAQAAAAAAAAABAhEDIRIxQVEEEyJhcTL/2gAMAwEAAhEDEQA/AOzSWSSy2SacIQJOEIQEITQgxRCyhJAoTThCBJhMBNAoTSQiApJoQKFkEQm1AJpwhEYrFZFJFCE4TAQYgLIBZBqYCIxyprOEKiNCAFkhRpihNCBIThOECQnCaDFEJwgoEgLRVrcAYjc/34fPguaxbpOKBLWHO4EggnsyO8n8kHWqvvsZoUdHPBPIOYDPKXEAHxIXC1OmFct0IkHUGQfMDfyUH/EtVjxNNhMEdmcp348PDuUXT0Kl0goEZnHI3mX0XiP5HFWFO5Y8SwioObSHD12Xj1xidvWIcaIt3EkmpTc4Pnx0mVY4XjBt6jW07r9opvBgOH1jHADciZkeG0HRVNPVWulMBUGB9JKNwId9XVEAtIieZB4jXyXRNCIxhNqzhMNRGCFsDU8qDSUw1bdE00NYasg1ZwgKjGEwE0SgITSQgjJLKEKNFCITQgUIhNOECRCcIQJVmNYvStmzUcA4g5W7uMcY5KJ0r6RssmaAPrPByM4fid3fH1K8kfidW4quq1D1lV0Nk7eEcAInyUWOmxjHKz2yCWtOuUHSTxc7idlyF1eVHyHZQOZHwhS7yuT2Rq6NTxP5BV1S3c3U6Rz4JGq1jLwcT/kHkttK6aAM09k6OB7TeWmxUOvcT7PD+ED4LSZ/W6umNpNw6QcurZ4T3n5lQ8xH+6ymP91nkBjWP13KokYbilSk8OD3f1HUctV6x0O6Y06pFJx1I0zQDI5fkvGi0hWmD4kaT2u9rIZg7eHgg+jWrIKi6MYqypQpjPLgxrSSQQXjQ68dleAohoQkgEwkmEDTCAE0CShNJA4QnCEEZEICay0UJwhNEJCaECWu5rBjHPOzGlx8AJW1VfSirktK7uVI+/T5oryHpNfPrvLnGXVO048m/dYOQA9d1X4a3K1zueg8Y3Kk3DHPBcRDqrwQOVMSAPcVjc08rWsb94T6qV6SfKNTuDmgERuTxJ5Soty8u/Wg8lPqWWWCBv6/rb1Ue4tjJ4Rv+asSyqxzNf7raANJ4+vJLqTO2gK3i3IgHQlVnSO+n3arB7I7lZutxJ48fIwR81By53FvH5qpYjLc2ANxPnKxNGNTz8ltlmXjmG2mh7iqibhGJ1bd4yucNRIBiRMr3fo1eddQa8uzA+yTlzFvDNGk7jQDZfO4e4OnjuvTvoyxJwqmkXfVVqbqjG6Q2q0/WNHLcGO9QenlJDUEIgAWYCGhZAIGAkQs4WJCDFMBCEDQkhBGhNCay0EJpIhITQgSqOljC61e0CcxYCP4c7c3ulXCr8dfFB5/hPh3z3RKK8pNEFuYbkADlOUNn1BclcWsvpujRunhyW/KQ5rTs1ru7UQ0fFbrmpDdBJk6DiYHu19yxXvEeqwaAcDr48vWFX4jlAj7zoHDbifNSagNMS72j36qq1k1Hb6wOR80i0GjJiOGvz+CxrDYch+S0vuDENBM8eZWQaWav3iI3Ku08fpjVqEE68wq5pcDmHA+9SXFz3QBJJ0Ec1Jq2uRna3KvlpP127qvq1ZkHy8IWt1RodqOex1Q7tO08B5D+y0VRBW48a3NeXcJK6TofddXdUXcBXaDyGbsk/5vcubtqcq/6NUC65pt4Zw4+AP9kpH0A0JELNoSIRk2hZgLFoWaAWLlkkQgwhOEwsgECyoWUJoIaE4RCyoSTQgSITQgUKvx2jmoVB/9bv8ASVYrVdtljhzaR6iFVeRvqB2Z/LN5QR+QVVSxZ+YsYBOpkkwAAdNNferC1ntj+Nw93+yh9GMNNxdBgG4k6aAAj8l526joxx3dLhmFVCwPqNDS8AgEgQD/AAgfEp/4fadS5juQ6wNHkNl2V1hlCj9pNRzuExJ4mZ0HeVyPSO3tYzy6mDAmajmGdocWlnDgeC8pla6LjJ9IFxhVaYoMyzpvSHvE/JKy6G3DzNV7WzyJcYUvBaABGSrM8HaE8oI3XXuD2U+scNAFm566j2x45e8orqeA21swgAZo1cdz+S4bpNVYezTHHeCB467q0xvpRmJYw+fBcrXo1Khzu0B4khoPhO63x433XlzcnXjihii1vH3rVdthWFO2p7Eee49Qs8btKbKTMhnee4r3lcWWPSBbVAGzyB/XvXS9BZdeU2z9pUE6cOPuXJ0NQR+uC7P6N6BN9SdGjCZ/pcfz9FqvOPc2hIhZBCMgBNCEDSTCEChZQgLJAkJoVENCAnCwpITQgSEwhUCi4pUDKNR5+7TefRpUpQMfompbV2CZfQqNEbyWEaIPMYaKbngaOAf7+18/cr36LbUF1asdS0taPOSfg1cdglwa4NuBmcc2UTGZp3YP4okjvA5rsvogqHLc03aObUYSCIMkOB/0rw5J/Gu7iu8pXc3NnRq6vbJ7zyXL9LcCp3LmvfmeaXsjMQNNpbsT5LsC2Voe0SvCWz06/DG++3GYRghqVATTytbHDKIHvK6TpJDLZzO4/BW9HQbQuf6aOi3dG+qlbx/llHjVnYmo8yY1OsTGu8K9xHA6VVje05uWMwmGucJhxBnXWJVTh1Qtfpz1XY0msc0SAdF75Z2enPhxY5S7cJeWoYYZIgRvp68VGq0XOY7jAn3rscUt6TQS1gk8Y1VPh9DNnB26txPgBPyW8c9vHl4vFy9q3VewfRXg+Vn7S4auLo8ZLf8Ay9V5raWRlhLdCDA56z8/cve+jdl1FtSpn2m0xm/GdXe8levtx2aizAQhJVg0wEAJoBCaAgAhCEAmlCaoioQELDRITQiBCEKgQhNB4z0mw84feO6sFjXvFWi8DQal0DhodI7gun6E4s2rd1XCn1T61HNUA9g1WFjS5vcZ2XX45g9K8pOpVANQcroBcx3Bze9eb9E7ataYi2jWEOLXsPI9nM1wPEHKvPPHp0cPJZZHqz6wAVffYkGDQSVjcFx0HFR6tNlMS7tO5mTr4Lk2+jMpPadh9w94l2hPpChdK6U0Y5rdnJbERyhcv0nxJ7R1cEuO0cR38lqY/DU5JLt57WZlc6CQRMeIVph2KS0aqgxe6rh2RwNNo+6NN+Z4qPaXBboui4bjj/d45XTpr+7zKXhltFtWedzRqAebSFRUKpLQ48z6DVXFO+LbKq6Jhka8yQ35phjpnl5PJb9DMD6x9N5bNOm2ZOsvOhPly7l6mwQI5BQMAtRTt6LY1FFk+OUT71YL1k048st0JBATCrLMBOEwhAklkkqBACEwgEJwhBEQhCwpITSQNJNCACaQTVDXMdOKQY2ndgfWWtRrv4nUpBe30k+q6gKPe2bKzclQZmzsdks2S6u0GnUDocDIIBHeDsqjHbapVIbSqdW6ZmAQPEFWf7GLZjGM+zY0MHcAIG/dCj1KwzBw10XFZqvo45b7RbI3rR1dzVpsqCoGtc1nYfTPEAnR3dtsoGL2t40Z89N7i4jVsQASJ9y6K5uG1GQYIjUFcve1h7Jc7IJgB5ETPJP7jqxx3OrJ/rgMdrVc56xrXuk+g46KqoMe8yQGtHAT710uOdW2Q0AZj2jJJPiTqVRMfAJ2ldGG9OT8jGTL3tYupS2G8NPNyn3bW0229s5pcKtXNUAmTTb2YH9R9FpwwSGyYAlzieAXe4LgdK7a2pUbOQDLwcDmzb8JDfityOXOu1tyMoy+zlERtEaLNFOnlAHIdyFt4AJgICYQbAkmkqBCCkoBZAIhZAKghCyhCCAmhCy0SE0IgSTQgQTQhBkFjUeGguOzQSfALIKHjxy2tR3MgeQ1KLjN2RHw64/aaOZ33nPGmmzjA9IVDVmk803zI9k82nTYfqVK+jut1lqXT/7irHhmCtMWsRUEcRqCuS3uvoa6mlM23zTJlhG3EGFTYlglMnR58JW+9r1reQ5jiBxAkea5yvi7i+ZPvUmH09P2TWqjX2DNB7TjlHHdUNyA5+RghrTE7acyrTEbt1TQHffQqqqsjRe+Es9ublsvpvucRAimz2GkSeLiPkF3X0eY4XVXuiKQpsYR4OJzeMuK8xrUyP1xXddEKXVUyPvHfy/3K9cY58vWnsSwVNguLMyNZUeGuBytJMAjgJ58FdEKvIBZAJBZhA0gmkEAgBOE1Q4WQCAFk0IHCFkhEViEJrLRIQmgSE0IBJNSbezc7U9lvPj5BBHaCdBqSjpPaTaFnMH1KuqFu1ugGvPiteMUg6kWkgabkgCeC1ol1ZXmH0WXMW3VnQh5J8SdV3ESvOMNa6yvKtIjK1z87ORa8zp3AyPJdzQvJErhymrX053JYyxC0aRtw81wmM4Q0kkNg+EFd3WuJEKluYALnKRuTrt5tc27mmIha2YeeK6a6Y1ztFg22nQCSTEDeTwXtLXlcYorDCM7y8jsURmP4jo0euvkrGg/IQQrK6urekz9na7t5pqOjsGptAPIbep4quc1dWOOp24c8t3pIva0iPuvGoVt0U6UVKY6qrNVjTA17bY4AnccgVRkaQs8LpDrHjnlcPAiPiFdMvUbDE6Nf7N4J/dPZePI/JTV502jB03Gs8QVd2ONVmaP+tb36O/q/OVnSadUgKLZYhTq+yYd+6dHenHyUsIhpgIWTUDCzCwCyCIyQhCCtQhCy0EIW2lbudsNCg1LOlRc7RoJ+HqptKza09s5j+6Pmsq13lGmnIBakTZ2tq1uroP+kLOtVg/r4LG3YTqVhcGXLUiJtDaSd/ReO/SZjxu6opUz9TRJjXRz9i5d/wBLa9yaLaFsxxdVkPcPus5TwmVzH+BYDTUPaIEgbDuW8dTujV0Sp0ry1LLgS62I6twMVQ105g08RoDBka+Cn1LR9Foe0l9J2xPtD8UfFW2C4M23acoiN/DirA0RlLOyGnhBIg8gvHk45na9uPmyw9enKi9VHi1655jYKXjH/p6rqZ1GjmmI7J2+Y8lXdexx5+eq47Lje30ZlMpuNVJq3XNTqxlaQHlkklwblaRIa2fvEH0I74nULYOgARKoMWeXVahPGo6B/MdF78EmVtvw5/yMtSSfKovuJ4D3ngFAtb2tSnXM3912o8uSvBb5oBGuuih1LAudlAXZXE32eL06mjh1bu/Vvr+as7WoG1qfJ4c34EfrvUOhgRPBXWHYIGFrnGcmwnQSsi26kgZm6jiCtts5rzEQR5qdY05Civt+rqTwJURsfazqNwpdridWl7f1jO89oeB4+awuqMjM3R3PZa7asXaOEkeRU0OjtbtlQS068jo4eSkBctpOZri2NtcplTcPxh0TUEtcey4RmjmW8vepoXzVsaFooVWu1a4OHcQVJaFEOELKEIKhZ0qZcYaJKwaCdBuVe21IU2xx4+KzGqi0rRjPb7TuXALa+oT3eH5pVp3Wmo+F6SMlUdl8So9JsukrKpqs6QQT6YgeSjMbrKku0atTW6eKDENWFUyfBZ1nwFFtzJKCRR3IPFRaTd27Fp0PGFteYcFpuTFQEcdFRxn0g4fUcW3ETkbkfH7skh3q4+oXK2FpJzEkyvX6rWvaWvGZrgWuB5HReR2FXK4sd7VNxafxNMH4Fc/Nj8x2/jZ7njfh0FoIEDcLK+w+m1hrtpwahdLiXOl+5idhrt4rVh7pIAEucYHidAuvx6xH7FUZ/wDFTzA97NXHzGb1U4Jd1fyrNSPK7GpnrEcleUbEB8xoQuZ6PvmqTzXc2wkLrz9uJqDAHR3KTkWst1lSqTZICwJ9jTgLdeWucd4WykyAFIqODWlx2aJQVjTENKj1reDmCdtX6wTxM/2UumNPw/FUVl1SLgGjiffOnxW2u0DZSWt7Xh+viQqu/uYKmREKveOoVQ5jyyBqR3niOPgu6wPE23DJ0zsgPA2mJBHcfzXmuJV8wJ3UvoPigp3LGz2aw6sgniT2D/Vp/MsxbHqSE0Ksq+xaJzHgrHrvRVL3wWs8z4Db3qQ+pp5qydCXXOYd4UciRHEJ03rJ4nx4KiJnW+huFBqO1VjbjQFBMqahayYTa6VhVUEKvUkrGz4rVVdqVut9kGdxpqtN2ZDXciFuuR2So47TPBBlScQ0lxAmY7o5rzPpDb9Tf1BECqRVH847X+YOXodejmdlLiG7wDAPGD3SFyX0jW+R9CvwJdTJ8RmZ/wB6znLcbt7cN1nE7onbh7+sPs0W5tp7X3fmfJXfTe+bRsK7iYL6Zpt5l9Ts6eRJ8in0QtMtu1x3rdr+XZvwnzXCfSZjjbiuLWmZpWxOaNjX2P8ASNPEuTix1InLl5ZuY6Pe36LvrTZcp0aspdPeu0FHKF65+3m0x2gpdsJIUem3WVNsm6ysC1y6BQ8er5Ld2sF+isgBlJOwC4HHsRfcPhgPVs25eKpFngdbsAASe/YK4ecrQOZ+Urn8FGUAK1uq31jG8G0nPPqEKkWvazngB8SfyC4zHb6KopDxd8gutq1epti779QiPQD5SvPMcBbdGeOX4KVYkU6+pHktlnb5Lmi8GG9a0O/hcSMrvCQPRRCIcDtxW99bLDokgzB2MGfkor29C8w/xy79x39Q/JCMartH/bD8IW5+3mhC0NlDdbKW6EJRX3PtHxVpbeyhCDZTRW2QhQVNXf1W+32SQipFx7CiWvslCERhU9oLmfpO/wCGpf8ANM/6dVCFcvVb4/8AqOzwb7Gj/wDjT/0BfPVX23fjd8ShC1gn27jor7IXUXGySFMkRR8lYWPzQhZFncfZP/CfguGtPZPgfgkhVYm4bv5/Nb777Z//ACw+KEJBt6QfZ0Pxj5LhulH/ABf8w+CEKEFfceSLrh4IQo0jIQhVH//Z'
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
                                    <span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 shadow ${user.isAdmin ? 'bg-green-200 shadow-green-300' : 'bg-yellow-200 shadow-yellow-300'}`}>{user.isAdmin ? "Admin" : "General"}</span>
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
                                    <span className={`shadow px-2 py-1  text-black rounded-[5px] opacity-80 ${user.isActive ? 'bg-green-400 shadow-green-300' : 'bg-red-400 shadow-red-300'}`}>{user.isActive ? "Active": "Inactive"}</span>
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
                <div className='users-card-tablet hidden flex-wrap gap-6'>
                    {
                        usersFilter.map((user, index)=>(
                            <div key={index} className='user-card px-2 py-1.5 w-8/27 flex flex-col items-center bg-white shadow rounded-[10px]'>
                                <div className='w-full flex justify-between'>
                                    <button onClick={()=>Delete(user._id)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-red-500 text-white  shadow-red-300 hover:bg-white hover:text-red-500 transition'><i className='fa fa-trash'></i></button>
                                    {
                                        editingId === user._id ?
                                        <button onClick={() => Update(user)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-violet-500 text-white shadow-violet-400 hover:bg-white hover:text-violet-500 transition'><i className='fa fa-save'></i></button>
                                        :
                                        <button onClick={()=> SetUpdateMode(user)} className='shadow p-1 w-7 cursor-pointer rounded-full bg-violet-500 text-white shadow-violet-400 hover:bg-white hover:text-violet-500 transition'><i className='fa fa-pen'></i></button>
                                    }
                                </div>
                                <img src='data:image/jpeg;base64,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'
                                className='w-30 rounded-full shadow-md shadow-gray-400'/>
                                <div className='text-center mt-5 flex flex-col w-full items-center relative'>
                                    <span className='font-medium text-[19px]'>{user.username}</span>
                                    <span className='z-301 cursor-pointer text-shadow-md text-shadow-blue-100 text-blue-800 border-b border-transparent hover:border-b-blue-700 transition
                                    overflow-hidden group flex flex-col items-center justify-center'>
                                        <div className='absolute shadow text-shadow-md text-shadow-blue-500 z-300 bg-blue-500 text-white px-2 rounded-[7px] top-7 opacity-0 group-hover:opacity-100
                                        transition-transform group-hover:-translate-y-12'>
                                            {user.email}
                                            <span className='tiangle absolute top-full left-1/2 -translate-x-1/2'></span>
                                        </div>
                                        <span>{makeShortText(user.email, 18)}</span>
                                    </span>
                                </div>
                                <div className='flex gap-5 mt-4 mb-2 border-b border-b-gray-400 pb-4 items-center'>
                                    <div className='flex flex-col item-center'>
                                    {
                                        editingId === user._id ?
                                        <div><span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 ${isAdmin ? 'bg-green-200' : 'bg-yellow-200'}`}>{isAdmin ? "Admin" : "General"}</span><i className='
                                        fa fa-chevron-down text-sm text-green-900 cursor-pointer' onClick={PermissionButton}></i></div>
                                        :
                                        <span className={`opacity-80 w-20 text-center rounded-[5px] px-3 py-1 shadow ${user.isAdmin ? 'bg-green-200 shadow-green-300' : 'bg-yellow-200 shadow-yellow-300'}`}>{user.isAdmin ? "Admin" : "General"}</span>
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
                                        <span className={`shadow px-2 py-1  text-black rounded-[5px] opacity-80 ${user.isActive ? 'bg-green-400 shadow-green-300' : 'bg-red-400 shadow-red-300'}`}>{user.isActive ? "Active": "Inactive"}</span>
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
                                </div>
                                <div className='w-4/5 flex justify-between gap-3 m-1'>
                                    {
                                        generateSocialMediaIcon().map((icon, index)=>(
                                            <i key={index} className={`fab ${icon} text-[22px] rounded-xl text-center p-1.5 ${colors[icon]} text-white shadow ${shadows[icon]} cursor-pointer`}></i>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}