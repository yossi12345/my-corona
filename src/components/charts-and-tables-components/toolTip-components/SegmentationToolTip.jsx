//import getTranslation from "../../../getTranslation"
import "./toolTip.scss"
function SegmentationTooltip({label,active,payload,total,translations}){
    if (!active||!payload)
        return null
    
    return (
        <div className="chart-tooltip">
            <h4>
                {label}
            </h4>
            {payload.map(({dataKey,value,fill})=>{
                const positiveValue=Math.abs(value)
                const absoluteAmount=(positiveValue*total)/100
                return (
                    <div key={Math.random()} className="entry-container">
                        <div style={{backgroundColor:fill}} className="entry-circle"></div>
                        <span className="number">{positiveValue.toLocaleString("en-US",{ maximumFractionDigits: 1})+"%"}</span>
                        {translations[dataKey]+" ("+absoluteAmount.toLocaleString("en-US",{maximumFractionDigits:0})+")"}
                    </div>
                )
            })}
        </div>
    )
}
export default SegmentationTooltip