import { useEffect, useState } from "react";

var url2 = "http://api.farmsense.net/v1/moonphases/?d=";
function MoonIndications( { date } : { date : Date | undefined}) {  

    const [moonPhase, setMoonPhase] = useState<string>('')
    const [illumination, setIllumination] = useState<number>(0)

    useEffect(() => {
        console.log(date)
        if(date){
            let timestamp = date.getTime()

            let urlApi = `${url2}${timestamp}&lat=43.64&lon=1.43`
            console.log(date, timestamp)
            fetch(urlApi).then(response => response.json())
            .then(data => {
                let test = data[0].TargetDate
                console.log(test, new Date(test * 1000 ))
                setMoonPhase(data[0].Phase)
                setIllumination(data[0].Illumination)
            })
        }
    }, [date])

    const getIcon = () => {
        let percent = new Intl.NumberFormat('fr-FR', { maximumSignificantDigits : 1 }).format(illumination*6/1)
        if(parseInt(percent) < 1){
            percent = '1'
        }
        return `moon-${moonPhase.toLocaleLowerCase().replace(' ', '-')}-${percent}`
    }

  return (
    
    <div className="moonIndications">
        <i className={`wi wi-${getIcon()}`}></i>
    </div>
  );
}

export default MoonIndications;