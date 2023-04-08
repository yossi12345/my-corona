import {
    cardGenericDescription,
    verifiedSicksFromYesterday,
    activeSicks,
    seriouslySicks,
    vaccinated,
    cumulativeDeceased,
    percentagePositivesFromYesterday
} from "../../../mockData"
import CardList from "../../card-components/CardList/CardList"
import GenericInfoCard from "../../card-components/GenericInfoCard"
import TitleAndDescriptionOfCard from "../../card-components/TitleAndDescriptionOfCard/TitleAndDescriptionOfCard"
function GeneralOverview() {
    return (
        <div className="general-overview-cards-container">
            <div>
                <GenericInfoCard
                    description={cardGenericDescription}
                    title="מאומתים אתמול"
                    total={verifiedSicksFromYesterday.total}
                    totalClass="total-number"
                    listClasses={["generic-list","smaller-size-number","smaller-size-words"]}
                    list={verifiedSicksFromYesterday.list}
                />
                <GenericInfoCard
                    description={cardGenericDescription}
                    title="חולים פעילים"
                    total={activeSicks.total}
                    totalClass="total-number margin-bottom16"
                    listClasses={["generic-list","smaller-size-number","smaller-size-words"]}
                    list={activeSicks.list}
                />
            </div>
            <div>
                <div className='card'>
                    <TitleAndDescriptionOfCard title="חולים קשה" description={cardGenericDescription} />
                    <div className='total-number'>
                        {seriouslySicks.total}
                    </div>
                    <CardList classes={["fancy-list","words","number"]}
                        members={[seriouslySicks.list[0], seriouslySicks.list[1], seriouslySicks.list[2]]}
                        isNumberFirst={false}
                    />
                    <CardList classes={["generic-list","smaller-size-words","smaller-size-number"]}
                        members={[seriouslySicks.list[3], seriouslySicks.list[4]]}
                        isNumberFirst={false}
                    />
                </div>
                <GenericInfoCard
                    description={cardGenericDescription}
                    title="מתחסנים"
                    total={vaccinated.total}
                    totalClass="total-number"
                    isNumberFirst={false}
                    listClasses={["list-of-vaccinated", "words", "number"]}
                    list={vaccinated.list}
                />
            </div>
            <div>
                <div className='card'>
                    <TitleAndDescriptionOfCard title="נפטרים מצטבר" description={cardGenericDescription} />
                    <div className='total-number'>
                        {cumulativeDeceased.total}
                    </div>
                </div>
                <GenericInfoCard
                    description={cardGenericDescription}
                    title="אחוז נבדקים חיוביים אתמול"
                    total={percentagePositivesFromYesterday.total}
                    totalClass="total-number"
                    listClasses={["generic-list" ,"smaller-size-number" ,"smaller-size-words"]}
                    list={percentagePositivesFromYesterday.list}
                />
            </div>
        </div>
    )
}
export default GeneralOverview