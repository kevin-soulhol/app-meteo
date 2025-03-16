import UnitDayDetails from './UnitDayDetails';
import './dayDetails.scss'

const details = ['humidity', 'wind', 'precipitation', 'sunrise']

function DayDetails ( { humidityPercent, wind, precipitation, sunset, sunrise } : { humidityPercent : number, wind : number, precipitation : number, sunset : string, sunrise : string}) {

    
    return (
        <div className="day-details">
            {details.map((detail, index) => {

                const titre = {
                    humidity: 'Humidité',
                    wind: 'Vent',
                    precipitation: 'Précipitation',
                    sunrise: 'Levé'
                }[detail] || 'Erreur'

                let text = ''

                if(detail === 'humidity') {
                    text = `${humidityPercent}%`
                }

                if(detail === 'wind') {
                    text = `${wind} km/h`
                }

                if(detail === 'precipitation') {
                    text = `${precipitation} mm`
                }

                if(detail === 'sunrise') {
                    text = new Date(sunrise[0] + ':00.000Z').toLocaleString('fr-FR', { hour: "numeric", minute: "numeric" })
                }

                let columns = [
                    {
                        title: titre,
                        text: text
                    }
                ]

                if(detail === 'sunrise') {
                    columns.push({
                        title: 'Couché',
                        text: new Date(sunset[0] + ':00.000Z').toLocaleString('fr-FR', { hour: "numeric", minute: "numeric" })
                    })
                
                }

                return (
                    <UnitDayDetails key={index} columns={columns} />
                )
            })}
        </div>
    )
}

export default DayDetails;