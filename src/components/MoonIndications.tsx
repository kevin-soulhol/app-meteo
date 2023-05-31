import { useEffect, useState } from "react";

var url = "http://api.farmsense.net/v1/moonphases/";
function MoonIndications({ date, latitude, longitude }: { date: Date | undefined, latitude: number, longitude: number }) {

    const [moonPhase, setMoonPhase] = useState<string>('')
    const [illumination, setIllumination] = useState<number>(0)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (date) {
            let timestamp = getTimestamp(date)


            let urlApi = `${url}?d=${timestamp}&lat=${latitude}&lon=${longitude}`
            fetch(urlApi).then(response => response.json())
                .then(data => {
                    console.log('MoonApi', data)
                    if(data[0].error){
                        setError(data[0].ErrorMsg)
                    } else {
                        setMoonPhase(data[0].Phase)
                        setIllumination(data[0].Illumination)
                    }
                })
        }
    }, [date])

    const getIcon = () => {
        let percent = null
        let moon = moonPhase
        if (moonPhase !== 'New Moon'
            && moonPhase !== 'Full Moon'
            && moonPhase !== 'First Quarter'
            && moonPhase !== 'Third Quarter'
        ) {
            percent = new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 1 }).format(illumination * 6 / 1)
            if (parseInt(percent) < 1) {
                percent = '1'
            }
        }

        switch(moonPhase){
            case "New Moon":
                moon = 'new'
                break;
            case "Full Moon" :
                moon = 'full'
                break;
        }

        if(percent){
            return `moon-${moon.toLocaleLowerCase().replace(' ', '-')}-${percent}`
        }
        return `moon-${moon.toLocaleLowerCase().replace(' ', '-')}`
    }

    const getTimestamp = (date: Date) => {
        let timestamp = `${date.valueOf()}`
        let timestampArr = timestamp.split('')
        let cpTimestamp = [...timestampArr]
        for (let index = cpTimestamp.length; index > cpTimestamp.length - 3; index--) {
            timestampArr.pop()
        }
        return parseInt(timestampArr.join(''))
    }

    return (

        <div className="moonIndications">
            {error ? error : <i className={`wi wi-${getIcon()}`}></i>}
        </div>
    );
}

export default MoonIndications;