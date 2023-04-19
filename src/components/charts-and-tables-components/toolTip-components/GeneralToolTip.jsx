import React from "react";
//import getTranslation from "../../../getTranslation";
import "./toolTip.scss"
function MyToolTip({active,payload,label,translations}){
    const daysTranslation=["א","ב","ג","ד","ה","ו","ש"]
    if (!active||!payload)
        return null
    return (
        <div className="chart-tooltip">
            <h4>
                {
                    "יום "+daysTranslation[label.getDay()]+"' "+
                    label.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"2-digit"}).replace(/\//g,".")
                }
            </h4>
            {payload.map(({dataKey,value,fill})=>(
                <div key={Math.random()} className="entry-container">
                    <div style={{backgroundColor:fill}} className="entry-circle"></div>
                    <span className="number">{value}</span>
                    {translations[dataKey]}
                </div>
            ))}
        </div>
    )
}
export default MyToolTip


// "יום "+days[label.getDay()]+"' "+
// (label.getDate())+"."+
// (((label.getMonth()+1)<10?"0":"")+(label.getMonth()+1))+"."+
// (label.getFullYear()-2000)