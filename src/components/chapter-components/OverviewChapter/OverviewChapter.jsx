import GeneralOverview from "./GeneralOverView"
import WeeklySummary from "./WeeklySummary"
import "./OverviewChapter.scss"
function OverViewChapter() {
    return (
        <>
            <h3>מבט על</h3>
            <GeneralOverview />
            <WeeklySummary/>
        </>
    )
}
export default OverViewChapter