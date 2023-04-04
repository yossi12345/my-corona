import GeneralOverview from "./GeneralOverView"
import WeeklySummary from "./WeeklySummary"
import "./OverviewChapter.scss"
function OverViewChapter(props) {
    return (
        <div className='overview-chapter-container' ref={props.overviewRef}>
            <h3>מבט על</h3>
            <GeneralOverview />
            <WeeklySummary/>
        </div>
    )
}
export default OverViewChapter