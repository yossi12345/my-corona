import React, { useState } from "react";
import "./ShareButton.scss"
import {BiShareAlt} from "react-icons/bi";
import {BsArrowDownShort} from "react-icons/bs"
function ShareButton(){
    const [shouldMenuOpen,setShouldMenuOpen]=useState(false)
    return (
        <div onClick={()=>{
                const shouldMenuOpenCopy=shouldMenuOpen
                setShouldMenuOpen(!shouldMenuOpenCopy)
            }}>
            <button className="share-button">
                <div></div>
                <div></div>
                <div></div>
            </button>
           {shouldMenuOpen&&<div className="share-button-menu"
                onMouseLeave={()=>{
                    setShouldMenuOpen(false)
                }}>
                <div> 
                    <div className="icon-container">
                        <BiShareAlt size="13"/>
                    </div>
                    שיתוף
                </div>
                <div>
                    <div className="icon-container">
                        <BsArrowDownShort size="20"/>
                    </div>
                    הורדה
                </div>
            </div>}
        </div>
    )
}
export default ShareButton