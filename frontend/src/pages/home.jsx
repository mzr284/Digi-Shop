import { useEffect } from "react"
import "../styles/homeResponsive.css"
import axios from "axios"
import { useState } from "react"

export default function Home(){
    let [products, setProducts] = useState([])
    useEffect(() => {
        const getProductData = async() => {
            try{
                const res = await axios.get("https://fakestoreapi.com/products")
                setProducts(res.data)
            } catch(err){
                console.log(err)
            }
        }
        getProductData();
    }, [])

    //////////////  For Get Products From API

    // const addProdcts = async()=> {
    //     for(const product of products){
    //         const res = await axios.post("http://localhost:5000/add-product", {category: product.category, description: product.description, image: product.image, price: product.price, 
    //             rating: product.rating.rate, title: product.title
    //         })
    //         console.log(res.data)
    //         console.log(1)
    //     }
    // }
    // addProdcts();
    
    return(
        <div className="main-container translate-y-35 mb-50 flex items-center">
            <div>

            </div>
            <div className="banner-container bg-[url(/src/assets/banner1.jpg)] w-full h-100 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="text-center">
                    <h1 style={{lineHeight: "1.7"}} className="banner-title font-bold text-5xl text-indigo-900 translate-x-80 -translate-y-20 w-150">Garments that fit you watches that always shine</h1>
                </div>
            </div>
        </div>
    )
}