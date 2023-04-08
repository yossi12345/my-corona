import { useState } from "react"
import getTranslation from "../../../getTranslation"
function ChartSelectMenu(props){
    const [currentState,setCurrentState]=useState(()=>{
        const initialState=[]
        for (let i=0;i<props.sections.length;i++){
            initialState.push([])
            for (let j=0;j<props.sections[i].options.length;j++){
                initialState[i].push({
                    type:props.sections[i].type,
                    key:Math.random(),
                    value:props.sections[i].options[j].option,
                    isChecked:props.state[props.sections[i].options[j].option]
                })
            }
        }
        return initialState
    })
    function handleInputsChange(sectionIndex,optionIndex){
        const currentStateCopy = [...currentState];
        const clickedInput=currentStateCopy[sectionIndex][optionIndex]
        if (clickedInput.type==="checkbox"){
            clickedInput.isChecked=!clickedInput.isChecked;
            setCurrentState(currentStateCopy)
            return
        }
        for (let i=0;i<currentStateCopy[sectionIndex].length;i++)
            currentStateCopy[sectionIndex][i].isChecked=false
        clickedInput.isChecked=true 
        setCurrentState(currentStateCopy)
    }
    return (
        <div className="chart-select-menu">
            <ul>
                {props.sections.map(({title, options, type }, sectionIndex) =>(
                    <div key={Math.random()}>
                        <h4>{title}</h4>
                        {options.map(({ option }, optionIndex) => (
                            <li key={currentState[sectionIndex][optionIndex].key}>
                                {props.inputsRefs?
                                    <input type={type} value={option}
                                        ref={(element) => props.inputsRefs.current[optionIndex] = element}
                                        checked={currentState[sectionIndex][optionIndex].isChecked}
                                        onChange={() => handleInputsChange(sectionIndex, optionIndex)}
                                    /> :
                                    <input type={type} value={option}
                                        checked={currentState[sectionIndex][optionIndex].isChecked}
                                        onChange={() => handleInputsChange(sectionIndex, optionIndex)}
                                    />
                                }
                                <label>
                                    {getTranslation(option)}
                                </label>
                            </li>
                        )
                        )}
                    </div>
                ))}
            </ul>
            <button
                onClick={() =>{
                    const newChartState = { ...props.state }
                    const newChartOptions = []
                    for (let i = 0; i < currentState.length; i++) {
                        for (let j = 0; j < currentState[i].length; j++) {
                            if (currentState[i][j].isChecked)
                                newChartOptions.push(currentState[i][j].value)
                            newChartState[currentState[i][j].value] = currentState[i][j].isChecked
                        }
                    }
                    props.setState(newChartState)
                    props.setSelectedOptions(newChartOptions)
                    props.setShouldSelectOpen(false)
                }}
            >
                אישור</button>
            <button
                onClick={() => {
                    const currentStateCopy = [...currentState]
                    for (let i = 0; i < currentStateCopy.length; i++) {
                        for (let j = 0; j < currentStateCopy[i].length; j++)
                            currentStateCopy[i][j].isChecked = props.selectedOptions.includes(currentStateCopy[i][j].value)
                    }
                    setCurrentState(currentStateCopy)
                    props.setShouldSelectOpen(false)
                }}>ביטול</button>
        </div>

    )
}
export default ChartSelectMenu;