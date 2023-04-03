import React from "react";
import "./MenuButton.scss"
function menuButton(props){
    return ( 
    <button
        className={"menu-button"+(props.shouldMenuOpen?" clicked":"")}
        onClick={()=>{
            const shouldMenuOpenCopy=props.shouldMenuOpen
            props.setShouldMenuOpen(!shouldMenuOpenCopy)
        }}
        >
        <div></div>
        <div></div>
        <div></div>
    </button>
    )
}
export default menuButton;