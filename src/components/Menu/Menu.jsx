import React, {useEffect, useState } from "react";
import "./Menu.scss";
import arrow from "./arrow.PNG";
function Menu({shouldMenuOpen,setShouldMenuOpen}){
    const [menuClass,setMenuClass]=useState("menu")
    const [planeArrowClasses,setPlaneArrowClasses]=useState(
        {
            contentWorld:"plane-arrow rotate-plane-arrow",
            dataWorld:"plane-arrow",
            hiData:"plane-arrow",
            GIS:"plane-arrow",
            dashboard:"plane-arrow rotate-plane-arrow"
        })
    const [subMenuContentWorldShouldOpen,setSubMenuContentWorldShouldOpen]=useState(true)
    const [subMenuDataWorldShouldOpen,setSubMenuDataWorldShouldOpen]=useState(false)
    const [subMenuGISShouldOpen,setSubMenuGISShouldOpen]=useState(false)
    const [subMenuHiDataShouldOpen,setSubMenuHiDataShouldOpen]=useState(false)
    const [subMenuDashboardShouldOpen,setSubMenuDashboardShouldOpen]=useState(true)  
    function rotatePlaneArrow(arrowToRotate){
        const planeArrowClassesCopy={...planeArrowClasses}
        if (planeArrowClassesCopy[arrowToRotate]==="plane-arrow")
            planeArrowClassesCopy[arrowToRotate]="plane-arrow rotate-plane-arrow"
        else
            planeArrowClassesCopy[arrowToRotate]="plane-arrow"
        setPlaneArrowClasses(planeArrowClassesCopy)
    }
    useEffect(()=>{
        if (shouldMenuOpen)
            setMenuClass("menu menu-show")
        else
            setMenuClass("menu")
    },[shouldMenuOpen])
    return(
        <div className="menu-container"
            onClick={()=>{
                setShouldMenuOpen(false)
            }}>
            <div className={menuClass}
                onClick={(event)=>{
                    event.stopPropagation()
                }}
            >
                <div className="gray-border-bottom">
                    <button className="bold menu-btn content-world-btn" onClick={()=>{
                        const subMenuContentWorldShouldOpenCopy=subMenuContentWorldShouldOpen
                        setSubMenuContentWorldShouldOpen(!subMenuContentWorldShouldOpenCopy)
                        rotatePlaneArrow("contentWorld")
                    }}>
                        <div className="width110">
                            עולמות התוכן     
                        </div>
                        <div className={planeArrowClasses.contentWorld}></div>
                    </button>
                    <div 
                        className={"sub-menu-content-world"+(subMenuContentWorldShouldOpen?" sub-menu-content-world-show":"")}>
                        <button className="bold menu-btn" onClick={()=>{
                            setShouldMenuOpen(false)
                        }}>קורונה</button>
                        <button className="new-content-soon menu-btn">
                            עולמות תוכן נוספים בקרוב...
                        </button>
                    </div>
                </div>
                <button className="bold menu-btn" onClick={()=>{
                    const subMenuDataWorldShouldOpenCopy=subMenuDataWorldShouldOpen
                    setSubMenuDataWorldShouldOpen(!subMenuDataWorldShouldOpenCopy)
                    rotatePlaneArrow("dataWorld")
                }}>
                    <div className="width110">
                        עולם הדאטה
                    </div>
                    <div className={planeArrowClasses.dataWorld}></div>
                </button>
                <div className={"sub-menu-data-world"+(subMenuDataWorldShouldOpen?"-show":"")}>
                    <button className="menu-btn" onClick={()=>{
                        const subMenuHiDataShouldOpenCopy=subMenuHiDataShouldOpen
                        setSubMenuHiDataShouldOpen(!subMenuHiDataShouldOpenCopy)
                        rotatePlaneArrow("hiData")
                    }}>
                        <div className="width110">
                            הי-DATA
                        </div>
                        <div className={planeArrowClasses.hiData}></div>
                    </button>
                    <div className={"sub-sub-menu-data-world"+(subMenuHiDataShouldOpen?" sub-sub-menu-data-world-show":"")}>
                        <button className="menu-btn">
                            דו"ח 1 - אשפוז
                        </button>
                        <button className="menu-btn">
                            דו"ח 2 - חולים במצב קשה
                        </button>
                    </div>
                    <button className="menu-btn" onClick={()=>{
                        const subMenuGISShouldOpenCopy=subMenuGISShouldOpen
                        setSubMenuGISShouldOpen(!subMenuGISShouldOpenCopy)
                        rotatePlaneArrow("GIS")
                    }}>
                        <div className="width110">
                            GIS
                        </div>
                        <div className={planeArrowClasses.GIS}></div>
                    </button>
                    <div className={"sub-sub-menu-data-world"+(subMenuGISShouldOpen?" sub-sub-menu-data-world-show":"")}>
                        <button className="menu-btn">
                            תמונת מצב אודות נתוני בידודים פעילים, לפי רשות מקומית וגיל
                        </button>
                        <button className="menu-btn">
                            מפת בדיקות מהירות לקורונה, כולל נתונים אודות שעות פתיחה וניווט
                        </button>
                        <button className="menu-btn">
                            רמזור מדינות העולם לפי רמת סיכון
                        </button>
                        <button className="menu-btn">
                            נתוני אוכלוסיה מחוסנים בתוקף, לפי יישובים
                        </button>
                        <button className="menu-btn">
                            מדדי תחלואה וציוני רמזור, בחלוקה לפי יישובים ורובעים 
                        </button>
                        <button className="menu-btn">
                            תמונת מצב מובחנת אודות האוכלוסיה, בתוך תשעת היישובים הגדולים בארץ, "רובעי רמזור"
                        </button>
                        <button className="menu-btn">
                            תמונת מצב לפי יישוב בקטגוריות- חולים פעילים, מבודדים, מאושפזים, נפטרים ומחוסנים בתוקף
                        </button>
                        <button className="menu-btn">
                            מרכז המידע לקורונה של משרד הבריאות
                        </button>
                        <button className="menu-btn">
                            בידוד פעילים לפי רשויות וקבוצות גיל
                        </button>
                    </div>
                    <button className="menu-btn">
                       <div className="width110">
                            Data_Gov
                        </div>
                       {subMenuDataWorldShouldOpen&&<img className="left-arrow" src={arrow} alt="BigCo Inc. arrow"/>}
                    </button>
                </div>
                <button className="menu-btn gray-border-bottom" onClick={()=>{
                    setShouldMenuOpen(false)
                }}></button>
                <button className="bold menu-btn" onClick={()=>{
                    const subMenuDashboardShouldOpenCopy=subMenuDashboardShouldOpen
                    setSubMenuDashboardShouldOpen(!subMenuDashboardShouldOpenCopy)
                    rotatePlaneArrow("dashboard")
                }}>
                    <div className="width110">
                        על הדשבורד
                    </div>
                    <div className={planeArrowClasses.dashboard}></div>
                </button>
                <div className={"sub-menu-dashboard"+(subMenuDashboardShouldOpen?"-show":"")}>
                    <button className="menu-btn">
                        אודות
                    </button>
                    <button className="menu-btn">
                        תנאי שימוש
                    </button>
                    <button className="menu-btn">
                        מדריך למשתמש
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Menu