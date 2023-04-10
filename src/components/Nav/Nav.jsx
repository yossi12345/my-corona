import { BrowserRouter } from "react-router-dom";
import "./Nav.scss";
import { HashLink } from "react-router-hash-link";
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
                        <HashLink to={"/#"+to} className={props.linksClasses[index]}
                             ref={(element)=>props.linksRefs.current[index]=element}>
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