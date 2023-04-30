import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton/MenuButton";
import logo from "./logo.png";
import "./Header.scss"
import ChangeLanguageButton from "./ChangeLanguageButton/ChangeLanguageButton";
import ChangeDarknessButton from "./ChangeDarknessButton/ChangeDarknessButton";
function Header(props){
    const [updateDate,setUpdateDate]=useState(null)
    useEffect(()=>{
        const monthsInHebrew=[
            "ינואר","פברואר","מרץ",
            "אפריל","מאי","יוני","יולי",
            "אוגוסט","ספטמבר","אוקטובר",
            "נובמבר","דצמבר"
        ]
        const dateObj={
            year:props.lastDataUpdate.getFullYear(),
            month: monthsInHebrew[props.lastDataUpdate.getMonth()],
            day: props.lastDataUpdate.getDate(),
            hour: props.lastDataUpdate.getHours()<10?("0"+props.lastDataUpdate.getHours()):props.lastDataUpdate.getHours(),
            minute: props.lastDataUpdate.getMinutes()<10?("0"+props.lastDataUpdate.getMinutes()):props.lastDataUpdate.getMinutes()
        }
        const tranlatedFullDate=dateObj.day+" ב"+dateObj.month+" "+dateObj.year+" | "+dateObj.hour+":"+dateObj.minute
        setUpdateDate(tranlatedFullDate)
    },[props.lastDataUpdate])
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
                        עדכון אחרון: {updateDate}
                    </div>
                </div>
            </div>
            <div className="relative">
                <ChangeLanguageButton/>
                <ChangeDarknessButton/>
            </div>
        </header>
    )
}
export default Header;