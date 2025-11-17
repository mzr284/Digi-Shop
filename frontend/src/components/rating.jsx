export default function Rating({rate}){
    let star = []
    while(rate-1 > 0){
        star.push(100)
        rate --;
    }
    star.push(parseInt(rate * 100))
    while(star.length < 5){
        star.push(0)
    }
    console.log(star)
    return(
        <div className="flex gap-0.5">
            {
                star.map((st, idx) => (
                    <i key={idx} className={`fa-solid fa-star bg-gradient-to-r text-transparent bg-clip-text
                    from-yellow-400 from-${st}% to-gray-200 to-${st}%`}></i>
                ))    
            }
        </div>
    )
}