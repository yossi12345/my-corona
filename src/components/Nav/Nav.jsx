import { BrowserRouter } from "react-router-dom";
import "./Nav.scss";
import { HashLink } from "react-router-hash-link";
import { useEffect,useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
function Nav(props){
    const linksRefs=useRef([])
    const [linksClasses,setLinksClasses]=useState(["active","","","","","","","","","","","",""])
    const navRef=useRef(null)
    const handleBodyScroll=useCallback(()=>{
        const userChapter=getChapterIndexUserIn()
        if (userChapter!==-1){}
          updateNav(userChapter)
    },[props.bodyRef])
    useEffect(()=>{
        props.bodyRef.current.addEventListener("scroll",handleBodyScroll)
        return ()=>{
            props.bodyRef.current.removeEventListener("scroll",handleBodyScroll)
        }
    },[props.bodyRef])
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
        const userPlace=props.bodyRef.current.scrollTop
        const headerHeightToConsider=200
        const userHaveMoreToScroll=(props.bodyRef.current.clientHeight+userPlace)<props.bodyRef.current.scrollHeight
        const lastChapterBiggerThanViewport=props.chaptersRefs.current[props.chaptersRefs.current.length-1].offsetHeight>window.innerHeight
        if (!userHaveMoreToScroll&&!lastChapterBiggerThanViewport)
            return props.chaptersRefs.current.length-1
        for (let i=0;i<props.chaptersRefs.current.length;i++){
          const chapterStartPlace=props.chaptersRefs.current[i].offsetTop-headerHeightToConsider
          const chapterEndPlace=chapterStartPlace+props.chaptersRefs.current[i].offsetHeight
          if (userPlace>=chapterStartPlace&&userPlace<=chapterEndPlace)
            return i
        }
        return -1
      }
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
        <nav ref={navRef}>
            <ul className="links">
             {links.map(({link,to},index)=>(
                <BrowserRouter key={Math.random()}>
                    <li>
                        <HashLink to={"/#"+to} className={linksClasses[index]}
                             ref={(element)=>linksRefs.current[index]=element}>
                                {link}
                        </HashLink>
                    </li>
                </BrowserRouter>
                ))}
            </ul>
        </nav>
    )
}
export default Nav;