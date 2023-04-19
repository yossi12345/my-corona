import { useState } from "react"
import SelectArrow from "../SelectArrow/SelectArrow"
import "./TableSelect.scss"
function TableSelect(props) {
    const [shouldSelectOpen, setShouldSelectOpen] = useState(false)
    const [searchedEntries, setSearchedEntries] = useState([])
    const [tempSelectedEntries,setTempSelectedEntries]=useState([])
    const [isUserSearching,setIsUserSearching]=useState(false)
    const [currentState,setCurrentState]=useState(()=>{
        const result={}
        for (const entry in props.list)
            result[entry]=false;
        return result
    })
    function cancelUserSelections() {
        const newCurrentState = { ...currentState }
        const newTempSelectedHospitals = []
        for (const entry in currentState) {
            const isEntrySelected = props.selectedEntries.includes(entry)
            newCurrentState[entry] = isEntrySelected
            if (isEntrySelected)
                newTempSelectedHospitals.push(entry)
        }
        setTempSelectedEntries(newTempSelectedHospitals)
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
        props.list.forEach((entry)=>{
            if (tempSelectedEntries.includes(entry))
                currentStateCopy[entry] = true
            else if (entry.includes(searchLine))
                newSearchedEntries.push(entry)
        })
        setCurrentState(currentStateCopy)
        setSearchedEntries(newSearchedEntries)
    }
    return (
        <div className="table-select-container relative">
            <button className="table-select-open-menu-btn" onClick={() => {
                const shouldSelectOpenCopy = shouldSelectOpen
                if (shouldSelectOpenCopy){
                    setIsUserSearching(false)
                    cancelUserSelections()
                }
                setShouldSelectOpen(!shouldSelectOpenCopy)
            }}>
                <div>
                    {(props.selectedEntries.length === 0 ? props.list.length : props.selectedEntries.length) + " בתי חולים / מוסדות נבחרו"}
                </div>
                <SelectArrow isUpsideDown={shouldSelectOpen}/>
            </button>
            {shouldSelectOpen && <div className="table-select-menu">
                <input placeholder="חיפוש בית חולים / מוסד"
                    onFocus={(event)=>{
                        setIsUserSearching(true)
                        searchHandler(event.target.value)
                    }}
                    onInput={(event)=>{
                        setIsUserSearching(true)
                        searchHandler(event.target.value)
                    }}
                    className="search-input"
                />
                {!isUserSearching && tempSelectedEntries.length > 0 && <div>
                    {tempSelectedEntries.length + " בתי חולים / מוסדות נבחרו"}
                </div>}
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
                            console.log("WWW")
                            props.setSelectedEntries([...tempSelectedEntries])
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
                        if (!isUserSearching)
                            setShouldSelectOpen(false)
                        setIsUserSearching(false)
                        cancelUserSelections()
                    }}>ביטול</button>
                </div>
            </div>}
        </div>
    )
}
export default TableSelect