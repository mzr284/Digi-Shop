import { Link, Links, useNavigate } from "react-router-dom";
import "../styles/headerResponsive.css"
import { use, useContext, useState } from "react";
import NotifContext from "./notifContext";
import Notification from "./notification";

export default function Header(){
    const [open, setOpen] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]
    const user = JSON.parse(localStorage.getItem("user"))
    const { setNotifData } = useContext(NotifContext);
    const navigate = useNavigate();

    const Logout = async (st)=>{
        localStorage.removeItem("user")
        setNotifData({ status: "active", code: 200, msg: "Logout Successfully! See you later" })
        navigate('/')
        setTimeout(()=>{
            setNotifData({ status: "un-active", code:null, msg: null });
        }, 2000)
        if(st == 2){
            setSidebar(false);
        }
    }
    const viewSection = (id) => {
        if(location.pathname == "/"){
            const element = document.getElementById(id)
            const y = element.getBoundingClientRect().top + window.pageYOffset - 85;
            window.scrollTo({
                top: y,
                behavior: "smooth",
            })
        }
        setOpen(false)
    }
    let newCat = []
    categories.forEach((cat)=>{
        let catIt = [];
        catIt.push(cat)
        let catWithputSpace = cat.replace(" ", '')
        catIt.push(catWithputSpace)
        newCat.push(catIt)
    })
    return(
        <div id="header">
            {sidebar ? 
            <div>
                <div className="backDr fixed w-full h-full z-1400">
                
                </div>
            </div>
            :
            ''
            }
            <div className={`fixed z-1401 left-0 bg-white shadow px-2 py-2 w-60 h-full ${sidebar? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-500`}>
                <div className="absolute right-0 top-10 bg-green-500 text-white pr-1 pl-4 py-1 rounded-l-full shadow cursor-pointer h-8 w-12 group" onClick={()=>setSidebar(false)}>
                    <i className="fa fa-arrow-left-long text-[18px] transition-all transform group-hover:scale-85"></i>
                </div>
                { user?
                <div className="w-full flex items-center gap-2.5 px-2 py-2 mb-8 border-b border-b-green-400 shadow">
                    <img src="https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg"
                    className="w-20 rounded-full border border-gray-400"/><div className="absolute w-3 h-3 rounded-full bg-green-500 top-4 left-20"></div>
                    <div className="flex flex-col">
                        <h4 className="font-medium text-[18px]">{user.username}</h4>
                        <span className="text-gray-600">{user.email}</span>
                    </div>
                </div>
                :
                ''
                }
                { !user ?
                   <div className="w-full mt-2 mb-3 flex flex-col gap-3 items-center justify-center">
                    <div className="text-center flex flex-col mb-2">
                        <h2 className="font-semibold text-xl">Sign In</h2>
                        <p className="font-medium">Please</p>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdfiuVvSbM0ri3vT7d7YWBeptK7i1bEyQjQDSrAdqBcyUlkyjsYnlerh4i3__auZzh6dM&usqp=CAU" className="w-47 rounded-[10px] shadow border border-green-400 p-0.5"/>
                    <ul className="w-full">
                        <Link to='/' onClick={()=>setSidebar(false)}>
                            <li className="flex justify-between pr-3 items-center cursor-pointer px-2 py-1.5 rounded-xl hover:bg-blue-600 group transition-all mt-3 shadow shadow-blue-100"
                            onClick={()=>viewSection('header')}>
                                <h2 className="font-semibold text-gray-600 group-hover:text-white transition-all">Home</h2>
                                <i className="fa fa-home-lg-alt text-gray-600 group-hover:text-white transition-all"></i>
                            </li>
                        </Link>
                    </ul>
                    <ul className="w-full">
                        <Link to='/#footer' onClick={()=>setSidebar(false)}>
                            <li className="flex justify-between pr-3 items-center cursor-pointer px-2 py-1.5 rounded-xl hover:bg-blue-600 group transition-all mt-3 shadow shadow-blue-100"
                            onClick={()=>viewSection('footer')}>
                                <h2 className="font-semibold text-gray-600 group-hover:text-white transition-all">Contact</h2>
                                <i className="fa fa-headset text-gray-600 group-hover:text-white transition-all text-[19px]"></i>
                            </li>
                        </Link>
                    </ul>
                    <ul className="w-full">
                        <Link to='/#footer' onClick={()=>setSidebar(false)}>
                            <li className="flex justify-between pr-3 items-center cursor-pointer px-2 py-1.5 rounded-xl hover:bg-blue-600 group transition-all mt-3 shadow shadow-blue-100"
                            onClick={()=>viewSection('footer')}>
                                <h2 className="font-semibold text-gray-600 group-hover:text-white transition-all">About us</h2>
                                <i className="fa fa-info-circle text-gray-600 group-hover:text-white transition-all text-[19px]"></i>
                            </li>
                        </Link>
                    </ul>
                   </div>
                 :
                 null
                }
                <div className="flex flex-col gap-3 text-gray-600">
                    { user!=null ?
                    <Link to='/cart' className="flex text-center justify-between items-center px-2 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all group" onClick={()=>setSidebar(false)}>
                        <h4 className="font-semibold text-[16px]">Cart Shopping</h4>
                        <div className="flex">
                            <i className="fa fa-cart-shopping text-xl cursor-pointer rounded-full translate-x-2"></i>
                            <div className="bg-pink-500 text-white px-1 rounded-full translate-x-1.5 pb-0.5 translate-y-1.5 h-4 text-[14px] flex items-center group-hover:text-blue-500 group-hover:font-bold
                            group-hover:bg-white border-2 border-transparent group-hover:border-blue-500 transition-all">{user.cart.length}</div>
                        </div>
                    </Link>
                    : null
                    }
                    { user?
                        <div className="flex justify-between pr-3 items-center cursor-pointer px-2 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all" onClick={()=>Logout(2)}>
                            <h4 className="font-semibold">Logout</h4>
                            <i className="fa fa-sign-out text-xl"></i>
                        </div>
                        :
                        <Link to='/enter' onClick={()=>setSidebar(false)}>
                            <div className="flex justify-between pr-3 items-center cursor-pointer px-2 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all mt-3 shadow shadow-blue-100">
                                <h4 className="font-semibold">Login</h4>
                                <i className="fa fa-sign-in text-xl"></i>
                            </div>
                        </Link>
                    }
                    { user != null && user.isAdmin ?
                        <Link to='/admin' onClick={()=>setSidebar(false)}>
                            <div className="flex justify-between items-center pr-3 px-2 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                <h4 className="font-semibold">Admin page</h4>
                                <i className="fa fa-user-alt text-xl"></i>
                            </div>
                        </Link>
                        :
                        ''
                    }
                </div>
                
                { user != null && user.isAdmin ?
                    <div className="flex flex-col gap-3 mt-10 text-gray-600">
                        <h3 className="font-semibold text-[17px] text-orange-500 flex items-center mb-2 justify-between pr-4">My Teamates <i className="fa fa-users text-[19px]"></i></h3>
                        <div className="flex justify-between items-center pr-1">
                            <div className="flex items-center gap-2 font-medium">
                                <div className="relative">
                                    <img src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" className="w-15 rounded-full p-0.5 border border-gray-400"/>
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-green-500 top-1 left-12"></div>
                                </div>
                                <span>Mr. Shelbi</span>
                            </div>
                            <i className="fa-solid fa-camera text-pink-500 text-[19px]"></i>
                        </div>
                        <div className="flex justify-between items-center pr-1">
                            <div className="flex items-center gap-2 font-medium">
                                <div className="relative">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZSsRW8ahClgpWbdmk1wKCv_6d5ZNEf_kuZLEmarGpS7KAd8cHuXo9UPSJOy_EESmpu8&usqp=CAU" className="w-15 rounded-full p-0.5 border border-gray-400"/>
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-yellow-400 top-1 left-12"></div>
                                </div>
                                <span>Ms. Knox</span>
                            </div>
                            <i className="fa-solid fa-video-camera text-violet-500 text-[19px]"></i>
                        </div>
                        <div className="flex justify-between items-center pr-1">
                            <div className="flex items-center gap-2 font-medium">
                                <div className="relative">
                                    <img src="https://kimesengineering.com/wp-content/uploads/2019/10/vIqzOHXj.jpg" className="w-15 rounded-full p-0.5 border border-gray-400"/>
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-red-500 top-1 left-12"></div>
                                </div>
                                <span>Mr. Frost</span>
                            </div>
                            <i className="fa-solid fa-comments text-green-500 text-[19px]"></i>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        <div className="header z-1010 fixed w-full bg-gray-200 flex justify-between py-2 px-8 items-center shadow">
            <div>
                <Link to='/'><img className="w-20 rounded-2xl shadow-md shadow-gray-300" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAABRFBMVEX////sHXgAAAABFBjtCSz8/Pzv7/BlZ2fMzMz47fPy8vLU1NbtDHTqYZnl5eXlNHzZI3X25fNQMD+4ubna2tqYmJixsbFISkmenp5sbGyvCR6+v7+pqalCQkIbGxxbW1uQkJAACxCBgYGEAAAbICHkWZblap6OBBSOAAB3eHlSUlK5nJ2mnZ1NABMmKijn1NuAFipyDCNPFCQ1DiAAFhDy1+nsq8bpnb3nj7DpABUtMDJyAAklEhYQIB9ALTgYGB+lLGJMGjLIKnK2IWQ+FSx1HUAhFR98I03qxdqeFlSFG03sudMAFgQuGCLgdqHy39/109TkTIjcX1/oPkPSLi/ZdHPntLnZe4Hjo6fqVFvpAADikZXse37mAGblv8H1mJqhIympAADCbGyoZ2ldAAJUJSiPMC88Ehm0fn9pNDtiFCKZaGt0ILYiAAAIQElEQVR4nO2c+3fTyBWAJ1ceSZbMkKCHpeqtOAEri4ElD2zo7ra0wJI2CYQFwpbtbl+0zf//e++MnNiKbfZAW0tu5+OcZDSSD/fTzJ0ZPRxCJBKJRCKRSCQSiUQikUgkEolEIpFcYgeWFdh1R/FvYGndUa836mpB3ZF8JqzIlExRlAx/JazuaD4HPRLxA2T8Z9esO55PxxiBogD0kqIHvBTRuiP6ZPqA516zKaJr2BLQrzuiTyWIMQfci60Qsqyn1xnPp0NzUMCbbHu4mdYWzWfBugD9qd5v9AEStb54PgM7zuLKZGDF2WC1BlYbsqhy0lmUwWrN0qhQVCoo9qxVUqDERAU+nhocXqAFb4Xmzw3Gzs4XDpKmOCuMcqTP4YV8kGV5muJO74udHaPuSBdibG5uPrz9qNcb9HBtMRj0LhkMsOKXWHh0+yEe1FyFO3fvfXn//v0bN258pShf36iAUl/hL9z95b27d+qOdCHrl3yT7f5qfZpf/2Y3+2ay2dSkoJ21MZ3HqLA2zToqPL7c3WnXHesCNqoK61UFZaKw1tmoO9YF7F0qrP12V3nyeFrh8dfK7tOJwl7dsS7g2UThya6y++20wnOsuD/ZfFZ3rAs4nCg8/d3u76ut8GR39/lk/2HdsS5gfyrkb59WDNDh+XSr7Ncd6wIOKjF31hbTOag71gU8+FjUVYUHdce6gP8BhaO5Cp15bNcd63zo9hyFzvqW4NrW9gVHR0fbDc2F9rVZhc52U5cSc2lvzSh0tjZI+/j4+ESIHJ9gkZfonROkgUu9jRdXFTrX98jxy9PT01fHuJ9+h6XT1/zQNy0sva053jnsXZ9j0D4btlrv3vD9x6etVmv4PS+2h7zYPIerCsLgJQ/2lDcCOREK34n+8z2vfvdDvQHP8qyq0MGFkPGH4eWZJ69bvPyyTAuu0zo9qTXgWZ5d6Uf7hL55xyM9E41A3g6nwn4rfJrmcFgReI8rudJg3OepaJFWq4yanon2eXVcZ8Qz7E8PSHwJUZ724aty9CzTojV8XR79Q6l31iiHaYXOVpu8Ls/6cJy0ZfdvDf84PvxsOJUbDWF6ldd5QNmPP/2C8yOzBUG5+dOfyk17Z7zdoKGVVhS228afN29y/mLpHDN9KDZv/lUvt/vl7s0GjawVhTWcE+787datWzfvPurqJkYcZB9KI/BNbuDC7Zu4f/PvDVpntCsL1c4WJcbO+fk/QIFRGoY5ZEr8z7v3PmQKdD039EFRPpyfnzfqvt6Vher7I3GviIeaAfCHnpcAZGK7cXfrry5UOy8OcLDRQMmyjD97ngWa9iy6/eLK7NzprG2gQlwkSVLEK6GwvnaV61wh5flK++JB+hSNVJgxKBXKp4YOpnXXnZBAAxX2Zi87hYIl9jqQjaafeLIoa6DC+59RiKYVjCYqHK6+wv7qKxysvsKD1VeYczty1RTm3I5ctUF19l5eVUGBPJiQZw2c2q5/VMHjs3E8oYkLDDq7RCoVQrE3hRVY5i1SiPi7I+loznK7aQrt2TGVX31qIC545l4wQNNeE3sx+yxn7ZCYGSwkqjvkq+wdXbvK1gElQV+bj58273VD2p4FL3eoOp/mvpMkkfx/YVqeZ1XvZFE9YNQMFk1XhhlYgclzmOkNyGTDifm4PnCmK9UILJosernc7oupQDP5a/T1v0OPCx4Y9PuokU7Vql0IqA/O3I+ouNzDgdQFvGhogoJevhVPc8BgDJUSZhtCwSKU0nFNOW8xxsYfKb/L4KIiV1DV8Q1to5wf8GM4fyxPAUMXARgxODRPdK870vSyFZzEJWkShNEowVNNvWJUiElYH3+ZQQ1NEmaWlyQ5bwrmaYnv4QFWaOZF4i1NYgR+WUggMQqIYITrHWZwBQ37VoHbooZgh8NCwmONIL3I/hAGUejAyOTpkwY5JHhk1vP1ELRlOcBFh09hZCQQG7xrmcZFLmANI3oMAeMdTfQvTGcNk7nwTMoVcqwwsV0ScXtehxyzyyGTtlqGQloWcqHQF1X6lEJO+ddILBcKW1VzETGhgZdHALk6TmeK4fIDsaTFRgr8/KvJshavvYtvRyVQoIIzo+CU41MKcRRF8UW3I5SZPtpfKhjjk+6BkXZ5VuMAsSSF/jid1RhSWsxR8EoFByLH88IwwKv/dDydjSI2o+CgQsT3G/1lKfBBFdud+RDrZLGCFUAXD8NJmz/sGSdz0VWrHQn/JaOLjhQVH/lv/5PwCaHI8wJ7Nv1IK7hY69sh8ClBh0g48FSeKPji4YOFnSsV6eWNb3csxUFcTsaYpxUF64qCLg4TqRD2YJQUMWjGpYKD6Quap4GvosKg8HAcWOLqSXfS1BMrOsvjATkeo65nU74lagw3xNPOnDwdfzeMpX2/n/OzrKdMnIaAH4WVLiZWGtu5319aG3w2dN5T8rKO50Jdz9BptbAgjJ+NrkznWrC9ANc9/GLBCQ2cvhzeKzzsKIFtBFg0vZARajmWQUzHwkNDHIECxgISYHez+Yd4gTiD2hR8RydMQxXf9BxiajbGzfg9yDRimJvM13VcbORm6pIwt0ng4+UOTU09J7mHmykmR46SeBlU26sYhpNinDy9CeuT0LU1izguLk4dz3fwDDtU80hoERMn5SjABtCwUfKk8HA9q5MgwqE2rfkvA4SBr7LCpEwLchdlzNykkT/SScpyvKYw/CB0ienr/YC4jo3THA5Q1GFolLsMDXHJlFv13pdkOLIaYaiKpOBdH5em2LVsYhoq7xssxCwQ1cRGGcO1MBdMlZnEDAPKbH5kGDTofR6JRCKRSCQSiUQikUgkEolEIpFI/uv8C1YJ5nuOudRlAAAAAElFTkSuQmCC"/></Link>
            </div>

            { user!=null ?
                <Link to='/cart' className="cart flex transition-all border-b border-transparent hover:border-b-gray-500 pb-1.5 pl-0.5 text-center justify-center items-center">
                    <i className="fa fa-cart-shopping text-2xl cursor-pointer rounded-full"></i>
                    <div className="bg-pink-500 text-white px-1 rounded-full -translate-x-1.5 pb-0.5 translate-y-1.5 h-5 text-[16px] flex items-center">{user.cart.length}</div>
                </Link>
                : null
            }

            <div className="input-search">
                <i className="cursor-pointer text-white fa fa-search bg-black py-[7px] rounded-l-2xl px-2"></i>
                <input  className="bg-white py-1 px-2 w-60 text-[15px] rounded-r-2xl" placeholder="search your product"/>
            </div>

            <div className="flex justify-between gap-10">
                <div>
                    <h2  className="categories shadow py-1 px-4 rounded-2xl items-center font-medium bg-gray-100">Categories
                        <i className={`fa ${!open ? 'fa-chevron-down' : 'fa-chevron-up'} ml-2 cursor-pointer`} onClick={()=>setOpen(!open)}></i>
                    </h2>
                    { open ?
                        <div className="absolute flex flex-col gap-2 rounded-[10px] px-2 py-2 translate-y-3 -translate-x-1/9 border border-gray-300 bg-gray-100">
                            {
                                newCat.map((cat, idx) => (
                                    <Link to={`/#${cat[1]}`}><div key={idx} className="cursor-pointer px-3 font-medium text-[17px] border border-transparent
                                    transition hover:bg-gray-200 rounded-[10px] py-0.5 hover:border-b-gray-300" onClick={()=>viewSection(cat[1])}>
                                        {cat[0]}
                                    </div>
                                    </Link>
                                ))
                            }
                        </div>
                     : ""
                    }
                </div>
                {
                    user != null && user.isAdmin ?
                    <Link to='/admin'><button className="item-container shadow cursor-pointer bg-black border-1  text-white py-1 pr-4 pl-3 rounded-2xl
                        hover:bg-transparent hover:border-black hover:text-black transition-all"><i className="fa fa-user mr-2 text-[18px]"></i>Admin Page</button></Link>
                    :
                    ''
                }
                {
                    user != null ?
                    <div className="item-container flex gap-3 items-center">
                        <button className="shadow cursor-pointer bg-black text-white py-1 px-4 rounded-2xl
                        hover:bg-transparent hover:border-black hover:text-black transition-all items-center"
                        onClick={() => Logout(1)}><i className="fa fa-sign-out-alt mr-2 text-[19px]"></i>Logout</button>
                    </div>
                    :
                    <div className="item-container">
                        <Link to='/enter'><button className="shadow cursor-pointer bg-black text-white py-1 px-4 rounded-2xl
                        hover:bg-transparent hover:border-black hover:text-black transition-all">
                        <i className="fa fa-sign-in-alt mr-2 text-[19px]"></i>Enter</button></Link>
                    </div>
                }
                <div className="icon-bars hidden">
                <button className="fa fa-bars text-2xl border-transparent p-2 rounded-full cursor-pointer
                 shadow text-pink-500" onClick={()=>setSidebar(true)}>
                </button>
                </div>
            </div>
        </div>
        <div className="z-1001 w-full"><Notification/></div>
        </div>
    )
}