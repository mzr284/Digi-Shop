import { Link, Outlet } from "react-router-dom"
import "../styles/homeAdminResponsive.css"
import { useState } from "react"

export default function AdminHome(){
    const user = JSON.parse(localStorage.getItem("user"))
    let [ sidebar, setSidebar ] = useState(false)
    return(
        <div className="flex items-center justify-center mb-40">
            { sidebar ?
            <div className="backdrop-1 z-200 fixed w-full h-full translate-y-31">

            </div>
            :
            ''
            }
            <div className={`fixed left-0 top-9 menu z-200 w-60 bg-gradient-to-b from-pink-700 to-pink-500 h-full translate-y-10 shadow-2xl text-white items-center`}>
                <h2 className="text-center text-[18px] pb-1 border-b border-gray-300 w-50 mx-5 mt-1 mb-3">Admin</h2>
                <div className=" pb-1 pt-2 flex flex-col items-center mb-5 gap-0.5 shadow shadow-pink-500">
                    <img alt="avatar" src='https://kimesengineering.com/wp-content/uploads/2019/10/vIqzOHXj.jpg'
                    className="w-20 h-20 rounded-full"/>
                    <span>{user.username}</span>
                    <span className="font-light text-[15px]">England - Manchester</span>
                </div>
                <div className="flex flex-col">
                    <ul className="flex flex-col gap-5 px-6 mt-1">
                        <Link to='/admin/users'><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400">
                            <i className="text-xl fa fa-user"></i><span>Users</span></li></Link>
                        <Link to='/admin/products'><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400"><i className="text-xl fa fa-store">
                            </i><span>Products</span></li></Link>
                        <Link><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400"><i className="text-xl fa fa-receipt translate-x-1">
                            </i><span className="ml-2">Purchase History</span></li></Link>
                        <Link><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400"><i className="text-xl fa fa-chart-line translate-x-1">
                            </i><span className="ml-2">Statistic</span></li></Link>
                    </ul>
                </div>
            </div>
            <div className={`fixed z-300 translate-y-15 w-60 bg-gradient-to-b from-pink-700 to-pink-500 h-200 top-4 shadow-2xl text-white items-center absolute left-0 ${sidebar ? 'translate-x-0' : ''} -translate-x-60 transition-transform duration-500`}>
                <div className="absolute w-full flex justify-end px-2 py-2">
                    <i className="fa fa-xmark cursor-pointer" onClick={()=>setSidebar(false)}></i>
                </div>
                <h2 className="text-center text-[18px] pb-1 border-b border-gray-300 w-50 mx-5 mt-5 mb-5">Admin</h2>
                <div className="pb-1 pt-2 flex flex-col items-center mb-5 gap-0.5 shadow shadow-pink-500">
                    <img alt="avatar" src='https://kimesengineering.com/wp-content/uploads/2019/10/vIqzOHXj.jpg'
                    className="w-20 h-20 rounded-full"/>
                    <span>{user.username}</span>
                    <span className="font-light text-[15px]">England - Manchester</span>
                </div>
                <div className="flex flex-col">
                    <ul className="flex flex-col gap-5 px-6 mt-1">
                        <Link to='/admin/users' onClick={()=>setSidebar(false)}><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400">
                            <i className="text-xl fa fa-user"></i><span>Users</span></li></Link>
                        <Link to='/admin/products' onClick={()=>setSidebar(false)}><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400">
                            <i className="text-xl fa fa-store"></i><span>Products</span></li></Link>
                        <Link><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400">
                            <i className="text-xl fa fa-receipt translate-x-1"></i><span className="ml-2">Purchase History</span></li></Link>
                        <Link><li className="flex cursor-pointer gap-3 items-center px-3 py-1.5 rounded-[10px] transition-all hover:bg-white hover:text-pink-700 hover:font-semibold hover:shadow hover:shadow-pink-400">
                            <i className="text-xl fa fa-chart-line translate-x-1"></i><span className="ml-2">Statistic</span></li></Link>
                    </ul>
                </div>
            </div>
            <div className="items-container flex items-start pl-1 translate-y-10 gap-5 w-full">
                {
                    <div className="z-1000 bar-icon translate-y-12 absolute left-3 hidden">
                        <i className="absolute fa-solid fa-bars text-pink-600 text-2xl cursor-pointer" onClick={()=>setSidebar(true)}></i>
                    </div>
                }
                
                <div className="w-full h-full overflow-x-hidden translate-y-14 outlet-container">
                    <Outlet/>
                </div>        
            </div>
        </div>
    )
}