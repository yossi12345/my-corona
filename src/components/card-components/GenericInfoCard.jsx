import React from "react";
import CardList from "./CardList/CardList";
import TitleAndDescriptionOfCard from "./TitleAndDescriptionOfCard/TitleAndDescriptionOfCard";
function GenericInfoCard(props){
    return (
        <div className="card">
            <TitleAndDescriptionOfCard
                description={props.description}
                title={props.title}
            />
            <div className={props.totalClass}>
                {props.total}
            </div>
            <CardList
                isNumberFirst={props.isNumberFirst}
                classes={props.listClasses}
                members={props.list}
            />
        </div>
    )
}
export default GenericInfoCard;