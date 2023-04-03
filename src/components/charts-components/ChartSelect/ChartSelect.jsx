import React, { useRef, useState } from "react"
import getTranslation from "../../../getTranslation"
import "./ChartSelect.scss"
function ChartSelect({sections={},setChartState,chartState={},inputsRefs}){
    const [shouldSelectOpen,setShouldSelectOpen]=useState(false)
    const inputRefs=useRef([])
    const [currentState,setCurrentState]=useState(()=>getInitialState())
    const [chartOptions,setChartOptions]=useState(()=>{
        const initialValueOfChartOptions=[]
        for (const option in chartState){
            if (chartState[option])
                initialValueOfChartOptions.push(option)
        }
        return initialValueOfChartOptions
    })
    function getInitialState(){
        const initialState=[]
        for (let i=0;i<sections.content.length;i++){
            initialState.push([])
            for (let j=0;j<sections.content[i].options.length;j++){
                initialState[i].push({
                    type:sections.content[i].type,
                    key:Math.random(),
                    value:sections.content[i].options[j].option,
                    isChecked:chartState[sections.content[i].options[j].option]
                })
            }
        }
        return initialState
    }
    function handleInputsChange(sectionIndex,optionIndex){
        const stateCopy = [...currentState];
        if (stateCopy[sectionIndex][optionIndex].type==="checkbox")
            stateCopy[sectionIndex][optionIndex].isChecked=!stateCopy[sectionIndex][optionIndex].isChecked;
        else{
            for (let i=0;i<stateCopy[sectionIndex].length;i++)
                stateCopy[sectionIndex][i].isChecked=false
            stateCopy[sectionIndex][optionIndex].isChecked=true
        }
        setCurrentState(stateCopy)
    }
    return (
        <div className="chart-select-container">
            <button className="chart-select-open-menu-btn" onClick={()=>{
                const shouldSelectOpenCopy=shouldSelectOpen
                setShouldSelectOpen(!shouldSelectOpenCopy)
            }}>
                {chartOptions.map((option,i)=>{
                    const signAfterOption=(i+1)===chartOptions.length?"":","
                    return (
                        <span key={Math.random()}>{getTranslation(option)+signAfterOption}</span>
                        )
                    })}
                <div className={"chart-select-arrow"+(shouldSelectOpen?" chart-select-arrow-rotate":"")}></div>
            </button>
            {shouldSelectOpen&&<div 
                className="chart-select-menu">
                <ul>
                    {sections.content.map(({title,options,type},sectionIndex)=>{
                        return (
                            <div key={Math.random()}>
                                <h4>{title}</h4>
                                {options.map(({option},optionIndex)=>{

                                    return (
                                        
                                        <li key={currentState[sectionIndex][optionIndex].key}>{
                                            inputsRefs?
                                            <input type={type} value={option}
                                                ref={(element)=>inputRefs.current[optionIndex]=element}
                                                checked={currentState[sectionIndex][optionIndex].isChecked}
                                                onChange={()=> handleInputsChange(sectionIndex,optionIndex)}
                                            />:
                                            <input type={type} value={option}
                                                checked={currentState[sectionIndex][optionIndex].isChecked}
                                                onChange={()=> handleInputsChange(sectionIndex,optionIndex)}
                                            />
                                        }
                                            <label>
                                                {getTranslation(option)}
                                            </label>
                                        </li>

                                    )
                                })}
                            </div>
                        )
                    })}
                </ul>
                <button
                onClick={()=>{
                    const newChartState={...chartState}
                    const newChartOptions=[]
                        for (let i=0;i<currentState.length;i++){
                            for (let j=0;j<currentState[i].length;j++){
                                if (currentState[i][j].isChecked)
                                    newChartOptions.push(currentState[i][j].value)
                                newChartState[currentState[i][j].value]=currentState[i][j].isChecked
                            }
                        }
                        setChartState(newChartState)
                        setChartOptions(newChartOptions)
                        setShouldSelectOpen(false)
                    }}  
                >
                    אישור</button>
                <button
                onClick={()=>{
                    const currentStateCopy=[...currentState]
                    for (let i=0;i<currentStateCopy.length;i++){
                        for (let j=0;j<currentStateCopy[i].length;j++)
                            currentStateCopy[i][j].isChecked=chartOptions.includes(currentStateCopy[i][j].value)
                    }
                    setCurrentState(currentStateCopy)
                    setShouldSelectOpen(false)
                }}>ביטול</button>
            </div>}
        </div>
    )
}
export default ChartSelect