import React from "react";
import "./TableColumn.scss"
import GoTriangleUp from "react-icons/go"
function TableColumn(props){
    return (
        <div className={props.columnClass}>
            <div>
                <button onClick={props.handleButtonClick}>
                    {props.firstSquareContent}
                    {props.tableState.isTriangleShow&&props.tableState.sortBy===props.sortType&&
                        <GoTriangleUp color="#5ea5f5" className={"triangle"+(props.tableState.isReversedSort?" triangle-flip":"")}/>
                    }
                </button>
            </div>
            {props.list.map((entry)=>(
                React.cloneElement(props.squareComponent,{key:Math.random(),content:entry})
            ))}
        </div>
    )
}
export default TableColumn;