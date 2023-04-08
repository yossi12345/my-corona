import { useState,useEffect } from "react";
import ChartSelect from "./ChartSelect/ChartSelect";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip
    , CartesianGrid,
    Legend,
    Label,
} from 'recharts';
import { dailyHospitalizedAmountChart } from "../../mockData";
import getTranslation from "../../getTranslation";
import MyToolTip from "./MyToolTip/MyToolTip";
function DailyHospitalizedAmountChart(props) {
    const [periodShow, setPeriodShow] = useState(30)
    useEffect(() => {
        if (props.state.lastMonth)
            setPeriodShow(30)
        else if (props.state.untilNow) 
            setPeriodShow(dailyHospitalizedAmountChart.length)
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
            type: "checkbox",
            title: "מצב מאושפזים",
            options: [
                { option: "miledSicks" },
                { option: "sicks" },
                { option: "seriouslySicks" }
            ]
        },
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
            <ChartSelect state={props.state}
                setState={props.setState}
                sections={sectionsOfChartSelect} />
            <div className="chart-container">
                <ResponsiveContainer>
                    <AreaChart data={dailyHospitalizedAmountChart.slice(dailyHospitalizedAmountChart.length - periodShow)}>
                        <Area 
                            type="monotone"
                            stackId="1"
                            dataKey={"seriouslySicks"}
                            fill="#84dbfe"
                            fillOpacity={1}
                            stroke="#50cbfd"
                            strokeWidth={3}
                            activeDot={{fill:"#50cbfd", stroke:"white", strokeWidth:0.7, r:6}}
                            className={props.state.seriouslySicks ? "" : "none"} />
                        <Area 
                            type="monotone" 
                            stackId="1"
                            dataKey={"sicks"}
                            fill="#bfcd78"
                            fillOpacity={1}
                            stroke="#b6ca51"
                            strokeWidth={3}
                            activeDot={{fill:"#b6ca51",stroke:"white",strokeWidth:0.7,r:6}}
                            className={props.state.sicks ? "" : "none"} />
                        <Area 
                            type="monotone"
                            stackId="1"
                            dataKey={"miledSicks"}
                            fill="#65a4a4"
                            fillOpacity={1}
                            stroke="#237d7d"
                            strokeWidth={3}
                            activeDot={{fill:"#237d7d",stroke:"white", strokeWidth:0.7,r:6}}
                            className={props.state.miledSicks ? "" : "none"} />
                        <XAxis tickMargin={3} dataKey="date" style={{fontSize:12}}
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
                            formatter={value => (<span className="chart-legend">{getTranslation(value)}</span>)}
                        />
                        <CartesianGrid vertical={false} stroke="#e7e7e7"/>
                        <Tooltip shared={false} content={<MyToolTip />} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default DailyHospitalizedAmountChart;