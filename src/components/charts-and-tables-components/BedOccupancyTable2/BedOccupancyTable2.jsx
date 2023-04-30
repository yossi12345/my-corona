import { bedOccupancyInHospitals } from "../../../mockData";
import { useState } from "react";
import {BiInfoCircle} from "react-icons/bi"
import {GoTriangleUp} from "react-icons/go"
import TableSquareWithBar from "../TableSquareWithBar/TableSquareWithBar";
import TableSelect from "../select-componenets/TableSelect/TableSelect";
import "./BedOccupancyTable2.scss"
function BedOccupancyTable2(props){
    const [tableState,setTableState]=useState({
        isReversedSort:true,
        sortBy:"generalOccupancy",
        isTriangleShow:true,
        allEntries:(Object.keys(bedOccupancyInHospitals)).sort((h1,h2)=>(
            bedOccupancyInHospitals[h2].general-bedOccupancyInHospitals[h1].general
        )),
        selectedEntries:[]
    })
    function sortHandler(sortType){
        const toReverseSort=!tableState.isReversedSort||tableState.sortBy!==sortType
        const newTableState={...tableState}
        if (sortType==="alphabetic"){
            newTableState.allEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
            newTableState.selectedEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
        }
        else{
            const occupancyType=sortType==="internalOccupancy"?"internal":"general"
            newTableState.allEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return bedOccupancyInHospitals[h2][occupancyType]-bedOccupancyInHospitals[h1][occupancyType]
                return bedOccupancyInHospitals[h1][occupancyType]-bedOccupancyInHospitals[h2][occupancyType]

            })
            newTableState.selectedEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return bedOccupancyInHospitals[h2][occupancyType]-bedOccupancyInHospitals[h1][occupancyType]
                return bedOccupancyInHospitals[h1][occupancyType]-bedOccupancyInHospitals[h2][occupancyType]
            })
        }
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
                tableState={tableState}
                setTableState={setTableState}
                subText="בתי חולים / מוסדות נבחרו"
                inputPlaceholder="חיפוש בית חולים / מוסד"
                openSelectButtonContent={
                    (tableState.selectedEntries.length === 0 ?tableState.allEntries.length:tableState.selectedEntries.length) + " בתי חולים / מוסדות נבחרו"
                }
            />
            <div className="data-update-container">
                <BiInfoCircle size={14} className="margin-top1"/>
                {
                    "הנתונים מעודכנים לתאריך "+
                    props.lastDataUpdate.toLocaleDateString("en-GB",{day:'2-digit',month:'2-digit',year: '2-digit'}).replace(/\//g,".")
                }
            </div>
            <div className="bed-occupancy-table">
                <div className="first-row-container">
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("alphabetic")
                        }}>
                            בית חולים
                            {tableState.isTriangleShow&&tableState.sortBy==="alphabetic"&&
                               <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("generalOccupancy")
                        }}>
                            % תפוסה כללית
                            {tableState.isTriangleShow&&tableState.sortBy==="generalOccupancy"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("internalOccupancy")
                        }}>
                            % תפוסת מחלקה פנימית
                            {tableState.isTriangleShow&&tableState.sortBy==="internalOccupancy"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>  
                </div>
                <div className="rest-rows-container-container">
                    <div>
                        {(tableState.selectedEntries.length>0?tableState.selectedEntries:tableState.allEntries).map((hospital)=>{
                            const generalBedOccupancy=bedOccupancyInHospitals[hospital].general
                            const internalBedOccupancy=bedOccupancyInHospitals[hospital].internal
                            return (
                                <div key={Math.random()} className="row">
                                    <div className="hospital-square">{hospital}</div>
                                    <TableSquareWithBar
                                        squareClass={generalBedOccupancy!==-2?"occupancy-bed-square":"no-information-square"}
                                        fillColor={generalBedOccupancy<100?"#50cbfd":"#e95e7c"}
                                        unfillColor="#eff5f9"
                                        percentage={generalBedOccupancy}
                                        contentWithoutBar="אין מידע"
                                        showBar={generalBedOccupancy!==-1}
                                        percentageClass={generalBedOccupancy!==-1?"":"no-information"}
                                    />
                                    <TableSquareWithBar 
                                        squareClass={internalBedOccupancy!==-2?"occupancy-bed-square":"no-information-square"}
                                        fillColor={internalBedOccupancy<100?"#50cbfd":"#e95e7c"}
                                        unfillColor="#eff5f9"
                                        percentage={internalBedOccupancy}
                                        contentWithoutBar="אין מידע"
                                        showBar={internalBedOccupancy!==-1}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default BedOccupancyTable2;