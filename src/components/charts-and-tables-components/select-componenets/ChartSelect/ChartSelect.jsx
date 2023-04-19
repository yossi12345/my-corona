import { useState } from "react"
//import getTranslation from "../../../getTranslation"
import "./ChartSelect.scss"
import SelectArrow from "../SelectArrow/SelectArrow"
import ChartSelectMenu from "../ChartSelectMenu/ChartSelectMenu"
function ChartSelect({sections=[],setState,state={},translations,inputsRefs}){
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
                <div>
                    {selectedOptions.map((option,i)=>{
                        const signAfterOption=(i+1)===selectedOptions.length?"":", "
                        return (
                            <span key={Math.random()}>{translations[option]+signAfterOption}</span>
                            )
                        })}
                </div>
                <SelectArrow isUpsideDown={!shouldSelectOpen}/>
                {/* <div className={"chart-select-arrow"+(shouldSelectOpen?" chart-select-arrow-rotate":"")}></div> */}
            </button>
            {shouldSelectOpen&&<ChartSelectMenu 
                setShouldSelectOpen={setShouldSelectOpen}
                setSelectedOptions={setSelectedOptions}
                selectedOptions={selectedOptions}
                sections={sections}
                state={state}
                setState={setState}
                inputsRefs={inputsRefs}
                translations={translations}
                />}
        </div>
    )
}
export default ChartSelect