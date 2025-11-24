import axios from "axios"
import { useEffect, useState } from "react"
import "../styles/products.css"

export default function AdminProducts(){
    const [ products, setProducts ] = useState([])
    const shortTitle = (title, limit) => {
        return title.length > limit ? title.slice(0, limit) + " ..." : title
    }
    useEffect(() => {
        const getProducts = async() => {
            try{
                const res = await axios.get("http://localhost:5000/products")
                setProducts(res.data.products)
            } catch(err){
                console.log(err.response)
            }
        }
        getProducts()
    }, [])
    return(
        <div className="translate-y-12">
            <div>
                <div className="w-full flex justify-end bg-gradient-to-r from-pink-500 to-pink-700 pr-2 py-1 rounded-t-xl">
                    <div className="flex w-5/6 justify-between text-white font-semibold text-[17px]">
                        <span>category</span>
                        <span>title</span>
                        <span className="translate-x-19">price</span>
                        <span>rating</span>
                    </div>
                </div>
                <div className="table-items flex flex-col text-start h-161 overflow-auto">
                    {
                        products.map((product, key) => (
                            <div key={key} className="flex items-center gap-10 bg-gray-100 px-2 py-1 justify-between hover:bg-gray-600 group
                            hover:text-white transition-all cursor-pointer hover:rounded-xl">
                                <div className="w-15 group-hover:bg-gray-200 transition p-1 rounded">
                                    <img  src={product.image}/>
                                </div>
                                <span className="w-30 text-[14px] opacity-80">{product.category}</span>
                                <span className="w-50 font-medium">{shortTitle(product.title, 20)}</span>
                                <span className="w-10 font-medium -translate-x-4">${product.price}</span>
                                <span className="font-semibold">{product.rating}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}