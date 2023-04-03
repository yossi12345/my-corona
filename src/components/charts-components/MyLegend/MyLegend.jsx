import React from "react";
import getTranslation from "../../../../getTranslation";

function MyLegend(legendProps){
    return <>
        {legendProps.payload.map(({dataKey})=>{
            const translation=getTranslation(dataKey)
            return <span key={Math.random()} className="try">{translation}</span>
        })}
    </>
    
    
        

}
export default MyLegend