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
export const bedOccupancyInHospitals={
    "מ.ר. צפון (פוריה)":{general:3.9,internal:5},
    "וולפסון":{general:4.4,internal:5.7},
    "זיו צפת":{general:4.1,internal:5.5},
    "המרכזי בעמק":{general:4.4,internal:5.6},
    "הדסה הר הצופים":{general:4.4,internal:5.9},
    "רבין ק. השרון":{general:4.4,internal:5.5},
    "בני ציון":{general:4.9,internal:6.5},
    "ברזילי":{general:3.9,internal:5},
    "נהריה":{general:5.1,internal:6.8},
    "שיבא":{general:5.9,internal:6.5},
    "שמיר":{general:11,internal:5},
    "אסותא אשדוד":{general:5.7,internal:6.9},
    "הלל יפה":{general:4.8,internal:7.3},
    "מאיר":{general:6.2,internal:7.4},
    "הדסה עין כרם":{general:5.4,internal:8.3},
    "לניאדו":{general:3.9,internal:5},
    "קפלן":{general:6.4,internal:9},
    'רמב"ם':{general:80.7,internal:97},
    "המשפחה הקדושה":{general:-1,internal:-1},
    "רבין ק. בילינסון":{general:-1,internal:-1},
    "יוספטל":{general:-1,internal:-1},
    "אוגוסטה ויקטוריה" :{general:3.9,internal:5},
    "הסקוטי":{general:-1,internal:-1},
    "סורוקה":{general:-1,internal:-1},
    "איכילוב":{general:-1,internal:-1},
    "אל מקאסד":{general:-1,internal:-1},
    "האיטלקי":{general:-1,internal:-1},
    "הכרמל":{general:-1,internal:-1},
    " מעייני הישועה":{general:-1,internal:-1},
    " שמואל הרופא":{general:3.9,internal:5},
    "שערי צדק":{general:87.4,internal:119.3}
}
export const verifiedChildrenTrendChart=[]
export const dailyHospitalizedAmountChart=[]
export const differentIndicatorsSegmentation=[]
export const activeSicksChart=[]
export const dailyDeceasedsVaccinatedConditionChart=[]
const startCoronaDate=new Date(2020,2,1)
const today=new Date()
let dayS=new Date(startCoronaDate.getFullYear(),startCoronaDate.getMonth(),startCoronaDate.getDate())
dayS.setDate(dayS.getDate()-1)
do{
    dayS.setDate(dayS.getDate()+1)
    const dayCopy=new Date(dayS.getFullYear(),dayS.getMonth(),dayS.getDate())   
    pushNewDayToSegmentation(differentIndicatorsSegmentation,dayCopy)
    pushNewDayToVerifiedChildrenTrend(verifiedChildrenTrendChart,dayCopy)
    pushNewDayToDailyHospitalizedAmountChart(dailyHospitalizedAmountChart,dayCopy)
    pushNewDayToActiveSicks(activeSicksChart,dayCopy)
    pushNewDayToDailyDeceasedsVaccinatedCondition(dailyDeceasedsVaccinatedConditionChart,dayCopy)
}while(dayS.toDateString()!==today.toDateString())
export const cardGenericDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos, quas obcaecati porro earum, aperiam minus rerum voluptates ea illum, nulla velit consectetur! Nihil repellat inventore sapiente nemo iste excepturi."
        
