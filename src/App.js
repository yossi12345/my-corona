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
import React, { useEffect, useRef, useState,useMemo } from 'react';
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
  const lastDataUpdate=useMemo(()=>{
    return new Date()
  },[])
  const linksRefs=useRef([])
  const [linksClasses,setLinksClasses]=useState(["active","","","","","","","","","","","",""])
  const navRef=useRef(null)
  const bodyRef=useRef(null)
  function handlePageLoad(){
    window.scrollTo(0,0)
  }
  function updateNav(linkIndex){
    const linksClassesCopy=["","","","","","","","","","","","",""]
    const linkRect=linksRefs.current[linkIndex].getBoundingClientRect()
    const navRect=navRef.current.getBoundingClientRect()
    const scrollX=linkRect.left-navRect.left-(navRect.width-linkRect.width)/2
    navRef.current.scroll({
        left:navRef.current.scrollLeft+scrollX
    })
    linksClassesCopy[linkIndex]="active"
    setLinksClasses(linksClassesCopy)
  }
  function getChapterIndexUserIn(){
    const userPlace=bodyRef.current.scrollTop
    const headerHeightToConsider=200
    const userHaveMoreToScroll=(bodyRef.current.clientHeight+userPlace)<bodyRef.current.scrollHeight
    const isLastChapterBiggerThanViewport=chaptersRefs.current[chaptersRefs.current.length-1].offsetHeight>window.innerHeight
    if (!userHaveMoreToScroll&&!isLastChapterBiggerThanViewport)
        return chaptersRefs.current.length-1
    for (let i=0;i<chaptersRefs.current.length;i++){
      const chapterStartPlace=chaptersRefs.current[i].offsetTop-headerHeightToConsider
      const chapterEndPlace=chapterStartPlace+chaptersRefs.current[i].offsetHeight
      if (userPlace>=chapterStartPlace&&userPlace<=chapterEndPlace)
        return i
    }
    return -1
  }
  function handleScroll(e){
    console.log("HANDLE",e)
    const userChapter=getChapterIndexUserIn()
    if (userChapter!==-1){
      updateNav(userChapter)
    }
  }
  const [shouldMenuOpen,setShouldMenuOpen]=useState(false)
  const chaptersRefs=useRef([]);
  const allChaptersRef=useRef(null) 
  useEffect(()=>{
    window.addEventListener("load",handlePageLoad)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
    bodyRef.current.addEventListener("scroll",handleScroll)
    return ()=>{
      window.removeEventListener("load",handlePageLoad)
      bodyRef.current.removeEventListener("scroll",handleScroll)
    }
  },[])
  useEffect(()=>{
    if (shouldMenuOpen)
      document.body.style.overflow="hidden"
    else
      document.body.style.overflow=""
  },[shouldMenuOpen])
 return (
    <div className='body-container' ref={bodyRef} onScroll={()=>{
      
    }}>
      <div className='header-and-menu-and-nav-container'>
        <Header setShouldMenuOpen={setShouldMenuOpen} 
                shouldMenuOpen={shouldMenuOpen} lastDataUpdate={lastDataUpdate}/>
        {shouldMenuOpen&&<Menu setShouldMenuOpen={setShouldMenuOpen}
                               shouldMenuOpen={shouldMenuOpen}/>}
        <Nav linksClasses={linksClasses} linksRefs={linksRefs} 
          navRef={navRef} updateNav={updateNav} 
          bodyRef={bodyRef} handleScroll={handleScroll} chaptersRefs={chaptersRefs}
        />
      </div>
      <div className='all-chapters-container' ref={allChaptersRef}>
        <div className='overview-chapter-container' ref={(element)=>chaptersRefs.current[0]=element} id="overview">
          <OverViewChapter/>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[1]=element} id="major-indicators">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[2]=element} id="general-morbidity">
          <h3>מדדי תחלואה כללית</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[3]=element} id="morbidity-and-children-hospitalizations">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[4]=element} id="morbidity-from-abroad">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[5]=element} id="effect-of-vaccination-on-morbidity">
          <h3>השפעת התחסנות על התחלואה</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[6]=element} id="seriously-sicks-and-hospitalized">
          <h3>חולים קשה ומאושפזים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[7]=element} id="deceaseds">
          <h3>נפטרים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[8]=element} id="corona-tests">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[9]=element} id="other-investigations">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[10]=element} id="recurrent-morbidity-and-recovered">
          <h3>תחלואה חוזרת ומחלימים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[11]=element} id="population-vaccination">
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
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[12]=element} id="cities-traffic-lights">
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
    </div>
  )
}

export default App;

