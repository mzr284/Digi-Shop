import axios from "axios";
import { useContext, useRef } from "react";
import NotifContext from "./notifContext";

export default function RowProducts({products, category}){
    const containerRef = useRef([])
    const { setNotifData } = useContext(NotifContext)
    const handlerScroll = () => {
        if(containerRef.current) {
            containerRef.current.scrollBy({
                top: 0,
                left: 350,
                behavior: "smooth"
            });
        }
    }
    const handlerScroll2 = () => {
        if(containerRef.current) {
            containerRef.current.scrollBy({
                top: 0,
                left: -350,
                behavior: "smooth"
            });
        }
    }
    function Rating({ rate }) {    /////     For Create Stars based on rates
        const fullStar = Math.floor(rate);
        const halfStar = rate % 1 >= 0.5 ? 1 : 0;
        const emptyStar = 5 - fullStar - halfStar;
    
        const stars = [];
    
        for (let i = 0; i < fullStar; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid fa-star text-transparent bg-yellow-400 bg-clip-text"></i>);
        }
        if (halfStar) {
            stars.push(<i key="half" className="fa-solid fa-star bg-gradient-to-r from-yellow-400 from-50% to-gray-200 to-50% bg-clip-text text-transparent"></i>);
        }
        for (let i = 0; i < emptyStar; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-solid fa-star text-transparent bg-clip-text bg-gray-200"></i>);
        }
        return <div className="flex gap-0.5">{stars}</div>;
    }
    const AddToCart = async(productId)=>{
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(!user){
                setNotifData({status: 'active', code: 400, msg:  "Add to cart failed!", description: "Please Sign in before add to your cart."})
                setTimeout(()=>{
                    setNotifData({status: 'un-active', code: null, msg: null, description: null})
                }, 2000)
                return
            }
            const userId = user._id
            const res = await axios.post("http://localhost:5000/add-cart", {productId, userId})
            setNotifData({status: 'active', code: res.status, msg: res.data.msg, description: res.data.description})
            user.cart.push({ product: productId, count: 1})
            localStorage.setItem("user", JSON.stringify(user))
        } catch(err){
            setNotifData({status: 'active', code: 400, msg: err.response.data.msg, description: err.response.data.description})
        }
        setTimeout(()=>{
            setNotifData({status: 'un-active', code: null, msg: null, description: null})
        }, 2000)
    }
    return(
        <div className="px-10">
            <div className="flex items-start pb-1 mb-1 w-2/19 border-b-2 border-pink-700 font-semibold text-[18px]"><h3>{category}</h3></div>
            <div className="products flex gap-3 mt-5 overflow-hidden" ref={containerRef}>
                {
                    products.map((product, idx) => (
                        product.category === category ?
                        <div key={idx} className="flex h-56 gap-2 shadow py-0.5 pr-0.5 rounded-sm w-80 bg-pink-50">
                            <div className="h-55 w-30 ml-0.5 flex items-center bg-white px-1.5 ">
                                <img className="w-30" src={product.image}/>
                            </div>
                            <div className="bg-pink-50 flex flex-col pl-2 items-start justify-center w-45 gap-1">
                                <div><span className="font-bold">Title : </span><span>{product.title}</span></div>
                                <div><span className="font-bold">Price : </span><span className="text-pink-700 font-semibold">{product.price}$</span></div>
                                <div className="flex flex-col gap-0.5"><div><span className="font-bold">Rating : </span><span>{product.rating}</span></div>
                                <Rating rate={product.rating}/></div>
                                <button className="font-bold text-white bg-pink-600 px-1 rounded-sm shadow border-2 mt-1 border-transparent cursor-pointer
                                 hover:text-pink-600 hover:bg-white hover:border-pink-600 transition-all" onClick={() => AddToCart(product._id)}>Add to cart</button>
                            </div>
                        </div> : ''
                    ))
                }
                <button className="absolute left-3 transform hover:scale-80 transition-all cursor-pointer translate-y-20 p-2 bg-pink-400 opacity-80 rounded-full" onClick={handlerScroll2}><i className="fa-solid fa-arrow-left text-xl"></i></button>
                <button className="absolute right-7 transform hover:scale-80 transition-all cursor-pointer translate-y-20 bg-pink-400 p-2 rounded-full opacity-80" onClick={handlerScroll}><i className="fa-solid fa-arrow-right text-xl"></i></button>
            </div>
        </div>
    )
}