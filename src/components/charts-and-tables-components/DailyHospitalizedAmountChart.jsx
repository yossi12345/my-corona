import { useState,useEffect } from "react";
import ChartSelect from "./select-componenets/ChartSelect/ChartSelect";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    Legend,
    Label,
} from 'recharts';
import { dailyHospitalizedAmountChart } from "../../mockData";
//import getTranslation from "../../getTranslation";
import GeneralToolTip from "./toolTip-components/GeneralToolTip";
// import CustomDot from "./CustomDot";
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
                { option: "miledSicks"},
                { option: "sicks" },
                { option: "seriouslySicks" }
            ]
        },
        {
            title: "זמן",
            type: "radio",
            options: [
                { option: "untilNow"},
                { option: "year"},
                { option: "sixMonths"},
                { option: "threeMonths"},
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
        miledSicks:"קל",
        sicks:"בינוני",
        seriouslySicks:"קשה"
    }
    return (
        <>
            <ChartSelect state={props.state} translations={translations}
                setState={props.setState}
                sections={sectionsOfChartSelect} />
            <div className="chart-container">
                <ResponsiveContainer>
                    <AreaChart data={dailyHospitalizedAmountChart.slice(dailyHospitalizedAmountChart.length - periodShow)}>
                       {props.state.seriouslySicks&& <Area
                            type="monotone"
                            stackId="1"
                            dataKey={"seriouslySicks"}
                            fill="#84dbfe"
                            fillOpacity={1}
                            stroke="#50cbfd"
                            strokeWidth={3}
                            activeDot={{fill:"#50cbfd", stroke:"white", strokeWidth:0.7, r:6}}
                        />}
                        {props.state.sicks&&<Area 
                            type="monotone" 
                            stackId="1"
                            dataKey={"sicks"}
                            fill="#bfcd78"
                            fillOpacity={1}
                            stroke="#b6ca51"
                            strokeWidth={3}
                            activeDot={{fill:"#b6ca51",stroke:"white",strokeWidth:0.7,r:6}}
                        />}
                        {props.state.miledSicks&&<Area 
                            type="monotone"
                            stackId="1"
                            dataKey={"miledSicks"}
                            fill="#65a4a4"
                            fillOpacity={1}
                            stroke="#237d7d"
                            strokeWidth={3}
                            activeDot={{fill:"#237d7d",stroke:"white", strokeWidth:0.7,r:6}}
                         />}
                        <XAxis tickMargin={3} dataKey="date" style={{fontSize:12}}
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
                            formatter={value =>(<span className="chart-legend">{translations[value]}</span>)}
                        />
                        <CartesianGrid vertical={false} stroke="#e7e7e7"/>
                        <Tooltip shared={false} content={<GeneralToolTip translations={translations}/>} wrapperStyle={{border:"none"}}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default DailyHospitalizedAmountChart;