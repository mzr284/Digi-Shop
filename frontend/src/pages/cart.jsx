import axios from "axios"
import { useContext, useEffect, useState } from "react"
import NotifContext from "../components/notifContext"
import { Link } from "react-router-dom"

export default function Cart(){
    let [cartProductObj, setCartProductObj] = useState([])
    let {setNotifData} = useContext(NotifContext)
    const user = JSON.parse(localStorage.getItem('user'))
    const [inputs, setInputs] = useState({})
    const [ totalCount, setTotalCount] = useState(0)
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ discountCode, setDiscountCode ] = useState('')
    const [ userCode, setUserCode ] = useState('')
    const [ hasDiscount, setHasDiscount] = useState(false)
    const [ deliveryStatus, setDeliveryStatus ] = useState('standard')
    const [confrimRemove, setConfrimRemove] = useState(false)
    const deliveryPrices = {
        "standard": 5,
        "express": 10,
        "store": 0
    }    
    useEffect(() => {
        const getProductObj = async() => {
            try{
                const res = await axios.get(`http://localhost:5000/products/user/${user._id}`)
                setCartProductObj(res.data.cart)
            } catch(err){
                console.log(err)
            }
        }
        getProductObj();
    }, [])

    useEffect(() => {
        const inputs = {};
        let count = 0;
        let price = 0;
        cartProductObj.forEach((product) => {
            inputs[product._id] = product.count;
            count += product.count;
            price += product.product.price * product.count;
        })
        setInputs(inputs)
        setTotalCount(count)
        setTotalPrice(price)
    }, [cartProductObj])
    const changeCount = async(userId, itemId, amount)=>{
        try{
            const res = await axios.patch(`http://localhost:5000/change-count/${userId}/${itemId}`, {amount: amount})
        } catch(err){
            console.log(err)
        }
    }
    const increase = (item) => {
        changeCount(user._id, item._id, 1)
        setInputs(prev => ({
            ...prev,
            [item._id]: (prev[item._id]) + 1
        }))
        setTotalCount(totalCount+1)
        setTotalPrice(totalPrice+item.product.price)
    }
    const decrease = (item) => {
        if(inputs[item._id] != 1){
            changeCount(user._id, item._id, -1)
            setInputs(prev => ({
                ...prev,
                [item._id]: prev[item._id] - 1
            }))
            setTotalCount(totalCount-1)
            setTotalPrice(totalPrice-item.product.price)
        }
    }
    const RemoveItem = async(item) => {
        try{
            const res = await axios.patch(`http://localhost:5000/remove-item/${user._id}/${item._id}`)
            let newCart = []
            cartProductObj.forEach(it => {
                if(it._id != item._id){
                    newCart.push(it)
                }
            })
            setCartProductObj(newCart)
            setNotifData({status: 'active', code: res.status, msg: res.data.msg, description: res.data.description})
        } catch(err){
            setNotifData({status: 'active', code: err.response.status, msg: err.response.data.msg, description: err.response.data.description})
        }
        setTimeout(()=>{
            setNotifData({status: 'un-active', code: null, msg: null, description: null})
        }, 2000)
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
    }
    const removeCart = async () => {
        try{
            const res = await axios.patch(`http://localhost:5000/remove-cart/${user._id}`)
            setNotifData({status: 'active', code: 200, msg: res.data.msg , description: res.data.description})
            setCartProductObj([])
        } catch(err){
            setNotifData({status: 'active', code: err.response.status, msg: err.response.data.msg , description: err.response.data.description})
        }
        setTimeout(() => {
            setNotifData({status: "un-active"})
        }, 2000)
        setConfrimRemove(false)
    }
    return(
        <div>
            {
                cartProductObj.length ?
                <div className="flex translate-y-25 mb-36 justify-between gap-10 px-30">
                    {confrimRemove ?
                    <div className="left-0 z-1000 absolute w-full h-full bg-gray-600 opacity-70 transition-transform"></div>
                    :
                    ''
                    }
                    {confrimRemove ?
                        <div className="absolute z-1001 px-4 py-3 left-1/2 top-20 flex flex-col rounded-3xl -translate-x-1/2">
                            <div className="bg-red-400 py-1 w-full flex justify-between text-white rounded-t-2xl pr-3">
                                <span className="py-1.5 px-2">Confrim Deletion</span>
                                <button><i className="fa fa-xmark cursor-pointer" onClick={() => setConfrimRemove(false)}></i></button>
                            </div>
                            <div className="bg-white py-6 px-7 rounded-b-2xl text-center flex flex-col gap-1">
                                <i className="fa fa-exclamation-triangle text-red-400 mb-2 text-4xl"></i>
                                <h2 className="text-center text-red-500 font-bold text-[19px]">Are You Sure?</h2>
                                <p className="font-medium opacity-80">This action cannot be undone. Countinue?</p>
                                <div className="w-full flex justify-center gap-4 mt-5">
                                    <button className="font-medium bg-red-400 rounded-2xl py-2 px-4 shadow cursor-pointer text-white flex gap-2 items-center border-2
                                    hover:bg-white hover:text-red-400 hover:border-red-400 transition-all" onClick={removeCart}>
                                        <i className="fa fa-trash-can"></i>Delete
                                    </button>
                                    <button className="font-medium bg-gray-200 rounded-2xl py-2 px-4 shadow cursor-pointer text-gray-800 flex gap-2 items-center border-transparent-2
                                    hover:bg-gray-600 hover:border-gray-200 hover:text-gray-200 transition-all" onClick={() => setConfrimRemove(false)}>
                                        <i className="fa fa-xmark"></i>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                    }
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1"><i className="fa fa-bag-shopping text-xl"></i><h1 className="font-medium
                        text-xl">My Cart</h1></div>
                        <div>
                            <button className="px-2 py-1 bg-gray-50 border border-gray-200 cursor-pointer -translate-y-3" onClick={() => setConfrimRemove(true)}>remove all</button>
                            <div className="flex flex-col gap-5">
                                {
                                    cartProductObj.map((item, idx) => (
                                        <div key={idx} className="flex gap-3 border-b border-b-gray-400 p-2">
                                            <div className="flex items-center"><img className="w-25" src={item.product.image}/></div>
                                            <div className="flex gap-10 mt-2">
                                                <h3 className="w-50 font-medium">{item.product.title}</h3>
                                                <div className="flex flex-col items-center">
                                                    <span>Each</span>
                                                    <span className="font-bold">${Number((item.product.price).toFixed(3))}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <h3>Quantity</h3>
                                                    <div className="border border-gray-400 w-25 flex items-center">
                                                        <i className="fa fa-plus px-1 cursor-pointer" onClick={() => increase(item)}></i>
                                                        <input className="text-center w-full border-l border-r border-l-gray-400 border-r-gray-400" value={inputs[item._id]}/>
                                                        <i className="fa fa-minus px-1 cursor-pointer" onClick={() => decrease(item)}></i>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span>Total</span>
                                                    <span className="font-bold">${Number((inputs[item._id] * item.product.price).toFixed(3))}</span>
                                                    <i className="fa fa-trash mt-10 cursor-pointer" onClick={() => RemoveItem(item)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-[19px] mb-6"><i className="fa fa-lock mr-2 text-gray-800"></i>Cart Summary</h1>
                        <div className="flex flex-col gap-2 w-80">
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
                                    <span className="font-bold">$ {Number((totalPrice * 0.8 + totalCount * deliveryPrices[deliveryStatus]).toFixed(3))}</span>
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
                                    <button className="bg-black text-white font-bold w-5/6 py-2 shadow cursor-pointer">Proceed To Checkout</button>
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
                </div>
                :
                <div className="flex translate-y-32 mb-70 w-full justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <img className="transform scale-130" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAvVBMVEX////19fVeYXWpr8Thgw5VWG63ucBPU2pYW3Du7u9UV236+vpaXXKkq8Gmp7Gsrbbi5Om8vcXHy9d8fo72+fvx8fJmaXzgfQChqL+YmqXhgQCOlq+OkJ1rboCsssZhZHjS09iFh5Xk5uy+wtLZ2t6cnqnJytB0dofZ2+PptYDT1Ni5vs+Ji5nx4dDEydXa3ujmolzv1bvlmEfnp2axtsNFSWKTm7N6f5fz6+LklkDmn1TsxZ/iiyXoq23psHalNtB8AAASaElEQVR4nO1da5uiOBZWqiMhOdxEKK0W8QLClHZVz3Zvz+7szv7/n7UJCHKNqGB1z8P7oSxFQ15ycm45hNFowIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwJV43Xx0D3rGq0yWH92HXrHGkiTvP7oX10FZLjgCUzm9N7X4g6Vf8+VXLGEP3Id28G4YMo5B0HLM3gaIJO/rRsqXJfJdw7Ly8F7eAwNJnuM4HgYMyjhEgPlbRyKvla/akoR1ZY/I+vHdvAcA4XQdRW8WAneDcfidvdkuAVcHSkM42G73hPxiE3GB8ff39/ftdoElAIv9a2zXEliVL1IXXPY9Hct1U/QnhiID+s4IbpVQkryIc907IFeFVJFxwOiHQD6gl3fBJIDCQNcnR5BCjWFDJFmrfo/pJDbYAUI1x35ymIipGYwRSEyVMACW9cqXFMVn05ARBG/8AX28E8oCySQGf5HlpVH+hu5KnL8VMPq/2CxMYRsM6zX/W1WiPiA+yHyIJaiw/xuAuWrYXWgLpol+2REUgrlqJIi2W1sDQOuP7k0P4K6axg2mhiT0i9n6MuztrPrhmqlYTvA9IBJO5+D0bRq/TKf99+p1393E2M3ViiGgIZY8bff2nTl1kJ3qoB6Sl6fOTt6IUK66VzeCHuaH6qd2yMYOgDvm52uZMpy/dXXyZli4M4aj0VttWKRLhCACi0ZDH3XXgxq0Z7id7ih/2e1mhZdx/FIzehmob07WdtPR2Wq+bd/f69Ge4U5VOadoPj+98D6/Jy/GfH5zVKuodcLdHa4Yw7nKxzBSY3Xyrqoxw6f4xVBXt7sq06hxfLtAnqEmHgfaZz/6Q06XBrLbQHG7qzF0vwomunn6LyDgNTBkdusXHcA8BASpqvbpe1DbfsT1ExBksPsMWrfzfs1FgkAG56OymI9haMiCEewZsyh6RF7DeMBl/IlhT1d/A10qQjTvVZn+DFitejT5N1oLY6K3xDlq22vxB1p1Ss54F2bTKXcg7eSlO9ymSxcywu2A5GV6BYNkoaxpWeHUk7RDnY3qTQw1IrVHtuwc/FPm+Gd1ySFGVGC4VbsyL8xaXC0UY/kKgpJ0y4olXSXhohDbxAYVXzrB+jqGeHHDOSJ12qwf7N37iF+F+Y6/y17iSHd36IDo6zVCykBuWQ0SSJYyjzNN9QyfVPWGs5VArxtDAFJdK7oL04STotiVF7qr6JXx+HproV9DkSw8kCd3cipBNLPL05eprhtSIDomKEO8rocaQJA2MhhN83KjRdCuorobYwtlb2awsOSZTdjzy+3j65cUovlT7UjRNsS3uWhifIO1KMPCcKHUimnfa2tADmq9O75VD5c6bKvzjrPA1MLoAsU9ka4tkZjW9/KUSRX2Zz7v2pOnIVwqmDNJi+XZ7Tbu/PZdYOyN3eXM3Pt75/H22AVywa5PZPAuUJyp8bWn3QrZrBtH3mYUA/FXdBkk8aXNGKpd5uGnl8W6FRQH6opc8tAIOOJzbRMduFW6jJ+YyuqmIUWCmjKXAgIC4YOKXaJDpohpg8q6HgZcdF0WgMN77Xi0Wl2+StFc3d15njoYEpuL4oCfOT+WuTbGrcx2PVjnWwTHu2Tpatex1fBBuhDxcz8cEZl44WahmXtDud41ez8c2oT/saO263xBhNl1kMXgrjiKUyDMZ2UGxLWOwWTvG73Mz52663rtUIalrQgRgrM29cXGlQAztzzJ5TDOAO4mmHAJ7rhLHcMCbyzEaMmMImUYUcVf7/XgaLkOkIwqkWXsbhY6k2D7hrCuf+hI9oUMaYDRK03fxLAVw99PtOUm9NgMPeXwkslqLTUuwb2uUl8JQ0YTKmTIy7Cr3+BMx2NFYVT1heUiWT5NVj6s4DlMMen7159BgqkD1kg4iD7BgeAa0NO4+myyBpvQ8eA8WbkIOxaT4LXxkDXPeiwx2EKGzGhuhKOcpzoaK8brfhIsrfA0WSHRwTK41oJL8A3m5k6YBK3FYuoyz+0aFCbrYhNKeQmWUWxu9AdOVgNjTczQAjCuoljkOh7bRmJuIM4DpRKMJcY1keCeKYYQihlq+IK6bUmVV0ZzCWbmxjubGy7BbLIudSbBPVUHBFgSDhHdI2S2mYitqdJxJsEOzpkbZm96KYmutwa5Tq3FyvQerszcGIkO5pMVJNJLVbuN8UJIwCaw7J5hkSoja7wuL6UUbkUIrtBejJgH2h/B3HkW2OlnIjLHTTwRLSBik9kN6AaHvRAc+RccN6pj8SXoimGn5ckFILHTQicdKlMBbBcfe2J4BCQ89auM9VqGdEw7ZK44N63MtsEEkVdRT20ZjjXHqbE7HN6UzjgaEup41TKDQRrGKIUHXk38MVXVp6cnNeqKoo/R1St6LcF9a+FEPAKpHKdTzi+m2PzDa8jTV9LfHc8Lfte14NwBJlXP9ETw6WnV8DM7enuL2gsxC7VRb/exsbZFjhtXppXjUcZQrb061FipT0yOWwsxOwvu7VZEBcSOm09QZaLmGNYay+3p+LxJiMtOBIthoL84KhQHuQauWsxLDA/p8VWdP7Q9qPPVtMhwgaXeCI40jEVei81UUVmZbsUMlSfRYSNRw7sCwyP2+mP4SoReC92AV55stpihcT5cI6arukNWX25pDHGAxAQIlZUpvYNhdvCQO2mPThuHBZ4gfKAmIuV0FV0JGQqFOJvDq1yjiocvrEnfhYkw9c2McSVdRQ/ieXg9Q9Sb08ZhyFV7kIMPFSmm05aa5qlqLlOG6i7XKOtCX05bDHHqm2fGGwfiDoZvZ4Z03fMmLgssiuOZwZTKHRUztLNpWmMPM4bTlKGtKCzC6XXzAVOYcWPKtBLmb9syrDYbFZ12hW8tYeg9b6akYFHKkCvT8gWwWzI8CBgaPCHu+z5nGGC53xUNYeqb+f2VEDLjUO+1ZUd3AoaKbUQngsoScK8ERwEWrU7w7YDKPT0IGWbGZCoawyjKGFp9b2rGVJnAcaOkOsQ7VcAwM5dqzcrWiaH6Y51j6IJrTnS+Wt4TQ1vCAseN1zKWP5qKxvDMsMYtTRjOP/+IYoaG4U+WDkjJ2hSR5VDz+5iSlij1zcJ8uclc1DMUjXD8yx+fP89jhoa5BASAkSxjiAsDAMtOza1I90JHNamKrMN6VZmKGb6lR7f1DBnBzyojaJghBkbM0sxXQ+ErNZPAlRHjvOzaeAhT3zyJUj66FTLMZLgmx8EYfuZYRdHeQmz0LNNOFlPHyUqNMXHZxzfd9SGCMPWtyBXPNHXMGhim/GsORuqPmOH3SAeGhT8qn5jS/YaNo9utl7MUpb4ViSnz4kepQay3FuuUYc1Viz4nOCwJkI1fn0+nezaO3TrjJpIFNQsbkBoMYj3DdJbWOG10GvP78ZnNQEFugY4D+bb7k5rArHpzzQLzTHFJEaXqUsywxmlTDskQOoBdQ5TjG+0B5C7XMsJqvulMR8flnGmqTIQM65y2acLQkbBli7Op1Pculmpfg0CQ+mZhfkWZRqIxTHMxVactShiGwAgK+fHTGh5cf39SI4Spbx9VlKnRgqG6Lh9QpjHDPwBc0VJCSpEX+XbmxymSIPWtsDC/3iA25LybnLYoYSiBJJyDGcW93KFLbuHm1De1KtdcEc3DJvrKW8zQkeS8vMz+NWs6Md+JuLMUlYaaU9/0CGVlOhYxTOmXnbYoZvgH4Pyi6+z359/PFGdf/1H4iQOkqwUNv6pNzgx5wrGkTA8tGJbG3WYEGUNPykejjOBLjuLX5+d/50/Dwu/OTEY1aZg/TznheDKI9Qzteqctihn+AShnehnBT58+ZRS/sXfP/xifx5TXDnblhW8EqW+/Ujt1Moj1DE8iXFo+pdOYoSflaulmv7984nhJKHKCjOKfuR/tu0sWi1LfFCqeeSQYQ3pyaYqfcj0znX7HOVlJCSajOPv6fHqTm4vxMnw3DLdNdSUMI6eyAGWIGK7qGBoxwwU+V+0mIppR/Jq9y81F2uGG2E5zxo0ugZQYbi8yLDtt8TScsnmVEfxyJsjwZ+7d85/ZVOSLDh0xXGC5aSIyZVpZgBIxPNQ5bfE0nEp5hfZbnuJL7t+XLxlDWrfh+W0QFJtSE1VWb1aXGJacNvuNM/yO8kZpVqBYS5DJD+4qmSpKfRvV6OpQa9STTu3UqtOmxAw1LOdrsGopvnzKEeRpos5S/sw3a/QWqzlTrkzVQ/23Y0VbYr/dcYYLKObtaigWRjA2xjW71t8GTZD6diVUjh+jp/muKULYzdVyqYkRj+ERoPjx7H8lii/PX4p+qi93tvQmqFmg7NpX1BBtruyi26gc4CYMLXBKX5399lKkWCLY5fLp2GtMfVMNi2veLyNlWK2q/nee4vN/ypGGcidDZb3OCqwt3JT65p7pnZW0TWM4/lYcw5ffux1D5jEQSMV80pz6Nu6+LSFhuKnMw69lVfNcoujftQRuyhJBUqqrBDULiiRIVbVCokuXJV06rhAsU+S3CK5vZ+iA87o/Ow01NWwpmHjdN4aZPSyIybc6k18QVB6c3r5SMwas8YQ3nN4z96FpIh5BfAPRRWQ+TW4+V0X0ZBFzFHkdwe1DOGKyx/NMabrHJBX3Mz2Plrth9jbEfulbodjza4NfmhfU+D7Q26ERIDLIqa5qTn13oEyT2CIEL2vmy8uZ1ct//8rHFt9ysQW+Ky98lBGSzzVlYWUNJoWPLtwidRFZfOifw6eMInfVzg5cjmCcI7qH4Wita7kGAowaHDHFg819yjSJ8U3ImZ2MYuyqZQ7c87fzr2jIVNxdDEt8mXWt34Vg7EIo3p7gEpiqYeBier6Isy/x9DtFE6dRfP4rp2deO35gku1JqHkHiQt7TFwCQYgw6yvljW48ilm4FFN8/is3G5gOh25X9UOAhr3cQLDP21XAhZwPp3gOlxjFvIjyIcQdPwSSecaTemwA6w2HrkOACg4gE9RcNDH739f83GWzsOuKt+a75Fh00dG5WK/zVnc2zjtpBZ+U6qTzx5Y9gqGBwGmxuBYvXHarSDkewXCkk2pRbh1B5m11f7PQQxiOjhjV3fNXJuh2vg3n6FEMRyFGmxYEL+0q1wDfNJuH/kEMxy5GlvDeNuo7Fzc/rIcR8gf3hU2dfRDDEX8Mq7NudgPp5NZiE0OG+LmLTTsYPIohi0VZTLNoGEZqWOTW3X5D5vjyuuqmmOtxDEcTDFjSlUpKklJ/gQB565ta9UkSbAW4YRAfyHBkWDIgabHOJV4pHSl75j2BHNy4xYJJkgIVAzXU4jyS4Wi0dwhgJB0n6yRDYux1iz/iklg3l9GkDH3UkKF7LEPGcQMk3n9IxsC31GKSS6Tax3i3RCqli59BShMok6MnZxtoye5yf195yU+kac6gyn6iB0Ggm2vlbjfUYIJPmCw0lXB8CMNuwRQYs/jWR1v8XmGYZrOm+lswFOLvzVDRLU+C+hr5deBIYOlXcPS1UJJCrU5c1oEL3lWNdYLxgsSPFQA5rHD0Q/m0I21bV0M5MgPHH9ssH8tEssZQ8NBNBhUXZY+4KK9ImjH1GMhtZa18Cae/wFLxgpnk2sa6wdjJzssTowWHZ59/QEarxIlReKRGIVu2zz8yBdzHjeIS5fsEkH8gQ/ExLqhF1OZCobXcfgk2wLWNdYP0ouPT+fM5PA2fZPckeOiiV5yOEzpdtpwPHKBiY/3stFeDhAV4enr1c4VWXvwR2Ux0Ccrs62HF38PhZJI0B5vsUMKdWBPda9lYR3CTKWafOsf64J92/KN+TJ457JRn9/jXLCqG4iW0WDhkJ+05StpYLCs4YI3ZMUXoc8ePPOITowmlKcPzbubJB/FSA9Vx8VjzVuf8J8B+7CVCWWwsvnmFTlBJWPpnSPaUhqlhKHYquceUmugKhnD+N/tF0rgTN7aPG7tnjf4aJBNnMaK6dkwoLbUTFskxvnDL9/fmHdTECBJWFv/fSv4PToeSBkjcWNJwj3sLFbBJzjyxx0aiHORsO3zlNIi+besoIX+pNTcZqTWl+0RKsxtfTg+Bc/yxPYmVDvS5L00eZqLjkBOetHlOAYTJtUahkxy7fLdVkAgnck9+Es4XChQbk3vd8SMH6kkF5E+8Lz3z6/JGo8bJHqbWPWdBK409zKkpOFNScU+jTcENaVNkphU8pEIl+hFf21hLXCwjWORpuEauXME2nNwhWIxbFCVYeRphoTE3Lyrd7SxkS5cW1wuy4xUW86Egwl6L1Xzc/ItcY0A6XDuzJdLYnQ8CkY9d+qTUbFlGIChGuKFOQfATc/0zPhBjwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDDgOvwfx5GzAyXL/h8AAAAASUVORK5CYII="/>
                        <h2 className="font-semibold text-2xl mt-8">Your Cart Is <span className="text-red-600">Emapty!</span></h2>
                        <p className="mt-2 opacity-80">Must add items on the cart before you proceed to checkout.</p>
                        <Link to="/">
                            <button className="bg-pink-600 px-8 py-2 text-[18px] rounded-4xl shadow mt-6 cursor-pointer font-medium
                            text-white border-2 hover:border-pink-600 hover:bg-white hover:text-pink-600 transition-all duration-300">Return To Shop</button>
                        </Link>
                    </div>    
                </div>
            }
        
        </div>
    )
}