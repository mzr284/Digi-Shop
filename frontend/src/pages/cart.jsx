import axios from "axios"
import { useContext, useEffect, useState } from "react"
import NotifContext from "../components/notifContext"

export default function Cart(){
    let [cartProductObj, setCartProductObj] = useState([])
    let {setNotifData} = useContext(NotifContext)
    const user = JSON.parse(localStorage.getItem('user'))
    const [inputs, setInputs] = useState({})
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
        cartProductObj.forEach((product) => {
            inputs[product._id] = product.count;
        })
        setInputs(inputs)
    }, [cartProductObj])
    const changeCount = async(userId, itemId, amount)=>{
        console.log(userId, itemId, amount)
        try{
            const res = await axios.patch(`http://localhost:5000/change-count/${userId}/${itemId}`, {amount: amount})
            console.log(res.data)
        } catch(err){
            console.log(err)
        }
    }
    const increase = (id) => {
        changeCount(user._id, id, 1)
        setInputs(prev => ({
            ...prev,
            [id]: (prev[id]) + 1
        }))
    }
    const decrease = (id) => {
        if(inputs[id] != 1){
            changeCount(user._id, id, -1)
            setInputs(prev => ({
                ...prev,
                [id]: prev[id] - 1
            }))
        }
    }
    const RemoveItem = async(itemId) => {
        try{
            const res = await axios.patch(`http://localhost:5000/remove-item/${user._id}/${itemId}`)
            setNotifData({status: 'active', code: res.status, msg: res.data.msg, description: res.data.description})
        } catch(err){
            setNotifData({status: 'active', code: err.response.status, msg: err.response.data.msg, description: err.response.data.description})
        }
        setTimeout(()=>{
            setNotifData({status: 'un-active', code: null, msg: null, description: null})
        }, 2000)
    }
    return(
        <div className="translate-y-20 mb-23 flex flex-col gap-4 items-center">
            <div className="flex items-center gap-1"><i className="fa fa-bag-shopping text-xl"></i><h1 className="font-medium
            text-xl">My Cart</h1></div>
            <div>
                <div className="flex flex-col gap-5">
                    {
                        cartProductObj.map((item, idx) => (
                            <div key={idx} className="flex gap-3 border-b border-b-gray-400 p-2">
                                <img className="w-25" src={item.product.image}/>
                                <div className="flex gap-10 mt-2">
                                    <h3 className="w-50 font-medium">{item.product.title}</h3>
                                    <div className="flex flex-col items-center">
                                        <span>Each</span>
                                        <span className="font-bold">${item.product.price}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <h3>Quantity</h3>
                                        <div className="border border-gray-400 w-25 flex items-center">
                                            <i className="fa fa-plus px-1 cursor-pointer" onClick={() => increase(item._id)}></i>
                                            <input className="text-center w-full border-l border-r border-l-gray-400 border-r-gray-400" value={inputs[item._id]}/>
                                            <i className="fa fa-minus px-1 cursor-pointer" onClick={() => decrease(item._id)}></i>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span>Total</span>
                                        <span className="font-bold">${inputs[item._id] * item.product.price}</span>
                                        <i className="fa fa-trash mt-10 cursor-pointer" onClick={() => RemoveItem(item._id)}></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}