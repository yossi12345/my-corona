import { useState,useEffect,useMemo } from "react"
import { differentIndicatorsSegmentation } from "../../mockData"
import ChartSelect from "./ChartSelect/ChartSelect"
import { BarChart,ResponsiveContainer, XAxis, YAxis,Label,Bar,CartesianGrid,Tooltip,Legend, LabelList, CartesianAxis} from "recharts"
//import getTranslation from "../../getTranslation"
import SegmentationTooltip from "./toolTip-components/SegmentationToolTip"
function DifferentIndicatorsSegmentationChart(props){
    const [segmentationShow,setSegmentaionShow]=useState("verified")
    useEffect(()=>{
        if (props.state.verified)
            setSegmentaionShow("verified")
        else if (props.state.deceaseds)
            setSegmentaionShow("deceaseds")
        else if (props.state.breathings)
            setSegmentaionShow("breathings")
        else if (props.state.seriouslySicks)
            setSegmentaionShow("seriouslySicks")
        else if (props.state.hospitalizeds)
            setSegmentaionShow("hospitalizeds")
    },[
        props.state.verified,
        props.state.deceaseds,
        props.state.breathings,
        props.state.seriouslySicks,
        props.state.hospitalizeds,
    ])
    const [periodShow,setPeriodShow]=useState(30)
    useEffect(() => {
        if (props.state.lastMonth)
            setPeriodShow(30)
        else if (props.state.untilNow) 
            setPeriodShow(differentIndicatorsSegmentation.length)
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
    const chartData=useMemo(()=>{
        const result={
            total:0,
            data:[
                {
                    ageGroup:"90+",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"80-89",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"70-79",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"60-69",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"50-59",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"40-49",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"30-39",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"20-29",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"10-19",
                    women:0,
                    men:0
                },
                {
                    ageGroup:"0-9",
                    women:0,
                    men:0
                }
            ]
        }
        for (let i=1;i<=periodShow;i++){
            const day=differentIndicatorsSegmentation[differentIndicatorsSegmentation.length-i]
            for (let j=0;j<result.data.length;j++){
               // debugger
                const menAmount=day[segmentationShow][result.data[j].ageGroup].men
                const womenAmount=day[segmentationShow][result.data[j].ageGroup].women
                result.data[j].men+=menAmount
                result.data[j].women+=womenAmount
                result.total+=menAmount+womenAmount
            }
        }
        for (let i=0;i<result.data.length;i++){
            result.data[i].men=(result.data[i].men*100)/result.total
            result.data[i].women=(-result.data[i].women*100)/result.total
        }
        //debugger
        return result
    },[segmentationShow,periodShow])
    //console.log(chartData)
    const sectionsOfChartSelect=[
        {
            type:"radio",
            title:"הצג לפי",
            options:[
                { option: "verified"},
                { option: "deceaseds"},
                { option: "breathings"},
                { option: "seriouslySicks"},
                { option: "hospitalizeds"},
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
                { option: "lastMonth" }
            ]
        }
    ]
    const translations={
        untilNow:"עד עכשיו",
        year:"שנה",
        sixMonths:"6 חודשים",
        threeMonths:"3 חודשים",
        lastMonth:"חודש אחרון",
        verified:"מאומתים",
        deceaseds:"נפטרים",
        breathings:"מונשמים",
        seriouslySicks:"מצב קשה",
        hospitalizeds:"מאושפזים",
        men:"גברים",
        women:"נשים"
    }
    function Stupi(p){
        console.log(p)
        return (
            <div style={{width:100, backgroundColor:"red",height:20}}></div>
        )
    }
    return (
        <>
            <ChartSelect sections={sectionsOfChartSelect} translations={translations}
                state={props.state}
                setState={props.setState}/>
            <div className="segmentation-chart-container">
                <ResponsiveContainer>
                    <BarChart data={chartData.data} stackOffset="sign" layout="vertical">
                        <Bar dataKey="men" fill="#50cbfd" stackId="stack" barSize={8} isAnimationActive={false}>
                            <LabelList style={{fontSize:11}} dataKey="men" position="right" offset={33}
                                formatter={value=>(
                                    Math.abs(value).toLocaleString("en-US",{maximumFractionDigits:1})+"%"
                                )}/>
                        </Bar>
                        <Bar dataKey="women" fill="#b6ca51" stackId="stack" isAnimationActive={false}>
                            <LabelList style={{fontSize:11}} dataKey="women" position="right" offset={33}
                                formatter={value=>(
                                    Math.abs(value).toLocaleString("en-US",{maximumFractionDigits:1})+"%"
                                )}/>
                        </Bar>
                     
                        <CartesianGrid strokeWidth={0.5} horizontalPoints={[28,46,66,87,108,129,149,170,189,210,230]}/>
                        <XAxis domain={[-30,30]} tickCount={7} axisLine={false} type="number" style={{fontSize:12}} tickFormatter={value=>(Math.abs(value)+"%")
                        }>
                         
                            <Label style={{fontSize:15}} dy={14}>% סה"כ</Label>
                        </XAxis>
                        <YAxis type="category" dataKey="ageGroup" dx={-31} style={{fontSize:12}} interval={0} axisLine={false} tickLine={false}>
                            <Label position={"top"} style={{fontSize:14}} dy={-10} dx={25}>קבוצת גיל</Label>
                        </YAxis>
                        <Tooltip content={<SegmentationTooltip translations={translations} total={chartData.total}/>}
                         cursor={{fill:"#bcbcbc", height:1}}/>
                        <Legend iconType="circle" verticalAlign="top" align="start" iconSize={8}
                           formatter={value =>(<span className="chart-legend">{translations[value]}</span>)}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default DifferentIndicatorsSegmentationChart
