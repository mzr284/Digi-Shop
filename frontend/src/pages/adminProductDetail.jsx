import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/detail-product.css"
import NotifContext from "../components/notifContext"
import Rating from "../components/rating"

export default function AdminProductDetail(){
    const { setNotifData } = useContext(NotifContext)
    const { productId } = useParams()
    const [product, setProduct] = useState('')
    const [ title, setTitle ] = useState('')
    const [ title2, setTitle2 ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ description2, setDescription2 ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ price2, setPrice2 ] = useState('')
    const [ stock, setStock ] = useState('')
    const [ stock2, setStock2 ] = useState('')
    const [ rating, setRating ] = useState('')
    const [ voters, setVoters ] = useState('')
    const [category, setCategory] = useState('')
    const [category2, setCategory2] = useState('')
    const [ open, setOpen ] = useState(false)
    const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]
    
    useEffect(() => {
        const getProduct = async() => {
            try{
                const res = await axios.get(`http://localhost:5000/product/${productId}`)
                setProduct(res.data.product); setVoters(res.data.product.votersCount)
                setTitle(res.data.product.title); setTitle2(res.data.product.title); setPrice(res.data.product.price); setPrice2(res.data.product.price)
                setDescription(res.data.product.description); setDescription2(res.data.product.description); setStock(res.data.product.count); setStock2(res.data.product.count)
                setCategory(res.data.product.category); setCategory2(res.data.product.category)
            }catch(err){
                console.log(err.response)
            }
        }
        getProduct();
    }, [])
    const chooseCategory = (cat) => {
        setOpen(false)
        setCategory2(cat)
    }
    const UpdateProduct = async() => {
        let requestBody = {};
        if(title != title2){
            requestBody["title"] = title2;
        }
        if(description != description2){
            requestBody["description"] = description2;
        }
        if(price!= price2){
            requestBody["price"] = price2;
        }
        if(stock != stock2){
            requestBody["count"] = stock2;
        }
        if(category != category2){
            requestBody["category"] = category2;
        }
        if(Object.keys(requestBody).length === 0){
            setNotifData({status: "active", code: 400, msg: "Update Not Done!", description: "You not exchanged any fields in this products"})
        } else{
            try{
            const res = await  axios.patch(`http://localhost:5000/update-product/${product._id}`, requestBody)
            setNotifData({status: "active", code: res.status, msg: res.data.message, description: res.data.description})
        } catch(err){
            setNotifData({status: "active", code: err.response.status, msg: err.response.data.message, description: err.response.data.description})
        }
        }
        setTimeout(() => {
            setNotifData({status: "un-active"})
        }, 3300)
    }
    const ResetInformation = () => {
        setTitle2(title); setDescription2(description); setStock2(stock);
        setPrice2(price); setCategory2(category)
        setNotifData({status: "active", code: 200, msg: "Datas Reseted Successfully!"})
        setTimeout(() => {
            setNotifData({status: "un-active"})
        }, 2000);
    }
    return(
        <div className="main-container ml-60 flex justify-center px-2">
            <div className="px-3 w-full">
                <div className="w-full flex justify-end">
                    <button onClick={ResetInformation} className="cursor-pointer bg-pink-600 text-white px-3.5 py-1 shadow rounded-xl flex items-center gap-2
                    border-2 transition hover:border-pink-500 hover:bg-white hover:text-pink-500">
                        <i className="fa fa-undo text-xl"></i>
                        <span className="font-bold">Reset</span>
                    </button>
                    <button onClick={UpdateProduct} className="cursor-pointer bg-pink-600 text-white px-3.5 py-1 shadow rounded-xl flex items-center gap-2
                    border-2 transition hover:border-pink-500 hover:bg-white hover:text-pink-500 ml-1">
                        <i className="fa fa-save text-2xl"></i>
                        <span className="text-[16px] font-medium">Save</span>
                    </button>
                </div>
                <h1 className="font-medium text-[20px] mb-2 -translate-y-2"><i className="fa fa-bag-shopping mr-2 text-pink-600"></i>Show & Update Product</h1>
                <div className="details-container flex w-full justify-between gap-5">
                    <div className="flex flex-col gap-4 rounded-2xl">
                        <div className="flex flex-col gap-5 bg-gray-100 px-3 pt-3 pb-6 rounded-2xl">
                            <h3 className="font-bold text-[17px]">General Information</h3>
                            <div className="flex flex-col">
                                <span className="font-medium mb-2">title product</span>
                                <input value={title2} onChange={e => setTitle2(e.target.value)} className="bg-gray-200 px-3 py-2 rounded-[10px] w-130 shadow"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-medium">Description product</span>
                                <textarea value={description2} onChange={e => setDescription2(e.target.value)} className="px-3 py-2 bg-gray-200
                                 rounded-[10px] resize-none overflow-hidden min-h-37 shadow"
                                onInput={ e => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-bold text-[17px]">Rating (vouters) :</h3>
                                <div className="flex items-center gap-3">
                                    <Rating rate={product.rating}/> <span className="font-semibold -translate-y-0.5">({product.votersCount})</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 bg-gray-100 rounded-2xl px-2 pt-3 pb-5">
                            <h3 className="font-bold">Pricing and Stock</h3>
                            <div className="flex flex-wrap gap-8">  
                                <div className="flex flex-col gap-2 w-4/9">
                                    <span className="font-medium"><i className="fa fa-sack-dollar mr-1.5 text-[18px] text-pink-600"></i>Based Price :</span>
                                    <div className="flex items-center">
                                        <i className="absolute translate-x-1 text-[18px] font-bold">$</i><input value={price2} type="number" onChange={e => setPrice2(e.target.value ? parseFloat(e.target.value) : 0)} className="price-input bg-gray-200 rounded-xl pl-6 pr-2 py-2 font-medium text-[18px] shadow"/>
                                        <div className="flex flex-col gap-0.5 -translate-x-6">
                                            <i className="fa fa-chevron-up cursor-pointer" onClick={()=>setPrice2(price2+1)}></i>
                                            <i className="fa fa-chevron-down cursor-pointer" onClick={()=>setPrice2(price2-1)}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-4/9">
                                    <span className="font-medium"><i className="fa fa-boxes-stacked mr-1.5 text-pink-600 text-[18px]"></i>Stock :</span>
                                    <div className="flex items-center">
                                        <input value={stock2} type="number" onChange={e => setStock2(e.target.value ? parseInt(e.target.value) : 0)} className="bg-gray-200 rounded-xl px-3 py-2 font-medium text-[18px] shadow"/>
                                        <div className="flex flex-col gap-0.5 -translate-x-6">
                                            <i className="fa fa-chevron-up cursor-pointer" onClick={()=>setStock2(stock2+1)}></i>
                                            <i className="fa fa-chevron-down cursor-pointer" onClick={()=>setStock2(stock2-1)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>      
                        </div>
                    </div>
    
                    <div className="image-container flex flex-col gap-3">
                        <div className="gap-2 bg-gray-100 pb-7 rounded-2xl px-3 py-2">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-bold">Image</h3>
                                <img src={product.image} className="w-50 bg-gray-200 p-2 rounded-xl"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 bg-gray-100 rounded-2xl px-3 py-2 pb-4">
                            <h3 className="font-bold mb-2"><i className="fa fa-tag text-[18px] text-pink-600 mr-1.5"></i>Category</h3>
                            <div>
                                <h5 className="font-medium">Product Category</h5>
                                <div className="flex mt-1 px-4 py-1.5 rounded-xl bg-gray-200 shadow justify-between items-center">
                                    <span className="font-medium">{category2}</span>
                                    {open ?
                                    <i className="fa fa-chevron-up cursor-pointer text-pink-600" onClick={()=>setOpen(false)}></i>
                                    :
                                    <i className="fa fa-chevron-down cursor-pointer text-pink-600" onClick={()=>setOpen(true)}></i>
                                    }
                                </div>
                                {
                                    open ?
                                    <div className="absolute flex flex-col gap-2 bg-gray-50 rounded-[10px] px-2 py-2 translate-y-3 translate-x-8 border border-gray-300">
                                        {
                                            categories.map((cat, idx) => (
                                                <div key={idx} className="cursor-pointer px-3 font-medium text-[17px] border border-transparent
                                                transition hover:bg-gray-600 hover:text-white rounded-[10px] py-0.5 hover:border-b-gray-400"
                                                onClick={()=>chooseCategory(cat)}>
                                                    {cat}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : 
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}