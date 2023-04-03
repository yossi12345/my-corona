import React, {useState } from "react";
import "./TitleAndDescriptionOfCard.scss"
function TitleAndDescriptionOfCard(props){
    const [shouldDescriptionOpen,setShouldDescriptionOpen]=useState(false)
    return (
        <div className="title-and-description-container">
            <h3>{props.title}</h3>
            <div
                onMouseEnter={()=>{
                   setShouldDescriptionOpen(true)
                }}
                onMouseLeave={()=>{
                    setShouldDescriptionOpen(false)
                }}>
                <div className="i-sign">i</div>
              {shouldDescriptionOpen&&<div className="description-container-container">
                    <div>
                        {props.description}
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default TitleAndDescriptionOfCard;