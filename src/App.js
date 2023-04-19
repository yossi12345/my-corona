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
  verifiedChildrenTrendChart,
} from "./mockData"
import GenericInfoCard from './components/card-components/GenericInfoCard';
import TitleAndDescriptionOfCard from './components/card-components/TitleAndDescriptionOfCard/TitleAndDescriptionOfCard';
import Menu from './components/Menu/Menu';
import React, { useEffect, useRef, useState,useMemo } from 'react';
import ShareButton from './components/charts-and-tables-components/ShareButton/ShareButton';
import OverViewChapter from './components/chapter-components/OverviewChapter/OverviewChapter';
import DailyHospitalizedAmountChart from './components/charts-and-tables-components/DailyHospitalizedAmountChart';
import VerifiedChildrenTrendChart from './components/charts-and-tables-components/VerifiedChildrenTrendChart';
import map1 from "./card-images/map1.PNG"
import map2 from "./card-images/map2.PNG"
import map3 from "./card-images/map3.PNG"
import map4 from "./card-images/map4.PNG"
import map5 from "./card-images/map5.PNG"
import map6 from "./card-images/map6.PNG"
import map7 from "./card-images/map7.PNG"
import map8 from "./card-images/map8.PNG"
import map9 from "./card-images/map9.PNG"
import map10 from "./card-images/map10.PNG"
import map11 from "./card-images/map11.PNG"
import exel from "./card-images/exel.PNG"
import testTubes from "./card-images/test-tubes.PNG"
import ImageCard from './components/card-components/ImageCard/ImageCard';
import DifferentIndicatorsSegmentationChart from './components/charts-and-tables-components/DifferentIndicatorsSegmentationChart';
//import BedOccupancyTable from './components/charts-and-tables-components/BedOccupancyTable';
import BedOccupancyTable2 from './components/charts-and-tables-components/BedOccupancyTable2/BedOccupancyTable2';

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
  const [stateOfDailyHospitalizedAmountSecondChart,setStateOfDailyHospitalizedAmountSecondChart]=useState({ 
        miledSicks:false,
        sicks:false,
        seriouslySicks:true,
        lastMonth:true,
        untilNow:false,
        year:false,
        threeMonths:false,
        sixMonths:false
      }
    )
  const [stateOfVerifiedChildrenTrendChart,setStateOfVerifiedChildrenTrendChart]=useState({ 
        lastMonth:true,
        untilNow:false,
        year:false,
        threeMonths:false,
        sixMonths:false
      }
    )
  const [stateOfDifferentIndicatorsSegmentationChart,setStateOfDifferentIndicatorsSegmentationChart]=useState({
        verified:true,
        deceaseds:false,
        breathings:false,
        seriouslySicks:false,
        hospitalizeds:false,
        lastMonth:true,
        untilNow:false,
        year:false,
        threeMonths:false,
        sixMonths:false
  })
  const lastDataUpdate=useMemo(()=>{
    return new Date()
  },[])
  const linksRefs=useRef([])
  const [linksClasses,setLinksClasses]=useState(["active","","","","","","","","","","","",""])
  const navRef=useRef(null)
  const bodyRef=useRef(null)
  function handlePageLoad(){
    //window.scrollTo(0,0)
  }
  function updateNav(linkIndex){
    const newLinksClasses=["","","","","","","","","","","","",""]
    const linkRect=linksRefs.current[linkIndex].getBoundingClientRect()
    const navRect=navRef.current.getBoundingClientRect()
    const scrollX=linkRect.left-navRect.left-(navRect.width-linkRect.width)/2
    navRef.current.scroll({
        left:navRef.current.scrollLeft+scrollX
    })
    newLinksClasses[linkIndex]="active"
    setLinksClasses(newLinksClasses)
  }
  function getChapterIndexUserIn(){
    const userPlace=bodyRef.current.scrollTop
    const headerHeightToConsider=200
    const userHaveMoreToScroll=(bodyRef.current.clientHeight+userPlace)<bodyRef.current.scrollHeight
    const lastChapterBiggerThanViewport=chaptersRefs.current[chaptersRefs.current.length-1].offsetHeight>window.innerHeight
    if (!userHaveMoreToScroll&&!lastChapterBiggerThanViewport)
        return chaptersRefs.current.length-1
    for (let i=0;i<chaptersRefs.current.length;i++){
      const chapterStartPlace=chaptersRefs.current[i].offsetTop-headerHeightToConsider
      const chapterEndPlace=chapterStartPlace+chaptersRefs.current[i].offsetHeight
      if (userPlace>=chapterStartPlace&&userPlace<=chapterEndPlace)
        return i
    }
    return -1
  }
  const [shouldMenuOpen,setShouldMenuOpen]=useState(false)
  const chaptersRefs=useRef([]);
  const allChaptersRef=useRef(null) 
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
    <div className='body-container' ref={bodyRef} onScroll={()=>{
      const userChapter=getChapterIndexUserIn()
      if (userChapter!==-1)
        updateNav(userChapter)
    }}>
      <div className='header-and-menu-and-nav-container'>
        <Header setShouldMenuOpen={setShouldMenuOpen} 
                shouldMenuOpen={shouldMenuOpen} lastDataUpdate={lastDataUpdate}/>
        {shouldMenuOpen&&<Menu setShouldMenuOpen={setShouldMenuOpen}
                               shouldMenuOpen={shouldMenuOpen}/>}
        <Nav linksClasses={linksClasses} linksRefs={linksRefs} navRef={navRef}
        />
      </div>
      <div className='all-chapters-container' ref={allChaptersRef}>
        <div className='overview-chapter-container' ref={(element)=>chaptersRefs.current[0]=element} id="overview">
          <OverViewChapter/>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[1]=element} id="major-indicators">
          <h3>מדדים מרכזיים</h3>
          <div className='general-chapter-cards-container'>
            <div className='relative'>
              <div className='card'>
                <div className='card-upper-part-container'>
                  <TitleAndDescriptionOfCard title='תפוסת מיטות בביה"ח' description={cardGenericDescription}/>
                  <ShareButton/>
                </div>
                <DailyHospitalizedAmountChart state={stateOfDailyHospitalizedAmountFirstChart}
                setState={setStateOfDailyHospitalizedAmountFirstChart}/>
              </div>
            </div>
            <div className='card'></div>
            <div className='card'></div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[2]=element} id="general-morbidity">
          <h3>מדדי תחלואה כללית</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='relative'>
              <div className='table-card'>
                <div className='card-upper-part-container'>
                      <TitleAndDescriptionOfCard title='תפוסת מיטות בביה"ח' description={cardGenericDescription}/>
                      <ShareButton/>
                    </div>
                  <BedOccupancyTable2 lastDataUpdate={lastDataUpdate}/>
              </div>
            </div>
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[3]=element} id="morbidity-and-children-hospitalizations">
          <h3>תחלואה ואשפוזי ילדים</h3>
          <div className='general-chapter-cards-container'>
            <div className='relative'>
              <div className='card'>
                <div className='card-upper-part-container'>
                    <TitleAndDescriptionOfCard title="מגמת ילדים מאומתים - ממוצע נע 7 ימים" description={cardGenericDescription}/>
                    <ShareButton/>
                </div>
                <VerifiedChildrenTrendChart state={stateOfVerifiedChildrenTrendChart} setState={setStateOfVerifiedChildrenTrendChart}/>
              </div>
            </div>
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
            <ImageCard imgSrc={map1} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={map2} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={map3} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
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
          <div className='relative'>
              <div className='card'>
                <div className='card-upper-part-container'>
                  <TitleAndDescriptionOfCard title="מספר מאושפזים -יומי" description={cardGenericDescription}/>
                  <ShareButton/>
                </div>
                <DailyHospitalizedAmountChart state={stateOfDailyHospitalizedAmountSecondChart}
                setState={setStateOfDailyHospitalizedAmountSecondChart}/>
              </div>
            </div>
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
            <ImageCard imgSrc={map4} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={map5} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={testTubes} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[9]=element} id="other-investigations">
          <h3>תחקורים נוספים</h3>
          <div className='general-chapter-cards-container'>
            <div className='card'></div>
            <div className='relative'>
              <div className='card'>
                <div className='card-upper-part-container'>
                  <TitleAndDescriptionOfCard title="פילוח מדדים שונים על פי גיל ומין" description={cardGenericDescription}/>
                  <ShareButton/>
                </div>
                <DifferentIndicatorsSegmentationChart state={stateOfDifferentIndicatorsSegmentationChart}
                setState={setStateOfDifferentIndicatorsSegmentationChart}/>
              </div>
            </div>
            <div className='card'></div>
            <ImageCard imgSrc={map6} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={exel} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={exel} title="מבודדים לפי רשות מקומית וגיל " 
              explanation="תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל"
              link="experience.argics.com"
            />
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
            <ImageCard imgSrc={map7} 
              title="התחסנות לקורונה"
              explanation="נתוני אוכלוסיית מחוסנים בתוקף, לפי יישובים"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={map8} 
              title="מוקדי התחסנות"
              explanation="מפת מוקדי התחסנות נגד נגיף הקורונה, כולל נתונים אודות שעות פתיחה וניווט"
              link="experience.argics.com"
            />
            <ImageCard imgSrc={exel} 
              title="טבלת גילאי מתחסנים"
              explanation="מספר המתחסנים במנה הראשונה והשנייה לפי גילאים"
              link="data.gov.il"
            />
          </div>
        </div>
        <div className='general-chapter-container' ref={(element)=>chaptersRefs.current[12]=element} id="cities-traffic-lights">
          <h3>רמזור יישובים</h3>
          <div className='general-chapter-cards-container'>
            <div className='table-card'></div>
            <div className='card'></div>
            <ImageCard imgSrc={map9} 
              title="מפת מדדי רמזור"
              explanation="מדדי תחלואה וציוני רמזור, בחלוקה לפי יישובים ורובעים"
              link="experience.arcgis.com"
            />
            <ImageCard imgSrc={map10} 
              title="רובעי רמזור"
              explanation='תמונת מצב מובחנת אודות אוכלוסיה, בתוך תשעת היישובים הגדולים בארץ, "רובעי רמזור"'
              link="maps.arcgis.com"
            />
            <ImageCard imgSrc={map11} 
              title="נתוני תחלואה לפי יישוב"
              explanation="תמונת מצב לפי יישוב בקטגוריות- חולים פעילים, מבודדים, מאושפזים, נפטרים ומחוסנים בתוקף"
              link="experience.arcgis.com"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;

