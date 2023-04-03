import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import {
  verifiedSicksFromYesterday,
  cardGenericDescription,
  activeSicks,
  seriouslySicks,
  vaccinated,
  cumulativeDeceased,
  percentagePositivesFromYesterday,
  lastWeekSummary,
  hospitalizedAmountChart,
} from "./mockData"
import GenericInfoCard from './components/card-components/GenericInfoCard';
import TitleAndDescriptionOfCard from './components/card-components/TitleAndDescriptionOfCard/TitleAndDescriptionOfCard';
import CardList from './components/card-components/CardList/CardList';
import Menu from './components/Menu/Menu';
import { useEffect, useRef, useState } from 'react';
import Chart from "react-apexcharts"
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
import ChartSelect from './components/charts-components/ChartSelect/ChartSelect';
import getTranslation from './getTranslation';
import ShareButton from './components/charts-components/ShareButton/ShareButton';
import MyToolTip from './components/charts-components/MyToolTip/MyToolTip';
import { TempChart } from './components/tempChart';
function App() {
  const [areaChartState,setAreaChartState]=useState({ 
      miledSicks:true,
      sicks:true,
      seriouslySicks:true,
      lastMonth:true,
      untilNow:false,
      year:false,
      threeMonths:false,
      sixMonths:false
    }
  )
  const [areaChartPeriodShow,setAreaChartPeriodShow]=useState(30)
  function handlePageLoad(){
    window.scrollTo(0,0)
  }
  const [shouldMenuOpen,setShouldMenuOpen]=useState(false)
  const chaptersRefs=useRef([]);
  useEffect(()=>{
    window.addEventListener("load",handlePageLoad)
    return ()=>{
      window.removeEventListener("load",handlePageLoad)
    }
  },[])
  useEffect(()=>{
    if (shouldMenuOpen)
      document.body.style.overflow="hidden"
    else
      document.body.style.overflow=""
  },[shouldMenuOpen])
  useEffect(()=>{
    if (areaChartState.lastMonth){
      setAreaChartPeriodShow(30)
    }
    else if (areaChartState.untilNow){
      setAreaChartPeriodShow(hospitalizedAmountChart.length)
    }
    else if (areaChartState.year){
      setAreaChartPeriodShow(365)
    }
    else if (areaChartState.threeMonths){
      setAreaChartPeriodShow(90)
    }
    else if (areaChartState.sixMonths){
      setAreaChartPeriodShow(180)
    }
  },[areaChartState.lastMonth,
    areaChartState.untilNow,
    areaChartState.year,
    areaChartState.threeMonths,
    areaChartState.sixMonths
  ])
 return (
    <>
      <div className='header-and-menu-and-nav-container'>
        <Header 
          setShouldMenuOpen={setShouldMenuOpen}
          shouldMenuOpen={shouldMenuOpen}
        />
        {shouldMenuOpen&&<Menu 
          setShouldMenuOpen={setShouldMenuOpen}
          shouldMenuOpen={shouldMenuOpen}
        />}
        <Nav chaptersRefs={chaptersRefs}/>
      </div>
      <div className='body-container'>
        <div className='overview-chapter-container'
           ref={(element)=>chaptersRefs.current[0]=element}>
          <h2>מבט על</h2>
          <div className='general-overview-cards-container'>
            <div>
              <GenericInfoCard
                cardClass="card"
                description={cardGenericDescription}
                title="מאומתים אתמול"
                total={verifiedSicksFromYesterday.total}
                totalClass="total-number"
                listClasses="generic-list smaller-size-number smaller-size-words"
                list={verifiedSicksFromYesterday.list}
              />
              <GenericInfoCard
                cardClass="card"
                description={cardGenericDescription}
                title="חולים פעילים"
                total={activeSicks.total}
                totalClass="total-number margin-bottom16"
                listClasses="generic-list smaller-size-number smaller-size-words"
                list={activeSicks.list}
              />
            </div>
            <div>
              <div className='card'>
                <TitleAndDescriptionOfCard
                 title="חולים קשה" 
                 description={cardGenericDescription}
                />
                <div className='total-number'>
                  {seriouslySicks.total}
                </div>
                <CardList
                  classes="fancy-list words number"
                  members={[seriouslySicks.list[0], seriouslySicks.list[1], seriouslySicks.list[2]]}
                  isNumberFirst={false}
                />
                <CardList
                  classes='generic-list smaller-size-words smaller-size-number'
                  members={[seriouslySicks.list[3], seriouslySicks.list[4]]}
                  isNumberFirst={false}
                />
              </div>
              <GenericInfoCard
                cardClass="card"
                description={cardGenericDescription}
                title="מתחסנים"
                total={vaccinated.total}
                totalClass="total-number"
                isNumberFirst={false}
                listClasses="list-of-vaccinated words number"
                list={vaccinated.list}
              />
            </div>
            <div>
              <div className='card'>
                <TitleAndDescriptionOfCard
                  title="נפטרים מצטבר"
                  description={cardGenericDescription}
                />
                <div className='total-number'>
                  {cumulativeDeceased.total}
                </div>
              </div>
              <GenericInfoCard
                cardClass="card"
                description={cardGenericDescription}
                title="אחוז נבדקים חיוביים אתמול"
                total={percentagePositivesFromYesterday.total}
                totalClass="total-number"
                listClasses="generic-list smaller-size-number smaller-size-words"
                list={percentagePositivesFromYesterday.list}
              />
            </div>
          </div>
          <div className='weekly-summary-overview-container'>
            <h3>סיכום 7 ימים אחרונים</h3>
            <div className='weekly-summary-overview-cards-container'>
              <div>
                <GenericInfoCard
                  cardClass="card"
                  description={cardGenericDescription}
                  title="מספר המאומתים"
                  total={lastWeekSummary.verified.total}
                  totalClass="total-number margin-bottom16"
                  listClasses="generic-list smaller-size-number smaller-size-words"
                  list={lastWeekSummary.verified.list}
                />
                  <GenericInfoCard
                  cardClass="card"
                  description={cardGenericDescription}
                  title="מספר חולים קשה"
                  total={lastWeekSummary.seriouslySicks.total}
                  totalClass="total-number margin-bottom16"
                  listClasses="generic-list smaller-size-number smaller-size-words"
                  list={lastWeekSummary.seriouslySicks.list}
                />
              </div>
              <div>
                <GenericInfoCard
                  cardClass="card"
                  description={cardGenericDescription}
                  title="מספר נפטרים"
                  total={lastWeekSummary.deceased.total}
                  totalClass="total-number margin-bottom16"
                  listClasses="generic-list smaller-size-number smaller-size-words"
                  list={lastWeekSummary.deceased.list}
                />
                <GenericInfoCard
                  cardClass="card"
                  description={cardGenericDescription}
                  title="מספר נבדקים"
                  total={lastWeekSummary.tested.total}
                  totalClass="total-number margin-bottom16"
                  listClasses="generic-list smaller-size-number smaller-size-words"
                  list={lastWeekSummary.tested.list}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='general-chapter-container'
         ref={(element)=>chaptersRefs.current[1]=element}>
          <h3>מדדים מרכזיים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'>
              <div className='chart-card-upper-part-container'>
                <TitleAndDescriptionOfCard title="מספר מאושפזים -יומי" description={cardGenericDescription}/>
                <ShareButton/>
              </div>
              <ChartSelect 
              chartState={areaChartState}
              setChartState={setAreaChartState} 
              sections={{
                content:[
                  {
                    type:"checkbox",
                    title:"מצב מאושפזים",
                    options:[
                      {option:"miledSicks"},
                      {option:"sicks"},
                      {option:"seriouslySicks"}
                    ],

                  },
                  {
                    title:"זמן",
                    type:"radio",
                    options:[
                      {option:"untilNow"},
                      {option:"year"},
                      {option:"sixMonths"},
                      {option:"threeMonths"},
                      {option:"lastMonth"}
                    ]
                  }
                ]
              }}
              />
              <div className='chart-container'>
    

              </div>
 
              </div>
            </div>
            <div className='card'>
                <TempChart/>
{/*                 <ResponsiveContainer  height="100%" width="95%">
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
                </ResponsiveContainer> */}
            </div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
         ref={(element)=>chaptersRefs.current[2]=element}>
          <h3>מדדי תחלואה כללית</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[3]=element}>
          <h3>תחלואה ואשפוזי ילדים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[4]=element}>
          <h3>תחלואה מחו"ל</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='map-card'></div>
            <div className='map-card'></div>
            <div className='map-card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[5]=element}>
            <h3>השפעת התחסנות על התחלואה</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[6]=element}>
            <h3>חולים קשה ומאושפזים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[7]=element}>
            <h3>נפטרים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className="general-chapter-container"
           ref={(element)=>chaptersRefs.current[8]=element}>
            <h3>בדיקות</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[9]=element}>
            <h3>תחקורים נוספים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
         ref={(element)=>chaptersRefs.current[10]=element}>
            <h3>תחלואה חוזרת ומחלימים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[11]=element}>
            <h3>התחסנות האוכלוסיה</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='table-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>
        <div className='general-chapter-container'
           ref={(element)=>chaptersRefs.current[12]=element}>
            <h3>רמזור יישובים</h3>
          <div className='general-chapter-cards-container'>
            <div className='table-card'></div>
            <div className='card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>

    </>
  )
}

export default App;