function pushNewDayToDailyDeceasedsVaccinatedCondition(arr,date){
    arr.push({
        above60:{
            unvaccinated:Math.floor(Math.random()*60+1),
            vaccinated:Math.floor(Math.random()*30+1),
            expiredVaccinated:Math.floor(Math.random()*10+1),
        },
        below60:{
            unvaccinated:Math.floor(Math.random()*20+1),
            vaccinated:Math.floor(Math.random()*10+1),
            expiredVaccinated:Math.floor(Math.random()*5+1),
        },
        date:date
    })
}
function pushNewDayToActiveSicks(arr,date){
    arr.push({
        activeSicks:{
            "90+":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "80-89":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "70-79":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "60-69":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "50-59":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "40-49":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "30-39":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "20-29":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "10-19":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "0-9":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            }
        },
        seriouslySicks:{
            "90+":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)

            },
            "80-89":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "70-79":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "60-69":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "50-59":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "40-49":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "30-39":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "20-29":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "10-19":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            },
            "0-9":{
                vaccinated:Math.floor(Math.random()*10+1),
                unvaccinated:Math.floor(Math.random()*10+10),
                expiredVaccinated:Math.floor(Math.random()*10+25)
            }
        },
        date:date
    })
}
function pushNewDayToDailyHospitalizedAmountChart(arr,date){
    arr.push({
        seriouslySicks:Math.floor(Math.random()*25+80),
        sicks:Math.floor(Math.random()*17+17),
        miledSicks:Math.floor(Math.random()*140+233),
        date:date
    })
}
function pushNewDayToVerifiedChildrenTrend(arr,date){
    arr.push({
        ages0To4:Math.floor(Math.random()*25+80),
        ages5To11:Math.floor(Math.random()*17+17),
        ages12To15:Math.floor(Math.random()*140+233),
        ages16To19:Math.floor(Math.random()*140+233),
        date:date
    })
}
function pushNewDayToSegmentation(arr,date){
    arr.push({
        verified:{
            "90+":{
                women:Math.floor(Math.random()*10+1),
                men:Math.floor(Math.random()*10+10)
            },
            "80-89":{
                women:Math.floor(Math.random()*10+15),
                men:Math.floor(Math.random()*10+25)
            },
            "70-79":{
                women:Math.floor(Math.random()*30+30),
                men:Math.floor(Math.random()*50+30)
            },
            "60-69":{
                women:Math.floor(Math.random()*20+20),
                men:Math.floor(Math.random()*20+30)
            },
            "50-59":{
                women:Math.floor(Math.random()*25+30),
                men:Math.floor(Math.random()*40+20)
            },
            "40-49":{
                women:Math.floor(Math.random()*25+20),
                men:Math.floor(Math.random()*30+10)
            },
            "30-39":{
                women:Math.floor(Math.random()*30+20),
                men:Math.floor(Math.random()*40+15)
            },
            "20-29":{
                women:Math.floor(Math.random()*15+30),
                men:Math.floor(Math.random()*40+10)
            },
            "10-19":{
                women:Math.floor(Math.random()*25+10),
                men:Math.floor(Math.random()*20+33)
            },
            "0-9":{
                women:Math.floor(Math.random()*10+5),
                men:Math.floor(Math.random()*20+5)
            }
        },
        deceaseds:{
            "90+":{
                women:Math.floor(Math.random()*8+0),
                men:Math.floor(Math.random()*6+0)
            },
            "80-89":{
                women:Math.floor(Math.random()*4+0),
                men:Math.floor(Math.random()*6+0)
            },
            "70-79":{
                women:Math.floor(Math.random()*5+0),
                men:Math.floor(Math.random()*8+0)
            },
            "60-69":{
                women:Math.floor(Math.random()*7+1)>5?1:0,
                men:Math.floor(Math.random()*5+1)>4?1:0
            },
            "50-59":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "40-49":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "30-39":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "20-29":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "10-19":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "0-9":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            }
        },
        breathings:{
            "90+":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>8?1:0
            },
            "80-89":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>7?1:0
            },
            "70-79":{
                women:Math.floor(Math.random()*10+1)>9?1:0,
                men:Math.floor(Math.random()*10+1)>8?1:0
            },
            "60-69":{
                women:Math.floor(Math.random()*10+1)>6?1:0,
                men:Math.floor(Math.random()*10+1)>3?1:0
            },
            "50-59":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "40-49":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "30-39":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "20-29":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            },
            "10-19":{
                women:Math.floor(Math.random()*10+1)>8?1:0,
                men:Math.floor(Math.random()*10+1)>7?1:0
            },
            "0-9":{
                women:Math.floor(Math.random()*10+1)>7?1:0,
                men:Math.floor(Math.random()*10+1)>9?1:0
            }
        },
        seriouslySicks:{
            "90+":{
                women:Math.floor(Math.random()*4+0),
                men:Math.floor(Math.random()*5+0)
            },
            "80-89":{
                women:Math.floor(Math.random()*5+0),
                men:Math.floor(Math.random()*6+0)
            },
            "70-79":{
                women:Math.floor(Math.random()*5+0),
                men:Math.floor(Math.random()*6+0)
            },
            "60-69":{
                women:Math.floor(Math.random()*10+1)>6?1:0,
                men:Math.floor(Math.random()*10+1)>7?1:0
            },
            "50-59":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            },
            "40-49":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            },
            "30-39":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            },
            "20-29":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            },
            "10-19":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            },
            "0-9":{
                women:Math.floor(Math.random()*10+1)>5?1:0,
                men:Math.floor(Math.random()*10+1)>4?1:0
            }
        },
        hospitalieds:{
            "90+":{
                women:Math.floor(Math.random()*4+1),
                men:Math.floor(Math.random()*3+1)
            },
            "80-89":{
                women:Math.floor(Math.random()*3+1),
                men:Math.floor(Math.random()*4+1)
            },
            "70-79":{
                women:Math.floor(Math.random()*5+0),
                men:Math.floor(Math.random()*5+0)
            },
            "60-69":{
                women:Math.floor(Math.random()*3+1),
                men:Math.floor(Math.random()*3+2)
            },
            "50-59":{
                women:Math.floor(Math.random()*5+0),
                men:Math.floor(Math.random()*5+0)
            },
            "40-49":{
                women:Math.floor(Math.random()*2+0),
                men:Math.floor(Math.random()*3+0)
            },
            "30-39":{
                women:Math.floor(Math.random()*3+0),
                men:Math.floor(Math.random()*3+0)
            },
            "20-29":{
                women:Math.floor(Math.random()*3+0),
                men:Math.floor(Math.random()*3+0)
            },
            "10-19":{
                women:Math.floor(Math.random()*3+0),
                men:Math.floor(Math.random()*3+0)
            },
            "0-9":{
                women:Math.floor(Math.random()*3+0),
                men:Math.floor(Math.random()*3+0)
            }
        },
        date:date
    })
}