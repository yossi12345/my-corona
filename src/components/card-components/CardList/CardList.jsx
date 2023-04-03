import React from "react";
import "./CardList.scss"
function CardList({members=[],isNumberFirst=true,classes=""}){
    const splitClasses=classes.split(" ")
    return (
        <ul className={splitClasses[0]}>
          {members.map(({amount,outOf})=>(
              <li key={Math.random()}>
                  <div className={splitClasses[1]}>{isNumberFirst?amount:outOf}</div>
                  <div className={splitClasses[2]}>{isNumberFirst?outOf:amount}</div>
              </li>
            )
          )}  
        </ul>
    )
}
export default CardList