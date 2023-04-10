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
        case "ages0To4":
            return "גילאי 0-4"
        case "ages5To11":
            return "גילאי 5-11"
        case "ages12To15":
            return "גילאי 12-15"
        case "ages16To19":
            return "גילאי 16-19"
        default: 
            return "noooo"
    }
}
export default getTranslation