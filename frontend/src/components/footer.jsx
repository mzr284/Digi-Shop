import "../styles/footer.css"
export default function Footer(){
    return(
        <div className="flex flex-col bg-black top-full p-10 pt-5">
            <div className="footer flex flex-wrap justify-between items-start gap-8 border-1 border-b-gray-100 pb-10">
                <div className="flex flex-col items-center">
                    <img className="mt-2 w-23 mb-2 rounded-2xl" src="data:image/png;base64,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"/>
                    <h2 className="text-white font-bold">Digi Shop</h2>
                </div>
                <ul className="flex flex-col gap-1">
                    <h3 className="font-bold mb-4 text-white border-b-1 border-pink-500 pb-1">Pages</h3>
                    <li className="text-gray-200">page 1</li>
                    <li className="text-gray-200">page 2</li>
                    <li className="text-gray-200">page 3</li>
                </ul>
                <ul className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-white mb-4  border-b-1 border-pink-500 pb-1">Contact ways</h3>
                    <li className="text-white"><i className="text-pink-400 mr-3 fa fa-envelope text-xl"></i><span className="font-medium mr-2">Email: </span>@mhmdzrat@gmial.com</li>
                    <li className="text-white"><i className="text-pink-400 mr-3 fa fa-phone-flip"></i><span className="font-medium mr-2">Phone: </span>09150558097</li>
                    <li className="text-white"><i className="text-pink-400 mr-3 fa fa-street-view"></i><span className="font-medium mr-2">Adress: </span>Tehran - Vali-e-Asr street</li>
                </ul>
                <ul className="flex flex-col gap-1.5">
                    <h3 className="text-white font-bold border-b-1 border-pink-500 pb-1 mb-4">Social media</h3>
                    <li className="text-white"><i className="fa-brands fa-telegram mr-3 text-xl text-pink-400"></i><span className="font-medium">Telegram</span></li>
                    <li className="text-white"><i className="fa-brands fa-linkedin mr-3 text-xl text-pink-400"></i><span className="font-medium">Linkedin</span></li>
                    <li className="text-white"><i className="fa-brands fa-facebook mr-3 text-xl text-pink-400"></i><span className="font-medium">Facebook</span></li>
                </ul>
            </div>
            <div className="text-white pt-7 w-full">
                <h3 className="text-center mb-5 font-bold text-[18px]">Language</h3>
                <ul className="flex gap-8 items-center justify-center">
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa fa-database"></i></li>
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa-brands fa-html5"></i></li>
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa-brands fa-github"></i></li>
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa-brands fa-react"></i></li>
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa-brands fa-node-js"></i></li>
                    <li><i className="text-3xl transition-all hover:text-pink-500 fa-brands fa-css3-alt"></i></li>
                </ul>
                <p className="text-center mt-3 text-sm">Hope you have good programming</p>
            </div>
        </div>
    )
}