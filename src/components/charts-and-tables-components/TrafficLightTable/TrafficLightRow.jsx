function TrafficLightRow(props){
    return (
        <div>
            <div className="city-square">{props.city}</div>
            <div className="grade-square">{props.grade}</div>
            <div className="generic-square">{props.newSicks}</div>
            <div className="grade-square">{props.positiveTests}</div>
            <div className="generic-square">{props.verifiedChangeRate}</div>
            <div className="generic-square">{props.activeSicks}</div>
        </div>
    )
}
export default TrafficLightRow