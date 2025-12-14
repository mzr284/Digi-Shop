import dayjs from "dayjs"

export default function ConfirmPayment({user, order, setConfirmPayment}){
  
    if(order){
    const date = new Date(order.date);
    return(
    <div className="backdrop-2 fixed h-full w-full inset-0 z-1000">
        <div className="absolute top-1/7  right-1/2 translate-x-1/2 bg-white px-4 py-4 rounded-md">
            <div className="flex flex-col items-center mb-5">
                <div className="p-7 bg-green-100 rounded-full shadow-md shadow-green-100">
                    <i className="checked-logo fa fa-check bg-green-600 text-white rounded-full text-4xl p-5"></i>
                </div>
                <h3 className="mt-4 font-medium text-2xl text-gray-800">Payment Successfull</h3>
                <p className="text-gray-700">Successfully paid ${order.price}</p>
            </div>
            <div className="w-70">
                <h3 className="-translate-x-1 font-semibold mb-2">Payment methods</h3>
                <div className="border border-gray-300 bg-gray-50 rounded-[10px] flex flex-col py-4 px-2 gap-3">
                    <div className="flex justify-between">
                        <span className="text-gray-700">Buyer</span>
                        <span className="font-medium text-gray-900">{user.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Order ID</span>
                        <span className="font-medium text-[15px] text-gray-900">312jkhjkhk121231</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Price</span>
                        <span className="font-medium text-[15px] text-gray-900">${order.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Date</span>
                        <span className="font-medium text-[15px] text-gray-900">{dayjs(date).format("YYYY/MM/DD HH:mm")}</span>
                    </div>
                    <div className="flex justify-between items-center -translate-y-1">
                        <span className="text-gray-700">Status</span>
                        <div className="font-medium px-2 pt-0.5 pb-1 bg-gray-200 rounded-full">
                            <i className="fa fa-check p-0.5 text-[12px] border rounded-full text-green-800 -translate-y-0.5"></i>
                            <span className="ml-1 text-green-800">Success</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="mt-3 w-full py-1 rounded-full border border-transparent text-xl font-semibold bg-green-800 text-shadow-xs text-shadow-green-400
            text-white cursor-pointer shadow transition-all hover:bg-white hover:text-green-700 hover:shadow-green-400" onClick={()=>setConfirmPayment(false)}>OK</button>
        </div>
    </div>
    )
    }
}