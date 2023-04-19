import "./ChartSelect/ChartSelect.scss"
import { bedOccupancyInHospitals } from "../../mockData";
import { useState } from "react";
import {BiInfoCircle} from "react-icons/bi";
import {GoTriangleUp} from "react-icons/go"
import TableSelect from "./select-componenets/TableSelect/TableSelect";
function BedOccupancyTable(props) {
    const [allHospitals,setAllHospitals] = useState(() => {
        const result = []
        for (const hospital in bedOccupancyInHospitals)
            result.push(hospital)
        result.sort((h1,h2)=>h2.localeCompare(h1,"he"))
        return result
    })
    const [selectedHospitals, setSelectedHospitals] = useState([])
    const [tableState,setTableState]=useState({
        isReversedSort:true,
        sortBy:"generalOccupacity",
        isTriangleShow:true
    })
    function TableRow({hospital}){
        function OccupancyBedSquare({bedOccupancy}){
            return (
                <div className="occupancy-bed-square">
                    <div className="bar-container">
                        <div className="fill" style={{
                                backgroundColor:bedOccupancy<=100?"#50cbfd":"#e95e7c", 
                                width:(bedOccupancy>=100?"100":bedOccupancy)+"%"
                            }}>
                        </div>
                        <div className="unfill" style={{
                            width:bedOccupancy>=100?"0":((100-bedOccupancy)+"%")
                        }}>
                        </div>
                    </div>
                    {bedOccupancy+"%"}
                </div>
            )
        }
        const generalBedOccupancy=bedOccupancyInHospitals[hospital].general
        const internalBedOccupancy=bedOccupancyInHospitals[hospital].internal
        return (
            <li>
                <div className="hospital">{hospital}</div>
                <OccupancyBedSquare bedOccupancy={generalBedOccupancy}/>
                <OccupancyBedSquare bedOccupancy={internalBedOccupancy}/>
                
            </li>
        )
    }
    function sortHandler(sortType){
        const toReverseSort=!tableState.isReversedSort||tableState.sortBy!==sortType
        const newTableState={...tableState}
        const allHospitalsSorted=[...allHospitals]
        const selectedHospitalsSorted=[...selectedHospitals]
        if (sortType==="alphabetic"){
            allHospitalsSorted.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
            selectedHospitalsSorted.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
        }
        else{
            const occupacityType=sortType==="internalOccupacity"?"internal":"general"
            allHospitalsSorted.sort((h1,h2)=>(
                bedOccupancyInHospitals[toReverseSort?h2:h1][occupacityType]-bedOccupancyInHospitals[toReverseSort?h1:h2][occupacityType]
            ))
            selectedHospitalsSorted.sort((h1,h2)=>(
                bedOccupancyInHospitals[toReverseSort?h2:h1][occupacityType]-bedOccupancyInHospitals[toReverseSort?h1:h2][occupacityType]
            ))
        }
        setAllHospitals(allHospitalsSorted)
        setSelectedHospitals(selectedHospitalsSorted)
        newTableState.isReversedSort=toReverseSort
        newTableState.isTriangleShow=true
        newTableState.sortBy=sortType
        setTableState(newTableState)
    }
    function handleSortButtonClick(sortType){
        if (tableState.sortBy!==sortType||
            !tableState.isTriangleShow||tableState.isReversedSort
        ){
            sortHandler(sortType)
            return
        }
        const newTableState={...tableState}
        newTableState.isTriangleShow=false
        setTableState(newTableState)
    } 
    return (
        <>
           <TableSelect 
                list={allHospitals} 
                selectedEntries={selectedHospitals} 
                setSelectedHospitals={setSelectedHospitals}
            />
            <div className="data-update-container">
                <BiInfoCircle size={12}/>
                {"הנתונים מעודכנים לתאריך "+props.lastDataUpdate.toLocaleDateString("en-GB",{day:'2-digit',month:'2-digit',year: '2-digit'}).replace(/\//g,".")}
            </div>
            <div className="table">
                <div className="first-row-container">
                    <div>
                        <button onClick={()=>{handleSortButtonClick("alphabetic")}}>
                            בית חולים
                            {tableState.isTriangleShow&&tableState.sortBy==="alphabetic"&&
                                <GoTriangleUp color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" triangle-flip":"")}/>
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>{handleSortButtonClick("generalOccupacity")}}>
                            % תפוסה כללית
                            {tableState.isTriangleShow&&tableState.sortBy==="generalOccupacity"&&
                                <GoTriangleUp color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" triangle-flip":"")}/>
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>{handleSortButtonClick("internalOccupacity")}}>
                            % תפוסת מחלקה פנימית
                            {tableState.isTriangleShow&&tableState.sortBy==="internalOccupancy"&&
                                <GoTriangleUp color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" triangle-flip":"")}/>
                            }
                        </button>
                    </div>
                </div>
                <div className="rest-rows-container">
                    <ul>
                        {selectedHospitals.length===0?
                            allHospitals.map((hospital)=>(
                                <TableRow hospital={hospital} key={Math.random()}/>
                            )):
                            selectedHospitals.map((hospital)=>(
                                <TableRow hospital={hospital} key={Math.random()}/> 
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default BedOccupancyTable;