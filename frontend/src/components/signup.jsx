export default function Signup(){
    return(
        <div className="h-full w-full flex flex-col items-center justify-center bg-white text-center px-3 py-5 gap-5 rounded-r-2xl">
            <h1 className="font-semibold text-3xl text-gray-800">Sign up</h1>
            <ul className="flex gap-2">
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-google"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-linkedin"></i></li>
                <li><i className="rounded-full p-3 border hover:border-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer text-2xl fa-brands fa-github"></i></li>
            </ul>
            <p className="text-sm text-[16px]">Or use your info for sign up</p>
            <form className="flex flex-col gap-3 w-full px-2">
                <input className="bg-gray-200 p-2 rounded-[10px]" placeholder="username"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" placeholder="E-mail"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" placeholder="password"/>
                <input className="bg-gray-200 p-2 rounded-[10px]" placeholder="confrim password"/>
            </form>
            <button className="text-white border-2 bg-pink-600 rounded-[10px] py-2 px-10 shadow
            cursor-pointer font-semibold hover:border-pink-600 hover:text-pink-600 hover:bg-white transition">Sign up</button>
        </div>
    )
}