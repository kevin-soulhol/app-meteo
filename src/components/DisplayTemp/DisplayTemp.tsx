import './displayTemp.scss'

function DisplayTemp( { temperature, city, tomorrow }: { temperature: number, city : string, tomorrow? : boolean } ) {

    function getDate() {
        const today = new Date()
        let date = today
        if(tomorrow){
            date = new Date( today.setDate(today.getDate() + 1 ) )
        }
        return `${date.toLocaleDateString()} - ${tomorrow ? 'Tomorrow' : 'Today'}`;
    }
    
    return (
        <div className="display-temp">
            <div className="temperature">{Math.round(temperature)}°</div>
            <div className="location">{city}</div>
            <div className="date">{getDate()}</div>
        </div>
    );
}

export default DisplayTemp