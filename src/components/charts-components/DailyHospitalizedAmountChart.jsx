import ChartSelect from "./ChartSelect/ChartSelect";
import { 
    ResponsiveContainer,
    AreaChart, 
    XAxis, 
    YAxis,
    Area,
    Tooltip
    ,CartesianGrid,
    Legend,
    Label
   } from 'recharts';
import { dailyHospitalizedAmountChart } from "../../mockData";
function DailyHospitalizedAmountChart(props){
    const [periodShow,setPeriodShow]=useState(30)
    useEffect(()=>{
        if (props.chartState.lastMonth){
          setPeriodShow(30)
        }
        else if (props.chartState.untilNow){
          setPeriodShow(dailyHospitalizedAmountChart.length)
        }
        else if (props.chartState.year){
          setPeriodShow(365)
        }
        else if (props.chartState.threeMonths){
          setPeriodShow(90)
        }
        else if (props.chartState.sixMonths){
          setPeriodShow(180)
        }
      },[
            props.chartState.lastMonth,
            props.chartState.untilNow,
            props.chartState.year,
            props.chartState.threeMonths,
            props.chartState.sixMonths
        ])
    const sectionsOfChartSelect=[
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
            <ChartSelect chartState={props.chartState}
                setChartState={props.setChartState}
                sections={sectionsOfChartSelect} />
                <div className="chart-container">
                    <ResponsiveContainer>
                        <AreaChart data={dailyHospitalizedAmountChart.slice(dailyHospitalizedAmountChart.length-periodShow)}>
                            <Area 
                                dataKey={"miledSicks"} 
                                fill="#3c8c8c"
                                fillOpacity={0.8}
                                stroke="#3c8c8c" 
                                className={props.chartState.miledSicks?"":"none"}/>
                            <Area 
                                dataKey={"sicks"} 
                                fill="#ccda85"
                                fillOpacity={0.8} 
                                stroke="#b6ca51" 
                                className={props.chartState.sicks?"":"none"}/>
                            <Area 
                                dataKey={"seriouslySicks"} 
                                fill="#50cbfd" 
                                fillOpacity={0.8}
                                stroke="#50cbfd" 
                                className={props.chartState.seriouslySicks?"":"none"}/>
                            <XAxis tickMargin={5} dataKey="date"
                                tickFormatter={(date)=>{
                                    let day=date.getDate()
                                    if (day<10)
                                        day="0"+day
                                    let month=date.getMonth()+1
                                    if (month<10)
                                        month="0"+month
                                    return day+"."+month
                                }}></XAxis>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
        </>
    )
}
/*                 <ResponsiveContainer  height="100%" width="95%">
                  <AreaChart data={hospitalizedAmountChart.slice(hospitalizedAmountChart.length-areaChartPeriodShow)}>
                    <Area dataKey={"miledSicks"} fill="#3c8c8c" stroke="#3c8c8c"
                    className={areaChartState.miledSicks?"":"none"} fillOpacity={0.8}/>
                    <Area dataKey={"sicks"} fill="#CCDA85" stroke='#b6CA51'
                     className={areaChartState.sicks?"":"none"} fillOpacity={0.8}/>
                   <Area dataKey={"seriouslySicks"} fill="#50CBFD" stroke="#50CBFD" fillOpacity={0.8}
                   className={areaChartState.seriouslySicks?"":"none"}/>
                    <XAxis tickMargin={5} dataKey="date"
                      tickFormatter={(date) => {
                        let day=date.getDate()
                        if (day<10)
                          day="0"+day
                        let month=date.getMonth()+1
                        if (month<10)
                          month="0"+month
                        return day+"."+month
                    }}>
                      <Label position="insideBottom" offset={-3}>תאריך</Label>
                    </XAxis>
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickCount={6} 
                    tickMargin={20}
                    >
                      <Label width={3} position="top" offset={17}>מספר מאושפזים</Label>
                  </YAxis>
                <Legend 
                  iconType='circle' 
                  iconSize={8} 
                  layout="horizontal" 
                  verticalAlign="top"
                  align="start"
                  height={40}
                  formatter={(value)=>{
                    return <span className='chart-legend'>{getTranslation(value)}</span>
                  }}
                  />
                  <CartesianGrid vertical={false}/>
              
                    <Tooltip shared={false} content={<MyToolTip/>}/>
                  </AreaChart>
                </ResponsiveContainer> */
export default DailyHospitalizedAmountChart;