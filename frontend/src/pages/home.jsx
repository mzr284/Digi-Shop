import { useEffect, useRef } from "react"
import "../styles/homeResponsive.css"
import axios from "axios"
import { useState } from "react"
import RowProducts from "../components/rowProducts"
import { useContext } from "react"
import NotifContext from "../components/notifContext"
import Rating from "../components/rating"
import { useLocation } from "react-router-dom"

export default function Home(){
    let [products, setProducts] = useState([])
    let [productsApi, setProductsApi] = useState([])
    let { setNotifData } = useContext(NotifContext)
    const location = useLocation();
    const containerRef = useRef([])
    const containerRef2 = useRef([])
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
    const categoryScroll = (LorR) => {
        let left = 160;
        if(LorR === "L"){
            left *= -1;
        }
        if(containerRef2){
            containerRef2.current.scrollBy({
                top: 0,
                left: left,
                behavior: "smooth",
            })
        }
    }
    useEffect(()=>{
        const y = 0 - window.pageYOffset;
        window.scrollTo({
           top: y,
        })
    }, [])
    useEffect(() => {
        const getProductFromAPI = async()=>{
            try{
                const res = await axios.get("https://fakestoreapi.com/products")
                setProductsApi(res.data)
            } catch(err){
                console.log(err)
            }
        }
        getProductFromAPI();
    }, [])
    
    // const insertProductToDb = async() => {
        // for ( const item of productsApi){
            // const randomCount = parseInt(Math.random(0, 1) * 90) + 10
            // await axios.post("http://localhost:5000/add-product", {category: item.category, description: item.description, image: item.image, 
                // price: item.price, rating: item.rating.rate, votersCount: item.rating.count, title: item.title, count: randomCount
            // })
        // }
    // }
    // insertProductToDb();
    
    useEffect(() => {    
        const getProducts = async() =>{
            try{
                const res = await axios.get("http://localhost:5000/products")
                setProducts(res.data.products)
                localStorage.setItem("products", JSON.stringify(res.data.products))
            } catch(err){
                console.log(err)
            }
        }
        getProducts();
    }, [])
    useEffect(()=>{
        const hash = window.location.hash;
        if(hash){
            const id = hash.replace("#", "");
            setTimeout(()=>{
                const element = document.getElementById(id)
                const y = element.getBoundingClientRect().top + window.pageYOffset - 85;
                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                })
            }, 50)
        }
    }, [])
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
        <div className="main-container translate-y-25 mb-50 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col justify-center items-center gap-2 relative">
                <button className="left-right-scrollers hidden absolute left-2 top-1/2 -translate-y-1/2 transform hover:scale-80 transition-all cursor-pointer bg-pink-400 text-gray-800 p-2 rounded-full"
                 onClick={()=>categoryScroll("L")}><i className="fa-solid fa-arrow-left text-xl"></i></button>
                <div className="cat-container font-medium text-[18px] flex gap-15 w-5/6 justify-between text-center text-gray-600 overflow-x-hidden" ref={containerRef2}>
                    <div className="flex flex-col items-center gap-2">
                       <img className="max-w-25 min-w-20 rounded-full transform hover:scale-90 transition-transform duration-250 cursor-pointer shadow-md shadow-gray-400"
                        src="data:image/jpeg;base64,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"/>
                       <span>men's clothing</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <img className=" max-w-25 min-w-20 rounded-full transform hover:scale-90 transition-transform duration-250 cursor-pointer shadow-md shadow-gray-400"
                        src="https://media.columbia.com/i/columbia/2086711_429_f_om"/>
                       <span>women's clothing</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <img className="max-w-25 min-w-20 rounded-full transform hover:scale-90 transition-transform duration-250 cursor-pointer shadow-md shadow-gray-400"
                        src="https://m.media-amazon.com/images/I/61IvKMDjJ7L._AC_SY350_.jpg"/>
                       <span>jewelry</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <img className="max-w-25 min-w-20 rounded-full transform hover:scale-90 transition-transform duration-250 cursor-pointer shadow-md shadow-gray-300"
                        src="https://www.afcinternationalllc.com/wp-content/uploads/2016/07/AFC-Importing-Electronics-1-7-7-16.jpg"/>
                       <span>electronic</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <img className="max-w-25 min-w-20 rounded-full transform hover:scale-90 transition-transform duration-250 cursor-pointer shadow-md shadow-gray-400"
                        src="data:image/jpeg;base64,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"/>
                       <span>hand watch</span>
                    </div>
                </div>
                <button className="left-right-scrollers hidden absolute right-2 top-1/2 -translate-y-1/2 transform hover:scale-80 transition-all cursor-pointer bg-pink-400 text-gray-800 p-2 rounded-full"
                 onClick={()=>categoryScroll("R")}><i className="fa-solid fa-arrow-right text-xl"></i></button>
            </div>
            <div className="banner-container bg-[url(/src/assets/banner1.jpg)] w-full h-100 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="text-center">
                    <h1 style={{lineHeight: "1.7"}} className="banner-title font-bold text-5xl text-indigo-900 translate-x-80 -translate-y-20 w-150 text-shadow-2xs text-shadow-blue-400">Garments that fit you watches that always shine</h1>
                </div>
            </div>
            <div className="w-full px-3 flex flex-col gap-2">
                <RowProducts  products={products} category={"men's clothing"}/>
                <RowProducts products={products} category={"jewelery"}/>
                <RowProducts products={products} category={"women's clothing"}/>
                <div id="electronics" className="electronics px-10">
                    <div className="flex items-start pb-1 mb-1 w-2/19 border-b-2 border-pink-700 font-semibold text-[18px]"><h3>Electronics</h3></div>
                    <div className="products-tv flex gap-3 mt-5 overflow-hidden" ref={containerRef}>
                        {
                            products.map((product, idx) => (
                                product.category === "electronics" && (product.title != "WD 2TB Elements Portable External Hard Drive - USB 3.0 " &&
                                    product.title != "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive") ?
                                <div key={idx} className="flex flex-col gap-2 shadow py-0.5 pr-0.5 rounded-sm w-100 bg-pink-50">
                                    <div className=" flex items-center bg-white px-1.5 h-72 pt-2 w-100">
                                        <img className="" src={product.image}/>
                                    </div>
                                    <div className="bg-pink-50 flex flex-col pl-2 items-start justify-center w-9/10 gap-1 h-45">
                                        <div><span className="font-bold">Title : </span><span>{product.title}</span></div>
                                        <div><span className="font-bold">Price : </span><span className="text-pink-700 font-bold">{product.price}$</span></div>
                                        <div className="flex items-center gap-1"><span className="font-bold">Rating : </span><span>{product.rating}</span>
                                        <span className="ml-3"><Rating rate={product.rating}/></span></div>
                                        <button className="font-bold text-white bg-pink-600 px-1 rounded-sm shadow border-2 border-transparent cursor-pointer  
                                        hover:text-pink-600 hover:bg-white hover:border-pink-600 transition-all" onClick={() => AddToCart(product._id)}>Add to cart</button>
                                    </div>
                                </div> : ''
                            ))
                        }
                        <button className="absolute left-3 transform hover:scale-80 transition-all cursor-pointer translate-y-20 p-2 bg-pink-400 opacity-80 rounded-full" onClick={handlerScroll2}><i className="fa-solid fa-arrow-left text-xl"></i></button>
                        <button className="absolute right-7 transform hover:scale-80 transition-all cursor-pointer translate-y-20 bg-pink-400 p-2 rounded-full opacity-80" onClick={handlerScroll}><i className="fa-solid fa-arrow-right text-xl"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}