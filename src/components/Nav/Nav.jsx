import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter,NavLink } from "react-router-dom";
// import Temp from "../Temp/Temp.jsx";
import "./Nav.scss";
//import { HashLink } from "react-router-hash-link";
//import { Link } from "react-router-dom";
function Nav(props){
    const myChaptersRefs=useMemo(()=>{
        return props.chaptersRefs
    },[props.chaptersRefs])
    const navRef=useRef(null)
    const [pageYUserPlace,setPageYUserPlace]=useState(0)
    const linksRefs=useRef([])
    const [linksClasses,setLinksClasses]=useState(["active","","","","","","","","","","","",""])
    function handleNavClick(index){
        myChaptersRefs.current[index].scrollIntoView()
        // if (!!myChaptersRefs&&myChaptersRefs.current[index]!=undefined&& 
        //     pageYUserPlace>=myChaptersRefs.current[index].offsetTop&&
        //     pageYUserPlace<=myChaptersRefs.current[index].offsetTop+myChaptersRefs.current[index].offsetHeight
        //     )
        // {
        //     linksRefs.current[index].scrollIntoView({block:"center",inline:"center"})
        //     return "active"
        // }
        // return ""
    }
    useEffect(()=>{
        window.addEventListener('scroll',handleScroll)
        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])
    function handleScroll(){
        console.log("fffff")
        const linksClassesCopy=[...linksClasses]
        for (let i=0;i<links.length;i++){
            if (!!myChaptersRefs&&myChaptersRefs.current[i]!=undefined&&myChaptersRefs.current[i].offsetTop<=window.pageYOffset&&
                window.pageYOffset<=myChaptersRefs.current[i].offsetTop+myChaptersRefs.current[i].offsetHeight)
            {
                console.log("1",myChaptersRefs.current[i].offsetTop)
                console.log("2",myChaptersRefs.current[i].offsetTop+myChaptersRefs.current[i].offsetHeight)
                console.log("3",window.pageYOffset)
                linksRefs.current[i].scrollIntoView({block:"center",inline:"center"})
                linksClassesCopy[i]="active"
            }
            else
                linksClassesCopy[i]=""
        }
        setLinksClasses(linksClassesCopy)
        console.log("ddddd")
    }

    // useEffect(()=>{
    //     myChaptersRef=props.chaptersRefs
    // },[])
    // const [navClass,setNavClass]=useState("")
    
    // const fixedNavIfNeeded=useCallback(()=>{
    //     if (window.pageYOffset>125&&window.innerWidth<495&&navClass===""){
    //         console.log("aaa");

    //         setNavClass("fixed1")
    //         setTimeout(()=>{
    //             setNavClass("fixed2")
    //         },1)
    //     }
    //     else{
    //         setNavClass("")
    //     }
    // },[])
    // useEffect(()=>{
    //     window.addEventListener('scroll',fixedNavIfNeeded)
    //     window.addEventListener('resize',fixedNavIfNeeded)
    //     //window.addEventListener("reset",fixedNavIfNeeded)
      
    //     return  ()=>{
    //         window.removeEventListener('scroll',fixedNavIfNeeded)
    //         window.removeEventListener('resize',fixedNavIfNeeded)
    //     }
    // },[])
    const links=[
        {link:"מבט על",to:"/"},{link:"מדדים מרכזיים",to:"/"},
        {link:"מדדי תחלואה כללית",to:"/"},{link:"תחלואה ואשפוזי ילדים",to:"/"},
        {link:'תחלואה מחו"ל',to:"/"},{link:"השפעות התחסנות על התחלואה",to:"/"},
        {link:"חולים קשה ומאושפזים",to:"/"},{link:"נפטרים",to:"/"},
        {link:"בדיקות",to:"/"},{link:"תחקורים נוספים",to:"/"},
        {link:"תחלואה חוזרת ומחלימים",to:"/"},{link:"התחסנות האוכלוסיה",to:"/"},
        {link:"רמזור בישובים",to:"/"}
    ]
    const myScrollTo=(idToScroll)=>{
        // const elementToScroll=document.getElementById(idToScroll)
        // // window.scrollTo(0,elementToScroll.offsetTop)
        // // const element=document.getElementById("temp")
        // // console.log(element)
        // console.log(window.pageYOffset)
        // console.log("fff"+elementToScroll.offsetTop)
    }
    // useEffect(()=>{
    //     console.log("FFFFFFFFF")
    //     // const linksClassesCopy=[...linksClasses]
    //     // for (let i=0;i<links.length;i++){
    //     //     if (!!myChaptersRefs&&myChaptersRefs.current[i]!=undefined&&myChaptersRefs.current[i].offsetTop>=window.pageYOffset&&
    //     //         window.pageYOffset<=myChaptersRefs.current[i].offsetTop+myChaptersRefs.current[i].offsetHeight)
    //     //     {
    //     //         linksRefs.current[i].scrollIntoView({block:"center",inline:"center"})
    //     //         linksClassesCopy[i]="active"
    //     //     }
    //     //     else
    //     //         linksClassesCopy[i]=""
    //     // }
    //     // setLinksClasses(linksClassesCopy)
    // },[window.pageYOffset])

    return (
        <nav>
            <ul className="links">
             {links.map(({link,to},index)=>(
                <BrowserRouter key={Math.random()}>
                    <li ref={(element)=>{linksRefs.current[index]=element}}
                    onClick={()=>{
                        if (!!myChaptersRefs)
                        {
                           // console.log(myChaptersRefs.current[index].offsetTop)
                            window.scrollTo(0,myChaptersRefs.current[index].offsetTop)
                           // myChaptersRefs.current[index].scrollIntoView()
                        }
                    }} className={linksClasses[index]}>
                        <NavLink>
                            {link}
                        </NavLink>
                    </li>
                </BrowserRouter>
                ))}
            </ul>
        </nav>
    )
}
export default Nav;