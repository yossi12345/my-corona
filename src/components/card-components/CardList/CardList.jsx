import React from "react";
import "./CardList.scss"
function CardList({members=[],isNumberFirst=true,classes=["","",""]}){
    return (
        <ul className={classes[0]}>
          {members.map(({amount,outOf})=>(
              <li key={Math.random()}>
                  <div className={classes[1]}>{isNumberFirst?amount:outOf}</div>
                  <div className={classes[2]}>{isNumberFirst?outOf:amount}</div>
              </li>
            )
          )}  
        </ul>
    )
}
export default CardList