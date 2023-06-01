import { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";

function DayVisibility({ codesInDay, tempsInDay, firstHour, lastHour } : { codesInDay : number[], tempsInDay : number[], firstHour : number, lastHour : number }) {

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
                <div key={index} className="indicateur">
                    <WeatherIcon code={code} />
                    <div className="ligne">
                        <div className="indicTemp">{new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 2 }).format( tempsInDay[index] )}°</div>
                    </div>
                    <p>{ hours[index] }H</p>
                </div>
            ))
        }
    </div>
  );
}

export default DayVisibility;