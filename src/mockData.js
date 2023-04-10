export const verifiedSicksFromYesterday={
    total:458,
    list:[
        {
            outOf:"מחצות",
            amount:8
        },
        {
            outOf:'סה"כ',
            amount:"4,810,698"
        }
    ]
}
export const activeSicks={
    total:"5,629",
    list:[
        {
            outOf:'בבי"ח',
            amount:335
        }
    ]
}
export const seriouslySicks={
    total:82,
    list:[
        {
            outOf:"מתוכם קריטי",
            amount:19
        },
        {
            outOf:"מחוברים לאקמו",
            amount:5
        },
        {
            outOf:"מונשמים",
            amount:16
        },
        {
            outOf:"חולים בינוני",
            amount:19
        },
        {
            outOf:"חולים קל",
            amount:234
        }
    ]
}
export const vaccinated={
    list:[
        {
            outOf:"מנה 1",
            amount:"6,722,813"
        },
        {
            outOf:"מנה 2",
            amount:"6,159,373"
        },
        {
            outOf:"מנה 3",
            amount:"4,513,289"
        },
        {
            outOf:"מנה 4",
            amount:"846,268"
        },
        {
            outOf:"אומיקרון",
            amount:"404,182"
        }
    ]
}
export const cumulativeDeceased={
    total:"12,372"
}
export const percentagePositivesFromYesterday={
    total:"14.6%",
    list:[
        {
            outOf:"נבדקים לגילוי הנגיף אתמול",
            amount:"3,136"
        },
        {
            outOf:"כלל הבדיקות אתמול",
            amount:"3,295"
        }
    ]
}
export const lastWeekSummary={
    verified:{
        total:"3,338",
        list:[
            {
                outOf:"משבעה ימים קודמים",
                amount:"-13.1%"
            }
        ]
    },
    seriouslySicks:{
        total:74,
        list:[
            {
                outOf:"משבעה ימים קודמים",
                amount:"2%"
            }
        ]
    },
    deceased:{
        total:17,
        list:[
            {
                outOf:"משבעה ימים קודמים",
                amount:"-26.1%"
            }
        ]
    },
    tested:{
        total:"22,297",
        list:[
            {
                outOf:"משבעה ימים קודמים",
                amount:"-40.8%"
            },
            {
                outOf:"נבדקים חיוביים",
                amount:"15%"
            }
        ]
    }
}
export const verifiedChildrenTrendChart=[]
export const dailyHospitalizedAmountChart=[]
export const differentIndicatorsSegmentation=[]
const startCoronaDate=new Date(2020,2,1)
const today=new Date()
let dayS=new Date(startCoronaDate.getFullYear(),startCoronaDate.getMonth(),startCoronaDate.getDate())
let dayD=new Date(startCoronaDate.getFullYear(),startCoronaDate.getMonth(),startCoronaDate.getDate())
let dayV=new Date(startCoronaDate.getFullYear(),startCoronaDate.getMonth(),startCoronaDate.getDate())
do{
    dayS.setDate(dayS.getDate()+1)
    const dayCopy=new Date(dayS.getFullYear(),dayS.getMonth(),dayS.getDate())
    
    differentIndicatorsSegmentation.push({
        verified:[
            {
                ageGroup:"90+",
                women:Math.floor(Math.random()*25+80)
            }
        ],
        ages0To4:Math.floor(Math.random()*25+80),
        ages5To11:Math.floor(Math.random()*17+17),
        ages12To15:Math.floor(Math.random()*140+233),
        ages16To19:Math.floor(Math.random()*140+233),
        date:dayCopy
    })
}while(dayS.getDate()!==today.getDate()||dayS.getMonth()!==today.getMonth()||dayS.getFullYear()!==today.getFullYear())
do{
    dayV.setDate(dayV.getDate()+1)
    const dayCopy=new Date(dayV.getFullYear(),dayV.getMonth(),dayV.getDate())
    verifiedChildrenTrendChart.push({
        ages0To4:Math.floor(Math.random()*25+80),
        ages5To11:Math.floor(Math.random()*17+17),
        ages12To15:Math.floor(Math.random()*140+233),
        ages16To19:Math.floor(Math.random()*140+233),
        date:dayCopy
    })
}while(dayV.getDate()!==today.getDate()||dayV.getMonth()!==today.getMonth()||dayV.getFullYear()!==today.getFullYear())
do{
    dayD.setDate(dayD.getDate()+1)
    const dayCopy=new Date(dayD.getFullYear(),dayD.getMonth(),dayD.getDate())
    dailyHospitalizedAmountChart.push({
        seriouslySicks:Math.floor(Math.random()*25+80),
        sicks:Math.floor(Math.random()*17+17),
        miledSicks:Math.floor(Math.random()*140+233),
        date:dayCopy
    })
} while (dayD.getDate()!==today.getDate()||dayD.getMonth()!==today.getMonth()||dayD.getFullYear()!==today.getFullYear())
export const cardGenericDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos, quas obcaecati porro earum, aperiam minus rerum voluptates ea illum, nulla velit consectetur! Nihil repellat inventore sapiente nemo iste excepturi."