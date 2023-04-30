import { dailyDeceasedsVaccinatedConditionChart } from "../../mockData"
import {useState,useMemo} from "react"
function DailyDeceasedsVaccinatedConditionChart(props){
    //לא גמור
    const [periodShow, setPeriodShow] = useState(30)
    const [populationShow,setPopulationShow]=useState("above60")
    const [isAbsoluteNumber,setIsAbsoluteNumber]=useState(false)
    const dataForPer100000=useMemo(()=>{
        const result=[]
        for (let i=0;i<dailyDeceasedsVaccinatedConditionChart.length;i++){
            const day=dailyDeceasedsVaccinatedConditionChart[i]
            result.push({
                above60:{
                    unvaccinated:day.above60.unvaccinated,
                    vaccinated:Math.floor(Math,random()*30+1),
                    expiredVaccinated:Math.floor(Math,random()*10+1),
                },
                below60:{
                    unvaccinated:Math.floor(Math,random()*20+1),
                    vaccinated:Math.floor(Math,random()*10+1),
                    expiredVaccinated:Math.floor(Math,random()*5+1),
                },
                date:date
            })
        }
    },[])
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
            title: "סוג ניתוח",
            type: "radio",
            options: [
                { option: "absoluteAmount"},
                { option: "amountPer100000" },
            ]
        },
        {
            title: "אוכלוסייה",
            type: "radio",
            options: [
                { option: "allpopulation"},
                { option: "below60" },
                { option: "above60"},
            ]
        },
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
        absoluteNumber:"מספר מוחלט",
        below60:"מתחת ל60",
        above60:"מעל ל60",
        allPopulation:"כל האוכלוסיה",
        amountPer100000:"ל-100 אלף תושבים",
        vaccinated:"מחוסנים",
        unvaccinated:"לא מחוסנים",
        expiredVaccinated:"מחוסנים ללא תוקף"
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
                            strokeWidth={4}
                            stroke="#50cbfd"
                            fill="#50cbfd"
                            dot={false}
                            activeDot={{fill:"#50cbfd", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
                            dataKey={"ages5To11"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#b6ca51"
                            fill="#b6ca51"
                            dot={false}
                            activeDot={{fill:"#b6ca51", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
                            dataKey={"ages12To15"}
                            strokeOpacity={1}
                            strokeWidth={4}
                            stroke="#237d7d"
                            fill="#237d7d"
                            dot={false}
                            activeDot={{fill:"#237d7d", stroke:"white", strokeWidth:0.7, r:6}}
                        />
                        <Line
                            type="linear"
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
                        <CartesianGrid vertical={false} stroke="#e7e7e7"/>
                        <Tooltip shared={false} content={<GeneralToolTip translations={translations}/>} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
export default DailyDeceasedsVaccinatedConditionChart;