import "./TableSquareWithBar.scss"
function TableSquareWithBar(props){
    return (
        <div className={props.squareClass}>
           {props.showBar&&<div className="bar-container">
                <div className="fill" style={{
                        backgroundColor:props.fillColor, 
                        width:(props.percentage>=100?"100":props.percentage)+"%"
                    }}>
                </div>
                <div className="unfill" style={{
                    backgroundColor:props.unfillColor,
                    width:props.percentage>=100?"0":((100-props.percentage)+"%")
                }}>
                </div>
            </div>}
            {props.showBar?(props.percentage+"%"):props.contentWithoutBar}
        </div>
    )
}
export default TableSquareWithBar