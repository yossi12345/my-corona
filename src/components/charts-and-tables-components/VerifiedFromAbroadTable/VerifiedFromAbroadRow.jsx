function VerifiedFromAbroadRow(props){
    const colorsSortedByRiskLevels=["fae626","fab278","fb4f67"]
    return (
        <div className="row">
            <div className="country-square">{props.country}</div>
            <div className="risk-level-square">
                <div className={"rectangle background-color"+colorsSortedByRiskLevels[props.riskLevel-1]}></div>
            </div>
            <div className="generic-square">{props.enteringAmount.toLocaleString("en-US",{maximumFractionDigits:2})}</div>
            <div className="generic-square">{props.verifiedCitizens.toLocaleString("en-US",{maximumFractionDigits:2})}</div>
            <div className="generic-square">{props.verifiedForeign.toLocaleString("en-US",{maximumFractionDigits:2})}</div>
            <div className="generic-square">{props.verifiedFromEntering.toLocaleString("en-US",{maximumFractionDigits:2})+"%"}</div>
        </div>
    )
}
export default VerifiedFromAbroadRow