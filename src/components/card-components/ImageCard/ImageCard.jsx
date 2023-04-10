import "./ImageCard.scss"
function ImageCard(props){
    return (
        <div className="image-card">
            <a>
                <img src={props.imgSrc} alt=""/>
                <div>
                    <div className="image-card-title">{props.title}</div>
                    <div className="image-card-explanation-and-link-container">
                        <div>{props.explanation}</div>
                        <div>{props.link}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}
export default ImageCard;