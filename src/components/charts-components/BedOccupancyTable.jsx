import "./ChartSelect/ChartSelect.scss"
import { bedOccupancyInHospitals } from "../../mockData";
import { useState } from "react";
function BedOccupancyTable(props) {
    const [allHospitals,setAllHospitals] = useState(() => {
        const result = []
        for (const hospital in bedOccupancyInHospitals)
            result.push(hospital)
        result.sort((h1,h2)=>h2.localeCompare(h1,"he"))
        return result
    })
    const [shouldSelectOpen, setShouldSelectOpen] = useState(false)
    const [searchedHospitals, setSearchedHospitals] = useState([])
    const [tempSelectedHospitals,setTempSelectedHospitals]=useState([])
    const [selectedHospitals, setSelectedHospitals] = useState([])
    const [isUserSearching,setIsUserSearching]=useState(false)
    const [tableState,setTableState]=useState({
        sortBy:"generalOccupacityReversed",
        hospitalsTriangleShouldShow:false,
        generalOccupancyTriangleShouldShow:true,
        internalOccupancyTriangleShouldShow:false,
    })
    const [currentState,setCurrentState]=useState(()=>{
        const result={}
        for (const hospital in bedOccupancyInHospitals)
            result[hospital]=false;
        return result
    })
    function searchHandler(event) {
        setIsUserSearching(true)
        if (event.target.value==="")
            setSearchedHospitals([...allHospitals])
        else
            setSearchedHospitals(
                allHospitals.filter(hospital => (
                    hospital.includes(event.target.value)
                )))
    }
    function cancelUserSelections(){
        setIsUserSearching(false)
        const newCurrentState={...currentState}
        for (const hospital in currentState)
            newCurrentState[hospital]=selectedHospitals.includes(hospital)
        setCurrentState(newCurrentState)
    }
    function CheckboxInput({hospital}){
        return (
            <li key={Math.random()}>
                <input 
                type="checkbox" 
                checked={currentState[hospital]} 
                onChange={()=>{
                    const newCurrentState={...currentState}
                    newCurrentState[hospital]=!newCurrentState[hospital]
                    setCurrentState(newCurrentState)
                }}
            />
                <label>{hospital}</label>
            </li>
        )
    }
    function TableRow({hospital}){
        function OccupancyBedSquare({bedOccupancy}){
            return (
                <div>
                    <div>
                        <div style={{
                                backgroundColor:bedOccupancy<=100?"#50cbfd":"#e95e7c", 
                                width:bedOccupancy+"%"
                            }}>
                        </div>
                    </div>
                    {bedOccupancy}
                </div>
            )
        }
        const generalBedOccupancy=bedOccupancyInHospitals[hospital].general
        const internalBedOccupancy=bedOccupancyInHospitals[hospital].internal
        return (
            <li key={Math.random()}>
                <div>{hospital}</div>
                <OccupancyBedSquare bedOccupancy={generalBedOccupancy}/>
                <OccupancyBedSquare bedOccupancy={internalBedOccupancy}/>
            </li>
        )
    }
    return (
        <>
            <div className="chart-select-container relative">
                <button className="chart-select-open-menu-btn" onClick={() => {
                    const shouldSelectOpenCopy = shouldSelectOpen
                    if (shouldSelectOpenCopy)
                        cancelUserSelections()
                    setShouldSelectOpen(!shouldSelectOpenCopy)
                }}>
                    <div>
                        {(selectedHospitals.length===0?allHospitals.length:selectedHospitals.length)+ " בתי חולים / מוסדות נבחרו"}
                    </div>
                    <div className={"chart-select-arrow" + (shouldSelectOpen ? " chart-select-arrow-rotate" : "")}></div>
                </button>
                {shouldSelectOpen && <div className="chart-select-menu">
                    <input placeholder="חיפוש בית חולים / מוסד" onFocus={searchHandler} onInput={searchHandler} />
                    {!isUserSearching&&tempSelectedHospitals.length>0&&<div>
                            {tempSelectedHospitals.length + " בתי חולים / מוסדות נבחרו"}
                        </div>}
                    {isUserSearching&&<div>
                            <ul>
                                <div>
                                    {selectedHospitals.map((hospital) => (
                                        <CheckboxInput hospital={hospital}/>
                                    ))}
                                </div>
                                <div>
                                    {searchedHospitals.map((hospital) => (
                                        selectedHospitals.includes(hospital)?
                                        null:
                                        <CheckboxInput hospital={hospital}/>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    }
                    <button onClick={()=>{
                        if (!isUserSearching){
                            setSelectedHospitals([...tempSelectedHospitals])
                            setShouldSelectOpen(false)
                            return
                        }
                        const newTempSelectedHospitals=[]
                        for (const hospital in currentState){
                            if (currentState[hospital])
                                newTempSelectedHospitals.push(hospital)
                        }
                        setIsUserSearching(false)
                        setTempSelectedHospitals(newTempSelectedHospitals)
                    }}>אישור</button>
                    <button onClick={()=>{
                        if (!isUserSearching)
                            setShouldSelectOpen(false)
                        cancelUserSelections()
                    }}>ביטול</button>
                </div>}
            </div>
            <div>
                <button onClick={()=>{
                    const newTableState={...tableState}
                    const allHospitalsSorted=[...allHospitals]
                    const selectedHospitalsSorted=[...selectedHospitals]
                    if (tableState.sortBy==="alphabetical"&&tableState.hospitalsTriangleShouldShow){
                        newTableState.hospitalsTriangleShouldShow=false
                        setTableState(newTableState)
                    }
                    else
                        sortHandler(tableState.sortBy==="alphabetical")

                    function sortHandler(isReversed){
                        allHospitalsSorted.sort((h1,h2)=>{
                            if (isReversed)
                                h1.localeCompare(h2,"he")
                            else
                                h2.localeCompare(h1,"he")
                        })
                        selectedHospitalsSorted.sort((h1,h2)=>{
                            if (isReversed)
                                h1.localeCompare(h2,"he")
                            else
                                h2.localeCompare(h1,"he")
                        })
                        setAllHospitals(allHospitalsSorted)
                        setSelectedHospitals(selectedHospitalsSorted)
                        newTableState.hospitalsTriangleShouldShow=true
                        newTableState.sortBy="alphabetical"+(isReversed?"Reversed":"")
                        setTableState(newTableState)
                    } 
                }}>
                    בית חולים
                    {tableState.hospitalsTriangleShouldShow&&<div className={"triangle"+(tableState.sortBy==="alphabeticalReversed"?" triangle-flip":"")}></div>}
                </button>
                <button onClick={()=>{
                    const newTableState={...tableState}
                    const allHospitalsSorted=[...allHospitals]
                    const selectedHospitalsSorted=[...selectedHospitals]
                    if (tableState.sortBy==="generalOccupacity"&&tableState.generalOccupancyTriangleShouldShow){
                        newTableState.generalOccupancyTriangleShouldShow=false
                        setTableState(newTableState)
                    }
                    else
                       sortHandler(tableState.sortBy==="generalOccupacity")

                    function sortHandler(isReversed){
                        allHospitalsSorted.sort((h1,h2)=>(
                            bedOccupancyInHospitals[isReversed?h2:h1].general-bedOccupancyInHospitals[isReversed?h1:h2].general
                        ))
                        selectedHospitalsSorted.sort((h1,h2)=>(
                            bedOccupancyInHospitals[isReversed?h2:h1].general-bedOccupancyInHospitals[isReversed?h1:h2].general
                        ))
                        setAllHospitals(allHospitalsSorted)
                        setSelectedHospitals(selectedHospitalsSorted)
                        newTableState.generalOccupancyTriangleShouldShow=true
                        newTableState.sortBy="generalOccupacity"+(isReversed?"Reversed":"")
                        setTableState(newTableState)
                    } 
                }}>
                    % תפוסה כללית
                    {tableState.generalOccupancyTriangleShouldShow&&<div className={"triangle"+(tableState.sortBy==="generalOccupacityReversed"?" triangle-flip":"")}></div>}
                </button>
                <buuton onClick={()=>{
                    const newTableState={...tableState}
                    const allHospitalsSorted=[...allHospitals]
                    const selectedHospitalsSorted=[...selectedHospitals]
                    if (tableState.sortBy==="internalOccupacity"&&tableState.internalOccupancyTriangleShouldShow){
                        newTableState.internalOccupancyTriangleShouldShow=false
                        setTableState(newTableState)
                    }
                    else 
                       sortHandler(tableState.sortBy==="internalOccupacity")
        
                    function sortHandler(isReversed){
                        allHospitalsSorted.sort((h1,h2)=>(
                            bedOccupancyInHospitals[isReversed?h2:h1].internal-bedOccupancyInHospitals[isReversed?h1:h2].internal
                        ))
                        selectedHospitalsSorted.sort((h1,h2)=>(
                            bedOccupancyInHospitals[isReversed?h2:h1].internal-bedOccupancyInHospitals[isReversed?h2:h1].internal
                        ))
                        setAllHospitals(allHospitalsSorted)
                        setSelectedHospitals(selectedHospitalsSorted)
                        newTableState.internalOccupancyTriangleShouldShow=true
                        newTableState.sortBy="internalOccupacity"+(isReversed?"Reversed":"")
                        setTableState(newTableState)
                    } 
                }}>
                    % תפוסת מחלקה פנימית
                </buuton>
                <ul>
                    {selectedHospitals.length===0?
                        allHospitals.map((hospital)=>(
                            <TableRow hospital={hospital}/>
                        )):
                        selectedHospitals.map((hospital)=>(
                           <TableRow hospital={hospital}/> 
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default BedOccupancyTable;