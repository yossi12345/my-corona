import { 
    ResponsiveContainer,
    LineChart,Line,
    Label,XAxis,YAxis,
    CartesianGrid,Tooltip,Legend
} from "recharts"
import ChartSelect from "./select-componenets/ChartSelect/ChartSelect"
import { verifiedChildrenTrendChart } from "../../mockData"
import GeneralToolTip from "./toolTip-components/GeneralToolTip"
import { useEffect,useState } from "react"

function VerifiedChildrenTrendChart(props){
    const [periodShow, setPeriodShow] = useState(30)
    useEffect(() => {
        if (props.state.lastMonth)
            setPeriodShow(30)
        else if (props.state.untilNow) 
            setPeriodShow(verifiedChildrenTrendChart.length)
        else if (props.state.year) 
            setPeriodShow(365)
        else if (props.state.threeMonths) 
            setPeriodShow(90)
        else if (props.state.sixMonths) 
            setPeriodShow(180)
    }, [
        props.state.lastMonth,
        props.state.untilNow,
        props.state.year,
        props.state.threeMonths,
        props.state.sixMonths
    ])
    const sectionsOfChartSelect = [
        {
            title: "זמן",
            type: "radio",
            options: [
                { option: "untilNow"},
                { option: "year" },
                { option: "sixMonths"},
                { option: "threeMonths" },
                { option: "lastMonth"}
            ]
        }
    ]
    const translations={
        untilNow:"עד עכשיו",
        year:"שנה",
        sixMonths:"6 חודשים",
        threeMonths:"3 חודשים",
        lastMonth:"חודש אחרון",
        ages0To4:"גילאי 0-4",
        ages5To11:"גילאי 5-11",
        ages12To15:"גילאי 12-15",
        ages16To19:"גילאי 16-19"
    }
    return (
        <>
            <ChartSelect state={props.state} setState={props.setState} translations={translations}
                 sections={sectionsOfChartSelect}/>
            <div className="chart-container">
                <ResponsiveContainer>
                    <LineChart data={verifiedChildrenTrendChart.slice(verifiedChildrenTrendChart.length-periodShow)}>
                        <Line
                            type="linear"
                            dataKey={"ages0To4"}
                            strokeOpacity={1}
                            strokeWidth={2}
                            stroke="#50cbfd"
                            fill="#50cbfd"
                            dot={false}
                            activeDot={{fill:"#50cbfd", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
                            dataKey={"ages5To11"}
                            strokeOpacity={1}
                            strokeWidth={2}
                            stroke="#b6ca51"
                            fill="#b6ca51"
                            dot={false}
                            activeDot={{fill:"#b6ca51", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
                            dataKey={"ages12To15"}
                            strokeOpacity={1}
                            strokeWidth={2}
                            stroke="#237d7d"
                            fill="#237d7d"
                            dot={false}
                            activeDot={{fill:"#237d7d", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
                            dataKey={"ages16To19"}
                            strokeOpacity={1}
                            strokeWidth={2}
                            stroke="#baa1ef"
                            fill="#baa1ef"
                            dot={false}
                            activeDot={{fill:"#baa1ef", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <XAxis tickMargin={0} dataKey="date" style={{fontSize:12}} tickLine={{stroke:"#ebf1fa", strokeWidth:1.6}} tickSize={13}
                            minTickGap={6}
                            tickFormatter={date=>(
                                date.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit"}).replace("/",".")
                            )}>
                            <Label position="insideBottom" offset={-3} style={{fontSize:14}}>תאריך</Label>
                        </XAxis>
                        <YAxis axisLine={false} tickLine={false} tickCount={6} tickMargin={20} style={{fontSize:12}}>
                            <Label width={3} position="top" offset={17} style={{fontSize:14}}>מספר מאושפזים</Label>
                        </YAxis>
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            layout="horizontal"
                            verticalAlign="top"
                            align="start"
                            height={35}
                            formatter={value =>(<span className="chart-legend">{value.slice(4).replace("To","-")}</span>)}
                        />
                        <CartesianGrid vertical={false} stroke="#e5e5e5"/>
                        <Tooltip shared={false} content={<GeneralToolTip translations={translations}/>} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default VerifiedChildrenTrendChart;