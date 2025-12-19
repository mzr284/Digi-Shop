import axios from "axios"
import { useEffect, useState } from "react"
import "../styles/homeAdminResponsive.css"
import "../styles/order.css"

export default function Orders(){
    const [ orders, setOrders ] = useState([])
    const generateDate = (date) => {
        const mainDate = new Date(date);
        const date1 = mainDate.toLocaleString('en-US', {month: 'short', day:'numeric', year: 'numeric'})
        const time = mainDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric'})
        return {
            date: date1,
            time: time
        }
    }
    useEffect(() => {
        const getOrders = async() => {
            try{
                const res = await axios.get("http://localhost:5000/orders")
                setOrders(res.data.orders)
            } catch(err){
                console.log(err.response)
            }
        }
        getOrders()
    }, [])
    const makeSortWord = (word, limit) => {
        return word.length <= limit ? word : word.slice(0, limit) + '...'
    }
    return(
        <div className="order-container ml-65 pb-19 pr-3 pt-7 overflow-hidden">
            <div className="bg-gray-100 mr-10 py-3 px-2 w-full">
                <div className="flex justify-between mb-3 ml-2">
                    <h2 className="font-bold text-2xl">Purchases</h2>
                </div>
                <div className="bg-white ml-3 rounded-t-[10px]">
                    <div className="orders-container px-1">
                        <div className="header-table px-3 py-2 flex justify-between items-center text-[15px] font-semibold text-gray-800 border-b-2 border-gray-300">
                            <span className="w-35">Order ID</span>
                            <span className="w-20">User info</span>
                            <span className="w-13">Items</span>
                            <span>Price</span>
                            <span className="-translate-x-3">Delivery method</span>
                            <span className="-translate-x-7">Delivery price</span>
                            <span className="-translate-x-17">Created</span>
                        </div>
                        {
                            orders.map((order, index) => (
                                <div key={index} className="order-main border-b border-b-gray-300 font-medium flex flex-col">
                                    <div className="status-order hidden w-full bg-green-500 rounded-t-[10px] mb-3 px-2 py-0.5 shadow text-white justify-center text-shadow-xs text-shadow-green-400">
                                        Paid
                                    </div>
                                    <div className="suborder-1 px-3 py-2 flex justify-between items-center w-full gap-1">
                                        <div className="id-container flex justify-between">
                                            <span className="id-text hidden text-[14px] text-gray-700">Order ID: </span>
                                            <div className="flex justify-end relative group">
                                                <span className="long-id z-1 text-[14px] tracking-tight font-medium bg-green-50
                                              text-green-700 rounded-[7px] px-1 border w-46 text-center">{order._id}</span>
                                                <span className="short-id hidden z-1 text-[14px] tracking-tight font-medium bg-green-50
                                              text-green-700 rounded-[7px] px-1 border cursor-pointer">{makeSortWord(order._id, 17)}</span>
                                                <div className="devtool-id hidden absolute top-0 left-1/2 -translate-x-1/2 tracking-tight text-[15px] font-medium opacity-0 group-hover:opacity-100
                                                transition-transform group-hover:-translate-y-10 px-2 text-white bg-green-600 rounded-xl">
                                                    {order._id}
                                                    <div className="triangle-1 z-100 absolute text-green-600 left-1/2 -translate-x-1/2">                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="id-container flex justify-between">
                                            <span className="id-text hidden text-[14px] text-gray-700">Buyer Info: </span>
                                            <div className="user-info-container w-20 flex justify-start relative">
                                                <div className="username z-1">
                                                    <span className="text-[15px] text-gray-800 font-medium border-b border-b-transparent transition-all hover:border-b-gray-500
                                                    cursor-pointer">{order.user.username}</span>
                                                </div>
                                                <div id="devtool-user" className="username absolute top-0 translate-x-1/6 flex-col gap-3 bg-pink-500 text-gray-100
                                                opacity-0 transition-opacity p-2 rounded-[7px] -translate-y-1/2 items-center min-w-42 shadow">
                                                    <div className="absolute w-full h-full">
                                                        <div className="h-full w-full relative">
                                                            <div className="triangle-left absolute top-1/2 -translate-y-1/2 -translate-x-4"></div>
                                                            <div className="triangle-right absolute top-1/2 -translate-y-1/2 right-0 hidden"></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <img src='https://kimesengineering.com/wp-content/uploads/2019/10/vIqzOHXj.jpg' 
                                                        className="w-15 rounded-full mb-3"/>
                                                    </div>
                                                    <div className="flex justify-between gap-1 flex-col items-center">
                                                        <span className="font text-[15px]">username: </span><span className="font-medium text-[15px] text-gray-200">{order.user.username}</span>
                                                    </div>
                                                    <div className="flex justify-between gap-1 flex-col items-center">
                                                        <span className="font text-[15px]">email: </span><span className="font-medium text-[15px] text-gray-200">{order.user.email}</span>
                                                    </div>
                                                    <div className="flex justify-between gap-10">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span className="text-[15px]">Admin</span>
                                                            { order.user.isAdmin ?
                                                            <i className="fa fa-check rounded-full p-1 bg-white text-green-500"></i>:
                                                            <i className="fa fa-xmark rounded-full p-1 bg-white text-red-500"></i>
                                                            }
                                                        </div>
                                                        <div className="flex flex-col items-center gap-1.5">
                                                            <span className="text-[15px]">Active</span>
                                                            { order.user.isActive ?
                                                            <i className="fa fa-check rounded-full p-1 bg-white text-green-500"></i>:
                                                            <i className="fa fa-xmark rounded-full p-1 bg-white text-red-500"></i>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-info w-17 flex justify-start relative">
                                            <span className="id-text hidden text-[14px] text-gray-700">Items :</span>
                                            <span className="items text-[15px] text-gray-800 font-medium cursor-pointer z-1 transition-all border-b border-transparent hover:border-gray-400 -translate-x-3">
                                            {order.products.length} items</span>
                                            <div id="order-schema" className="items bg-gradient-to-b from-gray-100 to-gray-200 absolute min-w-70 flex flex-col translate-x-17 opacity-0 top-1/2 -translate-y-1/2
                                             rounded-xl border border-gray-300 shadow py-2 transition-opacity">
                                                <div className="triangle-2 absolute"></div>
                                                <div className="flex w-full flex-col gap-3">
                                                    {
                                                        order.products.map((item, idx) => (
                                                            <div className="informations-product flex justify-between gap-6 px-2 py-1.5 items-center border-b border-gray-300" key={idx}>
                                                                <img src={item.product.image} className="w-13"/>
                                                                <span className="font-medium text-[15px] w-15">{item.product.category}</span>
                                                                <div className="font-semibold flex items-center gap-1"><span>{item.count}</span><span className="
                                                                font-normal text-[14px]">count</span></div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="px-2 flex flex-col mt-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[15px] font-medium">Totol price: </span>
                                                        <span className="font-medium text-red-500">${order.price - order.deliveryPrice}</span>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="final-price-info flex justify-between -translate-x-3">
                                            <span className="id-text hidden text-[14px] text-gray-700">Final Price :</span>
                                            <div className="w-10 font-medium text-[15px] text-gray-800">${order.price}</div>
                                        </div>
                                        <div className="delivery-id flex justify-between -translate-x-2">
                                            <span className="id-text hidden text-[14px] text-gray-700">Method :</span>
                                            <div className="delivery-text w-40 flex justify-start">
                                                <span className="text-[15px] text-gray-800 font-medium">{order.deliveryType}</span>
                                            </div>
                                        </div>
                                        <div className="delivery-price-id flex justify-between">
                                            <span className="id-text hidden text-[14px] text-gray-700">Delivery Price :</span>
                                            <div className="delivery-price text-[15px] text-gray-800 font-medium w-5 -translate-x-4">${order.deliveryPrice}</div>                
                                        </div>
                           
                                         <div className="date-container flex flex-col justify-between text-[15px]">
                                            <div className="flex gap-1">    
                                                <span className="text-[14px] text-gray-700">Date:</span>
                                                <span className="flex gap-2 font-medium text-[14px] text-gray-800">{generateDate(order.date)["date"]}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <span className="text-[14px] text-gray-700">Time:</span>
                                                <span className="flex gap-2 font-medium text-[14px] text-gray-800">{generateDate(order.date)["time"]}</span>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div className="footer-order bg-gray-200 rounded-b-[10px] hidden w-full border-t border-t-gray-300 font-medium">
                                        <div className="flex justify-between px-2 pt-1 pb-1.5">
                                            <span className="text-[15px] text-gray-700">Total: </span>
                                            <span className="text-gray-800">$ {order.price}</span>
                                        </div>
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