import { BiInfoCircle } from "react-icons/bi"
//import {GoTriangleUp} from "react-icons/go"
import { citiesParameters } from "../../../mockData";
import TrafficLightRow from "./TrafficLightRow";
//import SelectArrow from "../select-componenets/SelectArrow/SelectArrow";
import "./TrafficLightTable.scss"
import { useState,useRef} from "react";
function TrafficLightTable(props) {
    const inputRef=useRef(null)
    const [shouldSelectOpen,setShouldSelectOpen]=useState(false)
    const [searchedCities,setSearchedCities]=useState([])
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
    function handleUserSearchCity(input){
        if (input===""){
            setSearchedCities([])
            return 
        }
        setSearchedCities(
            [...allCities].filter(city=>(
                city.includes(input)
            )))
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
        setAllCities(allCitiesSorted)
        newTableState.isReversedSort=toReverseSort
        newTableState.isTriangleShow=true
        newTableState.sortBy=sortType
        setTableState(newTableState)
    } 
    return (
        <>
            <button className="table-select-open-menu-btn" onClick={()=>{
                const shouldSelectOpenCopy=shouldSelectOpen
                setShouldSelectOpen(!shouldSelectOpenCopy)
            }}>
                {selectedCity===null?"כלל היישובים":selectedCity}
                <div className={"select-arrow"+(shouldSelectOpen?" select-arrow-rotate":"")}></div>
            </button>
            {shouldSelectOpen&&<div className="traffic-light-select-menu">
                    <input 
                        ref={inputRef} 
                        placeholder="חיפוש ישוב" 
                        type="search"
                        onChange={(event)=>{
                            handleUserSearchCity(event.target.value)
                        }}
                    />   
                    <ul>
                        {searchedCities.map((city)=>(
                            <li key={Math.random()} onClick={()=>{
                                inputRef.current.value=city
                                setSearchedCities([])
                            }}>
                                {city}
                            </li>
                        ))}
                    </ul>
                    <div className="cancel-and-confirm-buttons-container">
                        <button onClick={()=>{
                            const searchedCity=inputRef.current.value
                            if (allCities.includes(searchedCity))
                                setSelectedCity(searchedCity)
                            inputRef.current.value=""
                            setShouldSelectOpen(false)
                        }}>אישור</button>
                        <button onClick={()=>{
                            inputRef.current.value=""
                            setSelectedCity(null)
                            setShouldSelectOpen(false)
                        }}>ביטול</button>
                    </div>
                
                </div>
            }
            <div className="data-update-container">
                <BiInfoCircle size={14} className="margin-top1"/>
                {"הנתונים נכונים לתאריך " + props.lastDataUpdate.toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, ".")}
            </div>
            <div className="traffic-light-legend">
                <div>
                    <div className="rectangle background-colorfa9e8f"></div>
                    <div>
                        <div className="color">אדום</div>
                        <div className="range">ציון 7.5 ומעלה</div>
                    </div>
                </div>
                <div>
                    <div className="rectangle background-colorf2c580"></div>
                    <div>
                        <div className="color">כתום</div>
                        <div className="range">ציון בין 6 ל - 7.5</div>
                    </div>
                </div>   
                <div>
                    <div className="rectangle background-colorfcfc70"></div>
                    <div>
                        <div className="color">צהוב</div>
                        <div className="range">ציון בין 4.5 ל - 6</div>
                    </div>
                </div>
                <div>
                    <div className="rectangle background-colorb8de92"></div>
                    <div>
                        <div className="color">ירוק</div>
                        <div className="range">ציון עד 4.5</div>
                    </div>
                </div>   
            </div>                
            <div className="traffic-light-table">
                <div className="first-row-container">
                    <div className="button-container">
                        <button onClick={() => { handleSortButtonClick("alphabetic") }}>
                            ישוב
                            {tableState.isTriangleShow && tableState.sortBy === "alphabetic" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " upside-down" : "")} />
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={() => { handleSortButtonClick("grade") }}>
                            ציון וצבע יומי
                            {tableState.isTriangleShow && tableState.sortBy === "grade" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " upside-down" : "")} />
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={() => { handleSortButtonClick("newSicks") }}>
                           חולים חדשים לכל 10,000 נפש *
                            {tableState.isTriangleShow && tableState.sortBy === "newSicks" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " upside-down" : "")} />
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={() => { handleSortButtonClick("positiveTests") }}>
                           % הבדיקות החיוביות *
                            {tableState.isTriangleShow && tableState.sortBy === "positiveTests" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " upside-down" : "")} />
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={() => { handleSortButtonClick("verifiedChangeRate") }}>
                           שיעור שינוי מאומתים *
                            {tableState.isTriangleShow && tableState.sortBy === "verifiedChangeRate" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>

                                //<GoTriangleUp color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ?" upside-down" : "")} />
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button className="padding-right-10-percent" onClick={() => { handleSortButtonClick("activeSicks") }}>
                           חולים פעילים
                            {tableState.isTriangleShow && tableState.sortBy === "activeSicks" &&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={8} color="#5ea5f5" className={"triangle" + (tableState.isReversedSort ? " upside-down" : "")} />
                            }
                        </button>
                    </div>
                </div>
                <div className="rest-rows-container-container">
                    <div>
                        {selectedCity === null ?
                            allCities.map((city,i) => (
                                <TrafficLightRow
                                    key={Math.random()}
                                    bodyRef={props.bodyRef}
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
            </div>
        </>
    )
}
export default TrafficLightTable