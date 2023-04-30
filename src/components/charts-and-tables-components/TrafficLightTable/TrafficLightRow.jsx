import {  useRef, useState } from "react"
import { useCallback } from "react"
import { useMemo } from "react"

let i=0
function TrafficLightRow(props){
    const [shouldGradesChartShow,setShouldGradesChartShow]=useState(false)
    const dd=useRef(null)
    const unshowCard=useCallback(()=>{
        i++
        console.log("RRRRRRRRRR",i)
        dd.current.addEventListener("click",()=>{
            console.log("WHY")
           })
        //setShouldGradesChartShow(false)
        //props.bodyRef.current.removeEventListener('click',unshowCard)
    },[props.bodyRef])
    const gradeBackgroundColor=useMemo(()=>{
        const backgroundColorString="background-color"
        const grade=props.grade
        if (grade>=7.5)
            return backgroundColorString+"fa9e8f"
        else if (grade>=6)
            return backgroundColorString+"f2c580"
        else if (grade>=4.5)
            return backgroundColorString+"fcfc70"
        return backgroundColorString+"b8de92"
    },[props.grade])
    console.log("LLLLLLLLL",i)
    i++
    return (
        <div className="row">
            <div className="city-square">{props.city}</div>
            <div className="grade-square">
                <div className={"grade-container "+gradeBackgroundColor} onClick={()=>{
                   setShouldGradesChartShow(true)
                   console.log("Clicked on grade container");
                
                   // props.bodyRef.current.addEventListener('click',unshowCard)
                }}>
                    {props.grade}
                </div>
                {/* {shouldGradesChartShow&&<div ref={dd} className="grades-chart-card"
                //  onClick={(event)=>{
                //     console.log("why")
                //     event.stopPropagation()

                // }}
                >
                </div>} */}
            </div>
            <div className="generic-square">{props.newSicks}</div>
            <div className="generic-square">{props.positiveTests}</div>
            <div className="generic-square">{props.verifiedChangeRate}</div>
            <div className="generic-square">{props.activeSicks>15?props.activeSicks:"מתחת ל-15 חולים"}</div>
        </div>
    )
}
export default TrafficLightRow