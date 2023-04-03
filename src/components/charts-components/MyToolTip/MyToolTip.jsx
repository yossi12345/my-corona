import React from "react";
import getTranslation from "../../../getTranslation";
import "./MyToolTip.scss"
function MyToolTip({active,payload,label}){
    const daysTranslation=["א","ב","ג","ד","ה","ו","ש"]
    if (!active||!payload)
        return null
    const entries=[]
    for (let i=0;i<payload.length;i++){
        if (payload[i].className!=="none"){
            entries.push({
                keyOption:payload[i].dataKey,
                amount:payload[i].value,
                color:payload[i].fill
            })
        }
    }
    if (entries.length===0)
        return null
    return (
        <div className="chart-tooltip">
            <h4>
                {
                    "יום "+daysTranslation[label.getDay()]+"' "+
                    ((label.getDate()<10?"0":"")+label.getDate())+"."+
                    (((label.getMonth()+1)<10?"0":"")+(label.getMonth()+1))+"."+
                    (label.getFullYear()-2000)
                }
            </h4>
            {entries.map((entry)=>(
                <div key={Math.random()} className="entry-container">
                    <div style={{backgroundColor:entry.color}} className="entry-circle"></div>
                    <span className="number">{entry.amount}</span>
                    {getTranslation(entry.keyOption)}
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