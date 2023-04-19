import { IoCloseSharp } from "react-icons/io"
import { BiInfoCircle } from "react-icons/bi"
import { TbRectangleVerticalFilled } from "react-icons/tb"
import { useState } from "react"
import { citiesParameters } from "../../../mockData";
import TrafficLightRow from "./TrafficLightRow";
import "./TrafficLightTable.scss"
function TrafficLightTable(props) {
    const [allCities,setAllCities]=useState(()=>{
        const result=Object.keys(citiesParameters)
        result.sort((h1,h2)=>h2.localeCompare(h1,"he"))
        return result
    })
    const [selectedCity,setSelectedCity]=useState(null)
    const [tableState,setTableState]=useState({
        isReversedSort:true,
        sortBy:"grade",
        isTriangleShow:true
    })
    function sortHandler(sortType){
        const allCitiesSorted=[...allCities]
        const newTableState={...tableState}
        const toReverseSort=!tableState.isReversedSort||tableState.sortBy!==sortType
        if (sortType==="alphabetic"){
            allCitiesSorted.sort((c1,c2)=>{
                if (toReverseSort)
                    return c1.localeCompare(c2,"he")
                return c2.localeCompare(c1,"he")
            })
        }
        else{
            allCitiesSorted.sort((c1,c2)=>{
                if (toReverseSort)
                    return citiesParameters[c2][sortType]-citiesParameters[c1][sortType]
                return citiesParameters[c1][sortType]-citiesParameters[c2][sortType]
            })
        }
        setAllCities(allHospitalsSorted)
        newTableState.isReversedSort=toReverseSort
        newTableState.isTriangleShow=true
        newTableState.sortBy=sortType
        setTableState(newTableState)
    } 
    return (
        <>
            <div className="data-update-container">
                <BiInfoCircle size={12} />
                {"הנתונים נכונים לתאריך " + props.lastDataUpdate.toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, ".")}
            </div>
            <div className="traffic-light-table">
                <div className="first-row-container">
                    <div>
                        <button onClick={() => { handleSortButtonClick("alphabetic") }}>
                            ישוב
                            {tableState.isTriangleShow && tableState.sortBy === "alphabetic" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { handleSortButtonClick("generalOccupacity") }}>
                            ציון וצבע יומי
                            {tableState.isTriangleShow && tableState.sortBy === "generalOccupacity" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { handleSortButtonClick("internalOccupacity") }}>
                           חולים חדשים לכל 10,000 נפש *
                            {tableState.isTriangleShow && tableState.sortBy === "internalOccupancy" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { handleSortButtonClick("internalOccupacity") }}>
                           % הבדיקות החיוביות *
                            {tableState.isTriangleShow && tableState.sortBy === "internalOccupancy" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { handleSortButtonClick("internalOccupacity") }}>
                           שיעור שינוי מאומתים *
                            {tableState.isTriangleShow && tableState.sortBy === "internalOccupancy" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>
                    <div>
                        <button onClick={() => { handleSortButtonClick("internalOccupacity") }}>
                           חולים פעילים
                            {tableState.isTriangleShow && tableState.sortBy === "internalOccupancy" &&
                                <GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " triangle-flip" : "")} />
                            }
                        </button>
                    </div>{grade:4.5, newSicks:9.6,positiveTests:100,verifiedChangeRate:0,activeSicks:2}
                </div>
                <div className="rest-rows-container">
                        {selectedCity === null ?
                            allCities.map((city) => (
                                <TrafficLightRow
                                    key={Math.random()}
                                    city={city}
                                    grade={citiesParameters[city].grade}
                                    newSicks={citiesParameters[city].newSicks}
                                    positiveTests={citiesParameters[city].positiveTests}
                                    verifiedChangeRate={citiesParameters[city].verifiedChangeRate}
                                    activeSicks={citiesParameters[city].activeSicks}
                                />
                            )) :
                            <TrafficLightRow
                                city={selectedCity}
                                grade={citiesParameters[selectedCity].grade}
                                newSicks={citiesParameters[selectedCity].newSicks}
                                positiveTests={citiesParameters[selectedCity].positiveTests}
                                verifiedChangeRate={citiesParameters[selectedCity].verifiedChangeRate}
                                activeSicks={citiesParameters[selectedCity].activeSicks}
                            />
                        }
                </div>
            </div>
        </>
    )
}
export default TrafficLightTable