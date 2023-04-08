import { cardGenericDescription,lastWeekSummary } from "../../../mockData";
import GenericInfoCard from "../../card-components/GenericInfoCard";
function weeklySummary() {
    return (
        <div className='weekly-summary-overview-container'>
            <h4>סיכום 7 ימים אחרונים</h4>
            <div className='weekly-summary-overview-cards-container'>
                <div>
                    <GenericInfoCard
                        description={cardGenericDescription}
                        title="מספר מאומתים"
                        total={lastWeekSummary.verified.total}
                        totalClass="total-number margin-bottom16"
                        listClasses={["generic-list", "smaller-size-number","smaller-size-words"]}
                        list={lastWeekSummary.verified.list}
                    />
                    <GenericInfoCard
                        description={cardGenericDescription}
                        title="מספר חולים קשה"
                        total={lastWeekSummary.seriouslySicks.total}
                        totalClass="total-number margin-bottom16"
                        listClasses={["generic-list", "smaller-size-number", "smaller-size-words"]}
                        list={lastWeekSummary.seriouslySicks.list}
                    />
                </div>
                <div>
                    <GenericInfoCard
                        description={cardGenericDescription}
                        title="מספר נפטרים"
                        total={lastWeekSummary.deceased.total}
                        totalClass="total-number margin-bottom16"
                        listClasses={["generic-list" ,"smaller-size-number" ,"smaller-size-words"]}
                        list={lastWeekSummary.deceased.list}
                    />
                    <GenericInfoCard
                        description={cardGenericDescription}
                        title="מספר נבדקים"
                        total={lastWeekSummary.tested.total}
                        totalClass="total-number margin-bottom16"
                        listClasses={["generic-list","smaller-size-number","smaller-size-words"]}
                        list={lastWeekSummary.tested.list}
                    />
                </div>
            </div>
        </div>
    )
}
export default weeklySummary;