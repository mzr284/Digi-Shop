export default function Rating({rate}){
    function Rating(rate) {
        const fullStar = Math.floor(rate);
        const halfStar = rate % 1;
        const emptyStar = 5 - fullStar - 1;
        const stars = [];
        
        for (let i = 0; i < fullStar; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid fa-star text-transparent bg-yellow-400 bg-clip-text text-xl"></i>);
        }
        if(fullStar != 5){
            if(!halfStar){
            stars.push(<i key={`empty-${5-fullStar}`} className="fa-solid fa-star text-transparent bg-gray-200 bg-clip-text text-xl"></i>);
            }else{
                if (halfStar < 0.2) {
                    stars.push(<i key="half" className="fa-solid fa-star bg-gradient-to-r from-yellow-400 from-20% to-gray-200 to-20% bg-clip-text text-transparent text-xl"></i>);
                } else{
                    if(halfStar < 0.4){
                        stars.push(<i key="half" className="fa-solid fa-star bg-gradient-to-r from-yellow-400 from-40% to-gray-200 to-40% bg-clip-text text-transparent text-xl"></i>);
                    } else{
                        if(halfStar < 0.7){
                            stars.push(<i key="half" className="fa-solid fa-star bg-gradient-to-r from-yellow-400 from-50% to-gray-200 to-50% bg-clip-text text-transparent text-xl"></i>)
                        } else{
                            if(halfStar < 1){
                                stars.push(<i key="half" className="fa-solid fa-star bg-gradient-to-r from-yellow-400 from-70% to-gray-200 to-70% bg-clip-text text-transparent text-xl"></i>)
                            }
                        }
                    }
                }
            }
        }
        for (let i = 0; i < emptyStar; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-solid fa-star text-transparent bg-clip-text bg-gray-200 text-xl"></i>);
        }
        return <div className="flex gap-0.5">{stars}</div>;
    }
    return(
        <div>
            {Rating(rate)}
        </div>
    )
}