import { useState, useContext } from "react"
import NotifContext from "./notifContext"
import "../styles/cartResponsive.css"

export default function Summary({totalCount, totalPrice, className, setOpenSide, setConfCheckOut, setFinalPrice}){
    const [ deliveryStatus, setDeliveryStatus ] = useState('standard')
    const [ hasDiscount, setHasDiscount] = useState(false)
    const [ discountCode, setDiscountCode ] = useState('')
    const [ userCode, setUserCode ] = useState('')
    let {setNotifData} = useContext(NotifContext)
    const deliveryPrices = {
        "standard": 5,
        "express": 10,
        "store": 0
    }
    if(!hasDiscount){
        setFinalPrice(Number((totalPrice + totalCount * deliveryPrices[deliveryStatus]).toFixed(3)))
    }else{
        setFinalPrice(Number((totalPrice * 0.8 + totalCount * deliveryPrices[deliveryStatus]).toFixed(3)))
    }
    const GetCode = () => {
        const randomCode = Math.floor(Math.random() * Math.pow(10, 5)).toString().padStart('0')
        setDiscountCode(randomCode)
        setNotifData({status: 'active', code: 200, msg: `Your Code is: ${randomCode}`, description: "You have just 1 minute for send code!"})
        setTimeout(()=>{
            setNotifData({status: "un-active"})
        }, 5000)
        setTimeout(() => {
            setDiscountCode('')
        }, 60000)
        if(className === "side-bar-summary"){
            setOpenSide(false)
        }
    }
    const ApllyCode = () => {
        if(userCode && userCode === discountCode){
            setNotifData({status: 'active', code: 200, msg: "Discount has been activated", description: "You have 20% discount for total price in your cart!"})
            setHasDiscount(true)
        }
        else{
            setNotifData({status: 'active', code: 400, msg: "The code is wrong", description: "Please enter correct code or maybe spent 1 minute after get code!"})
        }
        setUserCode("")
        setTimeout(() => {
            setNotifData({status: "un-active"})
        }, 2000)
        if(className === "side-bar-summary"){
            setOpenSide(false)
        }
    }
    const proccedToCheckout = ()=>{
        setConfCheckOut(true);
        setOpenSide(false);
    }
    return(
        <div className={`${className + '-container'} flex flex-col items-center relative`}>
            { className === "side-bar-summary" ?
            <div className="absolute right-0">
                <i className="fa fa-xmark text-xl cursor-pointer" onClick={()=>setOpenSide(false)}></i>
            </div>
            :
            ''
            }
            <h1 className={`text-[19px] mb-6 ${className === "side-bar-summary" ? 'mt-3' : ''}`}><i className="fa fa-lock mr-2 text-gray-800"></i>Cart Summary</h1>
            <div className={`${className} flex flex-col gap-2 w-80`}>
                <div className="w-full flex justify-between">
                    <span className="font-medium">Products Subtotal :</span>
                    {
                        hasDiscount ?
                        <div className="flex gap-2 font-bold">
                            <span>${Number((totalPrice * 0.8).toFixed(3))}</span>
                            <span className="line-through opacity-85 text-gray-800 font-normal">${Number((totalPrice).toFixed(3))}</span>
                        </div>
                        :
                        <span className="font-bold">${Number((totalPrice).toFixed(3))}</span>
                    }
                </div>
                {
                    hasDiscount?
                    <div className="text-red-600 flex justify-between">
                        <span>Shipping Discount :</span>
                        <span className="font-bold">-${Number((0.2 * totalPrice).toFixed(3))}</span>
                    </div>
                    : ''
                }
                <div className="mb-3 w-full flex justify-between font-semibold">
                    <span>Products Count: </span>
                    <span>{totalCount}</span>
                </div>
                <div className="border-t border-t-gray-500 pt-2 mb-4">
                    <h3 className="font-medium">Shipping Methods</h3>
                    <div className="flex flex-col gap-2">
                        <p className="font-normal text-[15px] opacity-70 text-gray-900">Select your perferred shipping method bellow</p>
                        <label>
                            <div className="flex items-center gap-1 font-medium cursor-pointer"><input className="cursor-pointer" type="radio" value="standard" checked={deliveryStatus === "standard"}
                            onChange={e => setDeliveryStatus(e.target.value)}/>Standard Delivery</div>
                            <div className="flex items-center gap-1 font-medium cursor-pointer"><input className="cursor-pointer" type="radio" value="express" checked={deliveryStatus === "express"}
                            onChange={e => setDeliveryStatus(e.target.value)}/>Express Delivery</div>
                            <div className="flex items-center gap-1 font-medium cursor-pointer"><input className="cursor-pointer" type="radio" value="store" checked={deliveryStatus === "store"}
                            onChange={e => setDeliveryStatus(e.target.value)}/>Pick Up From Store</div>
                        </label>
                        <div className="flex justify-between">
                            <h3 className="font-medium">Delivery Price : </h3>
                            <span className="font-bold">$ {totalCount * deliveryPrices[deliveryStatus]}</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-t-gray-500">
                    <div className="flex justify-between pt-3">
                        <span className="font-bold text-[17px]">Order Total : </span>
                        { hasDiscount ?
                        <span className="font-bold">$ {Number((totalPrice * 0.8 + totalCount * deliveryPrices[deliveryStatus]).toFixed(3))}</span>
                            :
                        <span className="font-bold">$ {Number(totalPrice + totalCount * deliveryPrices[deliveryStatus]).toFixed(3)}</span>
                        }
                    </div>
                </div>
                <div className="border-t-2 border-t-gray-700 pt-4">
                    <h2 className="font-medium">Aplly a Promotion Code</h2>
                    <p className="font-normal text-[15px] opacity-70 text-gray-900">Please enter your code without any spaces.</p>
                    <div className="mt-3">
                        <button className="cursor-pointer shadow px-2 font-medium rounded-sm border bg-red-600
                        text-white transition hover:bg-white hover:border-red-600 hover:text-red-600" onClick={GetCode}>Get Discount Code</button>
                    </div>
                    <div className="mt-3 flex items-center gap-7">
                        <input className="border rounded-sm w-full text-center shadow py-0.5" type="text" value={userCode} onChange={(e) => setUserCode(e.target.value)}/>
                        <button className="border px-2 py-0.5 rounded-sm cursor-pointer ml-3 font-medium hover:bg-gray-700 hover:text-white transition" onClick={ApllyCode}>Apply</button>
                    </div>
                    <div className="mt-7 items-center w-full text-center flex flex-col gap-2">
                        <button className="bg-black text-white font-bold w-5/6 py-2 shadow cursor-pointer transition-all hover:shadow-gray-500 hover:bg-white hover:text-black
                        rounded-[5px]" onClick={proccedToCheckout}>Proceed To Checkout</button>
                        <p className="text-start w-5/6 font-normal text-[15px] opacity-70 text-gray-900">By countinuing to checkout, you agree to our terms and conditions.</p>
                    </div>
                </div>
                <div className="pt-2 mt-3 border-t-2 w-full text-center mb-3">
                    <p className="mb-3 opacity-80 text-gray-800 text-[15px]">Or use other checkout methods:</p>
                    <button className="bg-yellow-400 px-3 py-1.5 rounded-sm w-5/7 font-bold cursor-pointer shadow"><i className="fa-brands fa-paypal text-3xl text-blue-900 mr-1"></i>
                    <span className="text-blue-900 text-xl">Pay</span><span className="text-xl text-blue-500">Pal</span></button>
                </div>
            </div>
        </div>
    )
}