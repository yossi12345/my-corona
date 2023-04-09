import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
// import Temp from "../Temp/Temp.jsx";
import "./Nav.scss";
import { Link } from "react-router-dom";
//import { HashLink } from "react-router-hash-link";
//import { Link } from "react-router-dom";
function Nav(props){
    const links=[
        {link:"מבט על",to:"overview"},
        {link:"מדדים מרכזיים",to:"major-indicators"},
        {link:"מדדי תחלואה כללית",to:"general-morbidity"},
        {link:"תחלואה ואשפוזי ילדים",to:"morbidity-and-children-hospitalizations"},
        {link:'תחלואה מחו"ל',to:"morbidity-from-abroad"},
        {link:"השפעות התחסנות על התחלואה",to:"effect-of-vaccination-on-morbidity"},
        {link:"חולים קשה ומאושפזים",to:"seriously-sicks-and-hospitalized"},
        {link:"נפטרים",to:"deceaseds"},
        {link:"בדיקות",to:"corona-tests"},
        {link:"תחקורים נוספים",to:"other-investigations"},
        {link:"תחלואה חוזרת ומחלימים",to:"recurrent-morbidity-and-recovered"},
        {link:"התחסנות האוכלוסיה",to:"population-vaccination"},
        {link:"רמזור בישובים",to:"cities-traffic-lights"}
    ]
    return (
        <nav ref={props.navRef}>
            <ul className="links">
             {links.map(({link,to},index)=>(
                <BrowserRouter key={Math.random()}>
                    <li>
                        {/* <a ref={(element)=>props.linksRefs.current[index]=element}
                        className={props.linksClasses[index]}
                        href={"#"+to}>{link}</a> */} 
                        <Link onClick={(event)=>{
                             props.bodyRef.current.removeEventListener("scroll",props.handleScroll)
                            //console.log(props.bodyRef.current.hasEventListener("scroll",props.handleScroll))
                           
                            //props.updateNav(index)
                            //props.chaptersRefs.current[index].scrollIntoView()
                            //props.bodyRef.current.addEventListener("scroll",props.handleScroll)
                           // setTimeout(()=>{

                               //props.bodyRef.current.addEventListener("scroll",props.handleScroll)
                                console.log("2")
                           // },4000)
                        }} className={props.linksClasses[index]}
                             ref={(element)=>props.linksRefs.current[index]=element}>
                            <span onClick={()=>{
                            
                            }}>{link}</span>
                        </Link>
                    </li>
                </BrowserRouter>
                ))}
            </ul>
        </nav>
    )
}
export default Nav;