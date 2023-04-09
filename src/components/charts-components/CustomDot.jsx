import {Dot} from 'recharts';
function CustomDot(props){
    console.log("ggg",props)
    // const {ticks}=props.xAxis
    //const tickInteval=props.value[1]-props.value[0]
    //if (props.index%tickInteval===0)
        return <Dot stroke="white" strokeWidth={0.7} r={3.5} fill={props.stroke}/>
    // return null
}
export default CustomDot;