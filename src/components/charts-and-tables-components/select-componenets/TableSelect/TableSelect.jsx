import { useState } from "react"
//import SelectArrow from "../SelectArrow/SelectArrow"
import "./TableSelect.scss"
function TableSelect(props) {
    const [shouldSelectOpen, setShouldSelectOpen] = useState(false)
    const [searchedEntries, setSearchedEntries] = useState([])
    const [tempSelectedEntries,setTempSelectedEntries]=useState([])
    const [isUserSearching,setIsUserSearching]=useState(false)
    const [currentState,setCurrentState]=useState(()=>{
        const result={}
        for (const entry in props.tableState.allEntries)
            result[entry]=false;
        return result
    })
    function cancelUserSelections() {
        const newCurrentState = { ...currentState }
        const newTempSelectedEntries = []
        for (const entry in currentState) {
            const isEntrySelected = props.tableState.selectedEntries.includes(entry)
            newCurrentState[entry] = isEntrySelected
            if (isEntrySelected)
                newTempSelectedEntries.push(entry)
        }
        setTempSelectedEntries(newTempSelectedEntries)
        setCurrentState(newCurrentState)
    }
    function changeCheckbox(entry){
        const newCurrentState = { ...currentState }
        newCurrentState[entry] = !newCurrentState[entry]
        setCurrentState(newCurrentState)
    }
    function searchHandler(searchLine) {
        const newSearchedEntries=[]
        const currentStateCopy = { ...currentState}
        props.tableState.allEntries.forEach((entry)=>{
            if (tempSelectedEntries.includes(entry))
                currentStateCopy[entry] = true
            else if (entry.includes(searchLine))
                newSearchedEntries.push(entry)
        })
        setCurrentState(currentStateCopy)
        setSearchedEntries(newSearchedEntries)
    }
    return (
        <div className="table-select-container">
            <button className="table-select-open-menu-btn" onClick={() => {
                const shouldSelectOpenCopy = shouldSelectOpen
                if (shouldSelectOpenCopy){
                    setIsUserSearching(false)
                    cancelUserSelections()
                }
                setShouldSelectOpen(!shouldSelectOpenCopy)
            }}>
                <div>
                    {props.openSelectButtonContent}
                </div>
                <div className={"select-arrow"+(shouldSelectOpen?" select-arrow-rotate":"")}></div>
            </button>
            {shouldSelectOpen && <div className="table-select-menu">
                <input placeholder={props.inputPlaceholder} className="search-input"
                    onFocus={(event)=>{
                        setIsUserSearching(true)
                        searchHandler(event.target.value)
                    }}
                    onInput={(event)=>{
                        setIsUserSearching(true)
                        searchHandler(event.target.value)
                    }}
                />
                {!isUserSearching && tempSelectedEntries.length > 0 && <div>
                    {tempSelectedEntries.length +" "+props.subText}
                </div>}
                {!isUserSearching&&props.sectionComponent?props.sectionComponent:null}
                {isUserSearching&&<ul>
                    {tempSelectedEntries.length>0&&<div className="selected-entries">
                        {tempSelectedEntries.map((entry) =>(
                            <li key={Math.random()}>
                                <input
                                    type="checkbox"
                                    checked={currentState[entry]}
                                    onChange={()=>{
                                        changeCheckbox(entry)
                                    }}
                                />
                                <label>{entry}</label>
                            </li>
                        ))}
                    </div>}
                    <div>
                        {searchedEntries.map((entry) => (
                            <li key={Math.random()}>
                                <input
                                    type="checkbox"
                                    checked={currentState[entry]}
                                    onChange={()=>{
                                        changeCheckbox(entry)
                                    }}
                                />
                                <label>{entry}</label>
                            </li>
                        ))}
                    </div>
                </ul>}
                <div className="cancel-and-confirm-buttons-container">
                    <button onClick={() => {
                        if (!isUserSearching) {
                            const newTableState={...props.tableState}
                            newTableState.selectedEntries=[...tempSelectedEntries]
                            props.setTableState(newTableState)
                            setShouldSelectOpen(false)
                            return
                        }
                        const newTempSelectedEntries = []
                        for (const entry in currentState) {
                            if (currentState[entry])
                                newTempSelectedEntries.push(entry)
                        }
                        setIsUserSearching(false)
                        setTempSelectedEntries(newTempSelectedEntries)
                    }}>אישור</button>
                    <button onClick={() => {

                        cancelUserSelections()
                        if (isUserSearching){
                            setIsUserSearching(false) 
                            return
                        }
                        setShouldSelectOpen(false)
                        if (props.cancelUserSelectionInSectionComponent)
                            props.cancelUserSelectionInSectionComponent()
                        
                    }}>ביטול</button>
                </div>
            </div>}
        </div>
    )
}
export default TableSelect