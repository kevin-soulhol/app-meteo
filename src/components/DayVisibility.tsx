import { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";

function DayVisibility({ codesInDay, firstHour, lastHour } : { codesInDay : number[], firstHour : number, lastHour : number }) {

    const [hours, setHours] = useState<number[]>([0])

    useEffect(() => {
        let arr = new Array( )
        for (let index = firstHour; index < lastHour; index++) {
            arr.push(index)
            
        }
        setHours(arr)
    }, [codesInDay])

  return (
    <div className="dayVisibility">
        {
            codesInDay?.map((code, index) => (
                <div className="indicateur">
                    <WeatherIcon code={code} />
                    <div className="ligne"></div>
                    <p>{ hours[index] }H</p>
                </div>
            ))
        }
    </div>
  );
}

export default DayVisibility;