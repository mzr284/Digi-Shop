import "../styles/homeResponsive.css"
export default function Home(){
    return(
        <div className="main-container translate-y-35 mb-50 flex items-center">
            <div className="banner-container bg-[url(/src/assets/banner1.jpg)] w-full h-100 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="text-center">
                    <h1 style={{lineHeight: "1.7"}} className="banner-title font-bold text-5xl text-indigo-900 translate-x-80 -translate-y-20 w-150">Garments that fit you watches that always shine</h1>
                </div>
            </div>
        </div>
    )
}