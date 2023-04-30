import { useEffect, useState,useMemo } from "react"
import {BiInfoCircle} from "react-icons/bi"
//import {GoTriangleUp} from "react-icons/go"
import TableSelect from "../select-componenets/TableSelect/TableSelect";
import { countriesParameters } from "../../../mockData";
import VerifiedFromAbroadRow from "./VerifiedFromAbroadRow";
import "./VerifiedFromAbroadTable.scss"
function VerifiedFromAbroadTable(props){
    const [tableState,setTableState]=useState({
        isReversedSort:true,
        sortBy:"enteringAmount",
        isTriangleShow:true,
        allEntries:Object.keys(countriesParameters),
        selectedEntries:[],
        periods:[
            {
                translation:"עד עכשיו",
                time:countriesParameters["ירדן"].parameters.length
            },
            {
                translation:"שנה",
                time:365
            },
            {
                translation:"6 חודשים",
                time:180
            },
            {
                translation:"3 חודשים",
                time:90
            },
            {
                translation:"חודש אחרון",
                time:30
            }
        ],
        tempSelectedPeriod:{
            translation:"חודש אחרון",
            time:30
        },
        selectedPeriod:{
            translation:"חודש אחרון",
            time:30
        }
    })
    const dataForTable=useMemo(()=>{
        const result={}
        const selctedPeriodTime=tableState.selectedPeriod.time
        for (const country in countriesParameters){
            result[country]={riskLevel:countriesParameters[country].riskLevel}
            for (let i=0;i<selctedPeriodTime;i++){
                const day=countriesParameters[country].parameters.length-i
                for (const parameter in countriesParameters[country].parameters[day]){
                    const countryParameter=countriesParameters[country].parameters[day][parameter]
                    if (result[country][parameter]===undefined)
                        result[country][parameter]=countryParameter
                    else
                        result[country][parameter]+=countryParameter
                }
            }
            result[country].verifiedFromEntering=(result[country].verifiedFromEntering*100)/result[country].enteringAmount
        }
        return result
    },[tableState.selectedPeriod])
    useEffect(()=>{
        const newTableState={...tableState}
        newTableState.allEntries.sort((c1,c2)=>(
            dataForTable[c2].enteringAmount-dataForTable[c1].enteringAmount
        ))
    },[])
    useEffect(()=>{
        if (tableState.tempSelectedPeriod.time===tableState.selectedPeriod.time)
            return 
        const newTableState={...tableState}
        newTableState.selectedPeriod={...newTableState.tempSelectedPeriod}
        setTableState(newTableState)
    },[tableState.selectedEntries])
    function sortHandler(sortType){
        const toReverseSort=!tableState.isReversedSort||tableState.sortBy!==sortType
        const newTableState={...tableState}
        if (sortType==="alphabetic"){
            tableState.allEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
            tableState.selectedEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return h1.localeCompare(h2,"he")
                return h2.localeCompare(h1,"he")
            })
        }
        else{
            tableState.allEntries.sort((c1,c2)=>{
                if (toReverseSort)
                    return dataForTable[c2][sortType]-dataForTable[c1][sortType]
                return dataForTable[c1][sortType]-dataForTable[c2][sortType]

            })
            tableState.selectedEntries.sort((h1,h2)=>{
                if (toReverseSort)
                    return dataForTable[h2][sortType]-dataForTable[h1][sortType]
                return dataForTable[h1][sortType]-dataForTable[h2][sortType]
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
                inputPlaceholder="חיפוש מדינה..."
                subText="מדינות נבחרו"
                openSelectButtonContent={
                    tableState.selectedPeriod.translation+", "+
                    (
                        tableState.selectedEntries.length ===0 ?
                        tableState.allEntries.length:tableState.selectedEntries.length
                    ) 
                    + " מדינות נבחרו"
                }
                cancelUserSelectionInSectionComponent={()=>{
                    const newTableState={...tableState}
                    newTableState.tempSelectedPeriod={...newTableState.selectedPeriod}
                    setTableState(newTableState)
                }}
                sectionComponent={
                    <div className="periods-list">
                        <h4>זמן</h4>
                        <ul>
                            {tableState.periods.map(({translation,time})=>(
                                <li key={Math.random()}>
                                    <input type="radio" checked={tableState.tempSelectedPeriod.time===time} onChange={()=>{
                                        const newTableState={...tableState}
                                        newTableState.tempSelectedPeriod={
                                            translation:translation,
                                            time:time
                                        }
                                        setTableState(newTableState)
                                    }}/>
                                    <label>{translation}</label>
                                </li> 
                            ))}
                        </ul>
                    </div>
                }
            />
            <div className="data-update-container">
                <BiInfoCircle className="margin-top1" size={14}/>
                <div>
                    {
                        "הנתונים מעודכנים לתאריך "+
                        props.lastDataUpdate.toLocaleDateString("en-GB",{day:'2-digit',month:'2-digit',year: '2-digit'}).replace(/\//g,".")+
                        ", החל מהתאריך 01.03.20"
                    }
                </div>
            </div>
            <div className="verified-from-abroad-legend">
                <div>
                    <div className="rectangle background-colorfb4f67"></div>
                    <div className="label">מדינות בסיכון מירבי</div>
                </div>
                <div>
                    <div className="rectangle background-colorfab278"></div>
                    <div className="label">מדינות בסיכון</div>
                </div>   
                <div>
                    <div className="rectangle background-colorfae626"></div>
                    <div className="label">מדינות בסיכון נמוך</div>
                </div>  
            </div>  
            <div className="verified-from-abroad-table">
                <div className="first-row-container">
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("alphabetic")
                        }}>
                             מדינה
                            {tableState.isTriangleShow&&tableState.sortBy==="alphabetic"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>

                               // <GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("riskLevel")
                        }}>
                            צבע
                            {tableState.isTriangleShow&&tableState.sortBy==="riskLevel"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("enteringAmount")
                        }}>
                            נכנסים לישראל
                            {tableState.isTriangleShow&&tableState.sortBy==="enteringAmount"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                            
                            //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>  
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("verifiedCitizens")
                        }}>
                            אזרחים מאומתים
                            {tableState.isTriangleShow&&tableState.sortBy==="verifiedCitizens"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>

                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("verifiedForeign")
                        }}>
                            זרים מאומתים 
                            {tableState.isTriangleShow&&tableState.sortBy==="verifiedForeign"&&
                                    <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                    <div className="button-container">
                        <button onClick={()=>{
                            handleSortButtonClick("verifiedFromEntering")
                        }}>
                            % מאומתים מהנכנסים
                            {tableState.isTriangleShow&&tableState.sortBy==="verifiedFromEntering"&&
                                <div className={"triangle2"+(tableState.isReversedSort?" upside-down":"")}></div>
                                //<GoTriangleUp size={12} color="#5ea5f5" className={"triangle"+(tableState.isReversedSort?" upside-down":"")}/>
                            }
                        </button>
                    </div>
                </div>
                <div className="rest-rows-container-container">
                        {(tableState.selectedEntries.length>0?tableState.selectedEntries:tableState.allEntries).map((country)=>(
                            <VerifiedFromAbroadRow
                                key={Math.random()}
                                country={country}
                                riskLevel={dataForTable[country].riskLevel}
                                enteringAmount={dataForTable[country].enteringAmount}
                                verifiedCitizens={dataForTable[country].verifiedCitizens}
                                verifiedForeign={dataForTable[country].verifiedForeign}
                                verifiedFromEntering={dataForTable[country].verifiedFromEntering}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}
export default VerifiedFromAbroadTable;