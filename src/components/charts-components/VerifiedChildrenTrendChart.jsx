import { 
    ResponsiveContainer,
    LineChart,Line,
    Label,XAxis,YAxis,
    CartesianGrid,Tooltip,Legend
} from "recharts"
import ChartSelect from "./ChartSelect/ChartSelect"
import { verifiedChildrenTrendChart } from "../../mockData"
import getTranslation from "../../getTranslation"
import MyToolTip from "./MyToolTip/MyToolTip"
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
                { option: "untilNow" },
                { option: "year" },
                { option: "sixMonths" },
                { option: "threeMonths" },
                { option: "lastMonth" }
            ]
        }
    ]
    return (
        <>
            <ChartSelect state={props.state} setState={props.setState}
                 sections={sectionsOfChartSelect}/>
            <div className="chart-container">
                <ResponsiveContainer>
                    <LineChart data={verifiedChildrenTrendChart.slice(verifiedChildrenTrendChart.length-periodShow)}>
                        <Line
                            type="monotone"
                            dataKey={"ages0To4"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#baa1ef"
                            fill="#baa1ef"
                            dot={false}
                            activeDot={{fill:"#baa1ef", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="monotone"
                            dataKey={"ages5To11"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#b6ca51"
                            fill="#b6ca51"
                            dot={false}
                            activeDot={{fill:"#b6ca51", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="monotone"
                            dataKey={"ages12To15"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#237d7d"
                            fill="#237d7d"
                            dot={false}
                            activeDot={{fill:"#237d7d", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="monotone"
                            dataKey={"ages16To19"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#baa1ef"
                            fill="#baa1ef"
                            dot={false}
                            activeDot={{fill:"#baa1ef", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <XAxis tickMargin={3} dataKey="date" style={{fontSize:12}}
                            minTickGap={6}
                            tickFormatter={(date) => {
                                let day = date.getDate()
                                if (day < 10)
                                    day = "0" + day
                                let month = date.getMonth() + 1
                                if (month < 10)
                                    month = "0" + month
                                return day + "." + month
                            }}>
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
                        <CartesianGrid vertical={false} stroke="#e7e7e7"/>
                        <Tooltip shared={false} content={<MyToolTip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default VerifiedChildrenTrendChart;