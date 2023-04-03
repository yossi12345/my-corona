import React from "react"
import sun from "./sun.png"
import "./ChangeDarknessButton.scss"
function ChangeDarknessButton(){
    return (
        <button className="change-darkness-button">
            <img src={sun} alt="BigCo Inc. sun"/>
        </button>
    )
}
export default ChangeDarknessButton;