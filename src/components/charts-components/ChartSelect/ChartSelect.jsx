import {useState } from "react"
import getTranslation from "../../../getTranslation"
import "./ChartSelect.scss"
import ChartSelectMenu from "./ChartSelectMenu"
function ChartSelect({sections=[],setState,state={},inputsRefs}){
    const [shouldSelectOpen,setShouldSelectOpen]=useState(false)
    const [selectedOptions,setSelectedOptions]=useState(()=>{
        const initialValueOfChartOptions=[]
        for (const option in state){
            if (state[option])
                initialValueOfChartOptions.push(option)
        }
        return initialValueOfChartOptions
    })
    return (
        <div className="chart-select-container relative">
            <button className="chart-select-open-menu-btn" onClick={()=>{
                const shouldSelectOpenCopy=shouldSelectOpen
                setShouldSelectOpen(!shouldSelectOpenCopy)
            }}>
                {selectedOptions.map((option,i)=>{
                    const signAfterOption=(i+1)===selectedOptions.length?"":","
                    return (
                        <span key={Math.random()}>{getTranslation(option)+signAfterOption}</span>
                        )
                    })}
                <div className={"chart-select-arrow"+(shouldSelectOpen?" chart-select-arrow-rotate":"")}></div>
            </button>
            {shouldSelectOpen&&<ChartSelectMenu 
                setShouldSelectOpen={setShouldSelectOpen}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                sections={sections}
                state={state}
                setState={setState}
                inputsRefs={inputsRefs}
                />}
        </div>
    )
}
export default ChartSelect