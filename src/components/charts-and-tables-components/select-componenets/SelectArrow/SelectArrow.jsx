import "./SelectArrow.scss"
function SelectArrow({isUpsideDown}){
    return <div className={"select-arrow"+(isUpsideDown?" select-arrow-rotate":"")}></div>
}
export default SelectArrow