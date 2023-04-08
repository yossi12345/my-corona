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
  dailyHospitalizedAmountChart,
} from "./mockData"
import GenericInfoCard from './components/card-components/GenericInfoCard';
import TitleAndDescriptionOfCard from './components/card-components/TitleAndDescriptionOfCard/TitleAndDescriptionOfCard';
import CardList from './components/card-components/CardList/CardList';
import Menu from './components/Menu/Menu';
import React, { useEffect, useRef, useState } from 'react';
import Chart from "react-apexcharts"
import ChartSelect from './components/charts-components/ChartSelect/ChartSelect';
import getTranslation from './getTranslation';
import ShareButton from './components/charts-components/ShareButton/ShareButton';
import MyToolTip from './components/charts-components/MyToolTip/MyToolTip';
import OverViewChapter from './components/chapter-components/OverviewChapter/OverviewChapter';
import DailyHospitalizedAmountChart from './components/charts-components/DailyHospitalizedAmountChart';
function App() {
  const [stateOfDailyHospitalizedAmountFirstChart,setStateOfDailyHospitalizedAmountFirstChart]=useState({ 
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
 return (
    <>
      <div className='header-and-menu-and-nav-container'>
        <Header setShouldMenuOpen={setShouldMenuOpen} 
                shouldMenuOpen={shouldMenuOpen}/>
        {shouldMenuOpen&&<Menu setShouldMenuOpen={setShouldMenuOpen}
                               shouldMenuOpen={shouldMenuOpen}/>}
        <Nav chaptersRefs={chaptersRefs}/>
      </div>
      <div className='body-container'>
        <OverViewChapter overviewRef={chaptersRefs.current[0]}/>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[1]=element}>
          <h3>מדדים מרכזיים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'>
              <div className='chart-card-upper-part-container'>
                <TitleAndDescriptionOfCard title="מספר מאושפזים -יומי" description={cardGenericDescription}/>
                <ShareButton/>
              </div>
              <DailyHospitalizedAmountChart state={stateOfDailyHospitalizedAmountFirstChart}
               setState={setStateOfDailyHospitalizedAmountFirstChart}/>
            </div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[2]=element}>
          <h3>מדדי תחלואה כללית</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[3]=element}>
          <h3>תחלואה ואשפוזי ילדים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[4]=element}>
          <h3>תחלואה מחו"ל</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[5]=element}>
          <h3>השפעת התחסנות על התחלואה</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[6]=element}>
          <h3>חולים קשה ומאושפזים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[7]=element}>
          <h3>נפטרים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[8]=element}>
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[9]=element}>
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[10]=element}>
          <h3>תחלואה חוזרת ומחלימים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[11]=element}>
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[12]=element}>
          <h3>רמזור יישובים</h3>
          <div className='general-chapter-cards-container'>
            <div className='table-card'></div>
            <div className='card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
            <div className='image-card'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;

