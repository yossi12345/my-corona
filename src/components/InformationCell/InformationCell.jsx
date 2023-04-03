import React from "react";
import "./InformationCell.scss"
import {cellsData} from "../../mockData"

function InformationCell(props){
    const dataObj=cellsData[props.index]
    // const [descriptionClass,setDescriptionClass]=useState("none")
    // function toggleInfowindow(){
    // }
    return (
        <div className={props.index<5?"generic-cell-first-row":""}>
            <div className="cell-title-container">
                <h3>{dataObj.title}</h3>
                <div>
                    <div>i</div>
                    <div className="none">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam tenetur quia iusto, ipsam quod voluptatibus laborum corrupti a! Quas nulla sed ea dicta animi modi atque minus! Quod, totam!
                    </div>
                </div>
            </div>
            <div className="total number big-font">{dataObj.total}</div>
            {dataObj.lists.map(({data,className})=>{
                return (
                    <ul key={Math.random()} className={className}>
                        {data.map(({amount,type,isNumberFirst})=>{
                            return (
                                <li key={Math.random()}>
                                    <span className={isNumberFirst?"number":""}>{(isNumberFirst?amount:type)+" "}</span>
                                    <span className={isNumberFirst?"":"number"}>{isNumberFirst?type:amount}</span>
                                </li>
                            )
                        })}
                    </ul>
                )
            })}
        </div>
    )
}
export default InformationCell;

