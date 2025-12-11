import "../styles/products.css"
export default function WelcomeAdmin(){
    const user = JSON.parse(localStorage.getItem("user"))
    return(
        <div className="main-container ml-50 flex justify-center">
            <div className="flex flex-col gap-7 justify-center items-center">
                <h1 className="font-semibold text-3xl text-shadow-md text-shadow-gray-300">Welcome, <span className="text-green-500">Admin!</span></h1>
                <img src="https://thumbs.dreamstime.com/b/business-man-writing-welcome-city-backdorp-31349368.jpg" 
                className="w-130 rounded-2xl shadow-md shadow-gray-500"/>
                <p className="font-medium text-center lg:w-200 md:w-150  text-[17px] text-gray-600"><span className="text-xl text-gray-800">Hi</span>, <span className="font-serif text-[21px] text-shadow-md text-gray-800">{user.username}</span>
                <tr/>
                Welcome to admin dashboard! here you can view all products and users, and update their information whenever needed. You can also add new items or remove the ones you
                don't need anymore. Feel free to explore the tools and features we've provided.
                </p>
            </div>
        </div>
    )
}