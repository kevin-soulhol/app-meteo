
import './moonPhase.scss'
import { useEffect, useState } from "react";

export interface IMoonData {
    today: {
        phase_name: string,
        illumination: number,
        icon_name: string,
    },
    tomorrow: {
        phase_name: string,
        illumination: number,
        icon_name: string,
    }
}

function MoonPhase({ latitude, longitude, tomorrow } : { latitude : number, longitude : number, tomorrow : boolean}) {

    const [moonData, setMoonData] = useState<IMoonData>()

    useEffect(() => {
        requestMoon()
    }, [longitude, latitude])

    async function requestMoon() {
        let date = new Date()

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        let url = `https://moonphases.co.uk/service/getMoonDetails.php?day=${day}&month=${month}&year=${year}&lat=${latitude}&lng${longitude}&len=6&tz=0`

        await fetch(url).then(response => response.json())
        .then(data => {
            setMoonData( _parseData(data) )
        })
    }

    function _parseData(data: any) {
        const days = data.days
        const today = _parseDay(days[0])
        const tomorrow = _parseDay(days[1])
        
        return { today, tomorrow }
    }

    function _parseDay(dataDay: any) {
        const phase_name = dataDay.phase_name
        const illumination = dataDay.illumination
        const icon_name = getIconName(phase_name, illumination)

        return { phase_name, illumination, icon_name }
    }

    function getIconName(phase_name: string, illumination : number) {
        let res = phase_name.toLowerCase()
        res = res.replace(" ", "_")

        const keysWithoutNumber = ['new_moon', 'first_quarter', 'full_moon', 'last_quarter']
        let number = ''
        if(!keysWithoutNumber.includes(res)) {
            number = `_${Math.round(illumination/100*6)+1}`
        }

        res = `/moon-icons/${res}${number}-moon.svg`
        return res
    }

    return (
        <div className="moon-phase">
            <div className="container-icon">
                <img src={tomorrow ? moonData?.tomorrow.icon_name : moonData?.today.icon_name} alt="" />
            </div>
            <div className="container-text">{tomorrow ? moonData?.tomorrow.phase_name : moonData?.today.phase_name}</div>
        </div>
    );
}

export default MoonPhase;