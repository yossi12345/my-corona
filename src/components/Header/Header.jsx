import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton/MenuButton";
import logo from "./logo.png";
import "./Header.scss"
import ChangeLanguageButton from "./ChangeLanguageButton/ChangeLanguageButton";
import ChangeDarknessButton from "./ChangeDarknessButton/ChangeDarknessButton";
function Header(props){
    const [date,setDate]=useState(null)
    useEffect(()=>{
        function convertMonthNumberToMonth(monthNumber){
            switch(monthNumber){
                case 1:
                    return "ינואר"
                case 2:
                   return "פברואר"
                case 3:
                    return "מרץ"
                case 4:
                    return "אפריל"
                case 5:
                    return "מאי"
                case 6:
                    return "יוני"
                case 7:
                    return "יולי" 
                case 8:
                   return "אוגוסט" 
                case 9:
                    return "ספטמבר"
                case 10:
                    return "אוקטובר"
                case 11:
                    return "נובמבר"
                case 12:
                    return "דצמבר"
                default:
                    return
            }
        }
        const fullDate=new Date()
        const dateObj=
        {
            year:fullDate.getFullYear(),
            month: fullDate.getMonth()+1,
            day: fullDate.getDate(),
            hour: fullDate.getHours(),
            minute: fullDate.getMinutes()
        }
        let tranlatedFullDate=dateObj.day+" ב"+convertMonthNumberToMonth(dateObj.month)
        if (dateObj.minute<10)
            dateObj.minute="0"+dateObj.minute
        tranlatedFullDate+=" "+dateObj.year+" | "+dateObj.hour+":"+dateObj.minute
        setDate(tranlatedFullDate)
    },[])
    return (
        <header onClick={()=>{
            if (props.shouldMenuOpen)
                props.setShouldMenuOpen(false)
        }}>
            <div className="menu-button-and-logo-and-title-container">
                <MenuButton
                    setShouldMenuOpen={props.setShouldMenuOpen}
                    shouldMenuOpen={props.shouldMenuOpen}/>
                <img src={logo} alt="BigCo Inc. logo" className="logo"/>
                <div className="header-title">
                    <div>
                        נגיף הקורונה בישראל - תמונת מצב כללית     
                        <div></div>
                    </div>
                    <div>
                        עדכון אחרון: {date}
                    </div>
                </div>
            </div>
            <div className="change-buttons-container">
                <ChangeLanguageButton/>
                <ChangeDarknessButton/>
            </div>
        </header>
    )
}
export default Header;