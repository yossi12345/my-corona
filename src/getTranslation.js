function getTranslation(englishWords){
    switch(englishWords){
        case "sicks":
            return "בינוני"
        case "seriouslySicks":
            return "קשה"
        case "miledSicks":
            return "קל"
        case "untilNow":
            return "עד עכשיו"
        case "year":
            return "שנה"
        case "months":
            return "חודשים"
        case "lastMonth":
            return "חודש אחרון"
        case "sixMonths":
            return "6 חודשים"
        case "threeMonths":
            return "3 חודשים"
        default: 
            return "noooo"
    }
}
export default getTranslation